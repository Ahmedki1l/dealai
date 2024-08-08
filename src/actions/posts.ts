"use server";

import { db } from "@/lib/db";
import { getAuth } from "@/lib/auth";
import {
  RequiresAccessError,
  RequiresLoginError,
  ZodError,
} from "@/lib/exceptions";
import { postCreateSchema } from "@/validations/posts";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateIdFromEntropySize } from "lucia";
import { Project } from "@prisma/client";

export async function createPost(data: z.infer<typeof postCreateSchema>, project: Project) {
  try {
    const user = await getAuth();
    if (!user) throw new RequiresLoginError();

    let weeks = data.noOfWeeks ? parseInt(data.noOfWeeks, 10) : 0;
    let noOfPostsPerWeek =
      data.campaignType === "BRANDING_AWARENESS" ||
      data.campaignType === "ENGAGEMENT"
        ? 5
        : 3;

    const result = {
      input: `create a social media content plan that consists of ${noOfPostsPerWeek * weeks} posts for each platform for a period of ${data.noOfWeeks} weeks, for the platforms ${project.accounts}. The content should be long and includes hashtags and emojis.`,
    };

    const domain = process.env.NEXT_PUBLIC_AI_API;
    const endpoint = domain + "/chat/socialmediaplan";

    // Send initial plan data to the server
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    // Handle response from the server
    const responseData = await response.json();

    const daysToPost = noOfPostsPerWeek === 3 ? [0, 2, 4] : [0, 1, 2, 3, 4];
    const imageApiEndpoint = domain + "/image";
    let imageFetchPromises = [];
    let allPostDetails = [];

    // Prepare and fetch image URLs for each post concurrently
    for (const acc of project.accounts) {
      const accountPosts = responseData?.[acc];
      for (let i = 0; i < accountPosts.length; i++) {
        const postContent = accountPosts[i][`Post${i + 1}`];
        const imagePrompt = { input: postContent };

        // Prepare the fetch promise for the image
        const fetchPromise = fetch(imageApiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(imagePrompt),
        }).then(res => res.json());

        imageFetchPromises.push(fetchPromise);

        fetchPromise.then(imageData => {
          // Calculate the date for post scheduling
          let currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + 1 + i); // Assume posting starts tomorrow and schedules consecutively
          while (daysToPost.includes(currentDate.getDay()) === false) {
            currentDate.setDate(currentDate.getDate() + 1);
          }
          const randomHour = Math.floor(Math.random() * (20 - 11) + 11);
          currentDate.setHours(randomHour, 0, 0);

          // Construct post details
          allPostDetails.push({
            ...data,
            id: generateIdFromEntropySize(10),
            title: `Post${i + 1}`,
            content: postContent,
            platform: acc,
            postAt: currentDate,
            image: imageData.url
          });
        });
      }
    }

    // Wait for all image URLs to be fetched
    await Promise.all(imageFetchPromises);

    if (allPostDetails.length > 0) {
      // Batch create all posts in the database
      await db.post.createMany({
        data: allPostDetails,
      });

      revalidatePath("/", "layout");
    } else {
      console.log("No posts to create.");
    }

  } catch (error: any) {
    console.log(error?.["message"]);
    if (error instanceof z.ZodError) return new ZodError(error);
    throw new Error(
      error?.["message"] ?? "your post was not created. Please try again.",
    );
  }
}

export async function updatePost({
  id,
  ...data
}: z.infer<
  | typeof postUpdateContentSchema
  | typeof postUpdateImageSchema
  | typeof postUpdateScheduleSchema
> &
  Pick<z.infer<typeof postInsertSchema>, "id">) {
  try {
    const user = await getAuth();
    if (!user) throw new RequiresLoginError();

    await db.post.update({
      data,
      where: {
        id,
      },
    });

    revalidatePath("/", "layout");
  } catch (error: any) {
    console.log(error?.["message"]);
    if (error instanceof z.ZodError) return new ZodError(error);
    throw Error(
      error?.["message"] ?? "your post was not updated. Please try again.",
    );
  }
}

export async function deletePost({ id }: z.infer<typeof postDeleteSchema>) {
  try {
    const user = await getAuth();
    if (!user) throw new RequiresLoginError();

    await db.post.delete({ where: { id } });

    revalidatePath("/", "layout");
  } catch (error: any) {
    console.log(error?.["message"]);
    if (error instanceof z.ZodError) return new ZodError(error);
    throw Error(
      error?.["message"] ?? "your post was not deleted. Please try again.",
    );
  }
}
