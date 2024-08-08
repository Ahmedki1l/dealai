"use server";

import { db } from "@/lib/db";
import { getAuth } from "@/lib/auth";
import {
  RequiresAccessError,
  RequiresLoginError,
  ZodError,
} from "@/lib/exceptions";
import {
  postCreateSchema,
  postDeleteSchema,
  postInsertSchema,
  postUpdateContentSchema,
  postUpdateImageSchema,
  postUpdateScheduleSchema,
  // postsDeleteSchema,
  // postsUpdateSchema,
} from "@/validations/posts";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateIdFromEntropySize } from "lucia";
import { Project } from "@prisma/client";

export async function createPost(
  data: z.infer<typeof postCreateSchema>,
  project: Project,
) {
  try {
    const user = await getAuth();

    if (!user) throw new RequiresLoginError();
    // if (user?.["id"] != data?.["userId"]) throw new RequiresAccessError();

    let weeks = data.noOfWeeks ? parseInt(data.noOfWeeks, 10) : 0;
    let noOfPostsPerWeek = 3; // Default posts per week

    if (
      data.campaignType === "BRANDING_AWARENESS" ||
      data.campaignType === "ENGAGEMENT"
    ) {
      noOfPostsPerWeek = 5; // Increase posts per week for specific campaigns
    }

    const result = {
      input: `create a social media content plan that consists of ${noOfPostsPerWeek * weeks} posts for each platform for a period of ${data.noOfWeeks} weeks, for the platforms ${project.accounts}. The content should be long and includes hashtags and emojis.`,
    };

    const domain = process.env.NEXT_PUBLIC_AI_API;
    const endpoint = domain + "/chat/socialmediaplan";

    // Send data to the server
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });

    // Handle response from the server
    const responseData = await response.json();

    // Define valid days for posting based on posts per week
    const daysToPost = noOfPostsPerWeek === 3 ? [0, 2, 4] : [0, 1, 2, 3, 4];
    const startDate = new Date();

    const posts = project.accounts
      .map((acc) => {
        const accountPosts = responseData?.[acc];
        let postArray = [];

        let currentDate = new Date(startDate.getTime());
        currentDate.setDate(currentDate.getDate() + 1); // Start from the next day

        accountPosts.forEach((post, i) => {
          // Adjust currentDate to the next valid posting day
          while (
            currentDate.getDay() === 5 ||
            currentDate.getDay() === 6 ||
            !daysToPost.includes(currentDate.getDay())
          ) {
            currentDate.setDate(currentDate.getDate() + 1);
          }

          // Randomize the posting time between 11 AM and 8 PM
          const randomHour = Math.floor(Math.random() * (20 - 11) + 11);
          currentDate.setHours(randomHour, 0, 0);

          // Create post data
          const postDetails = {
            ...data,
            id: generateIdFromEntropySize(10),
            title: `Post${i + 1}`,
            content: post[`Post${i + 1}`] as string,
            platform: acc as string,
            postAt: new Date(currentDate.getTime()),
          };

          postArray.push(postDetails);

          // Prepare for the next post
          currentDate.setDate(currentDate.getDate() + 1);
        });

        return postArray;
      })
      .flat();

    await db.post.createMany({
      data: posts,
    });

    revalidatePath("/", "layout");
  } catch (error: any) {
    console.log(error?.["message"]);
    if (error instanceof z.ZodError) return new ZodError(error);
    throw Error(
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
