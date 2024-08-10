"use server";

import { db } from "@/db";
import { getAuth } from "@/lib/auth";
import {
  RequiresAccessError,
  RequiresLoginError,
  ZodError,
} from "@/lib/exceptions";
import {
  postCreateSchema,
  postDeleteSchema,
  postSchema,
  postUpdateContentSchema,
  postUpdateImageSchema,
  postUpdateScheduleSchema,
} from "@/validations/posts";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateIdFromEntropySize } from "lucia";
import { Post, Project } from "@prisma/client";
import { platformsArr } from "@/db/enums";

export async function createPost(
  data: z.infer<typeof postCreateSchema>,
  project: Project,
) {
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
      input: `create a social media content plan that consists of ${noOfPostsPerWeek * weeks} posts for each platform for a period of ${data.noOfWeeks} weeks, for the platforms ${project?.["platforms"]}. The content should be long and includes hashtags and emojis.`,
    };
    console.log(result);
    const domain = process.env.NEXT_PUBLIC_AI_API;
    const endpoint = domain + "/chat/socialmediaplan";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    }).then((r) => r?.json());

    console.log(response);
    // const daysToPost = noOfPostsPerWeek === 3 ? [0, 2, 4] : [0, 1, 2, 3, 4];
    // const imageApiEndpoint = domain + "/image";
    // let imageFetchPromises = [];
    // let allPostDetails: Omit<Post, "imageId">[] = [];

    // // uppercasing key, to match platform
    // const responseData = Object.keys(response).reduce(
    //   (acc, key) => {
    //     acc[key.toUpperCase()] = response?.[key];
    //     return acc;
    //   },
    //   {} as { [key: string]: { [key: string]: string }[] },
    // );

    // for (const acc of platformsArr) {
    //   const accountPosts = responseData?.[acc];

    //   if (!accountPosts?.["length"]) continue;

    //   // Calculate the starting date for each account to ensure unique dates
    //   let currentDate = new Date();
    //   currentDate.setDate(currentDate.getDate() + 1); // Start from the next day

    //   for (let i = 0; i < accountPosts.length; i++) {
    //     // Adjust currentDate to the next valid posting day
    //     while (
    //       currentDate.getDay() === 5 ||
    //       currentDate.getDay() === 6 ||
    //       !daysToPost.includes(currentDate.getDay())
    //     ) {
    //       currentDate.setDate(currentDate.getDate() + 1);
    //     }

    //     const randomHour = Math.floor(Math.random() * (20 - 11) + 11);
    //     currentDate.setHours(randomHour, 0, 0);

    //     const imagePrompt = { input: accountPosts[i][`Post${i + 1}`] };
    //     const fetchPromise = fetch(imageApiEndpoint, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(imagePrompt),
    //     }).then((res) => res.json());

    //     imageFetchPromises.push(fetchPromise);

    //     fetchPromise.then((imageData) => {
    //       allPostDetails.push({
    //         ...data,
    //         id: generateIdFromEntropySize(10),
    //         title: `Post${i + 1}`,
    //         content: accountPosts[i][`Post${i + 1}`],
    //         platform: acc,
    //         postAt: new Date(currentDate),
    //         // image: imageData.url,
    //       });

    //       // Increment the date for the next post
    //       currentDate.setDate(currentDate.getDate() + 1);
    //     });
    //   }
    // }

    // await Promise.all(imageFetchPromises);

    // if (allPostDetails.length > 0) {
    //   await db.post.createMany({
    //     data: allPostDetails,
    //   });

    //   revalidatePath("/", "layout");
    // } else {
    //   console.log("No posts to create.");
    // }
  } catch (error: any) {
    console.log(error?.["message"]);
    if (error instanceof z.ZodError) return new ZodError(error);
    throw Error(
      error?.["message"] ?? "your post was not deleted. Please try again.",
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
  Pick<z.infer<typeof postSchema>, "id">) {
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
