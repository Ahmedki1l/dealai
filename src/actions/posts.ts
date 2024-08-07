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
    const result = {
      input: `create a social media content plan that consists of ${3 * weeks} posts for each platform for a period of ${data.noOfWeeks} weeks, for the platforms ${project.accounts}. The content should be long and includes hashtags and emojis.`,
    };
    const domain = process.env.NEXT_PUBLIC_AI_API;

    // Define the endpoint URL
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

    const posts = project.accounts
      .map((acc) => {
        const posts = responseData?.[acc];

        return (posts as any[]).map((post, i) => ({
          ...data,
          id: generateIdFromEntropySize(10),
          title: `Post${i + 1}`,
          content: post?.[`Post${i + 1}`] as string,
          platform: acc as string,
        }));
      })
      .flat();

    //   project.accounts.forEach((acc) => {
    //     let posts = responseData[acc.toString()];
    //     let i = 0;
    //     (posts as any[]).forEach((post) => {
    //       i++;
    //       let name = `Post${i}`;
    //       data.title = name;
    //       data.platform = acc.toString();
    //       data.content = post[name];
    //       toast.promise(
    //         createPost({
    //           ...data,
    //         }),
    //         { error: (err) => err?.["message"] },
    //       );
    //     });
    //   });

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
