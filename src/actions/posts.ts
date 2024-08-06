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
  // postsDeleteSchema,
  // postsUpdateSchema,
} from "@/validations/posts";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateIdFromEntropySize } from "lucia";

export async function createPost(data: z.infer<typeof postCreateSchema>) {
  try {
    const user = await getAuth();

    if (!user) throw new RequiresLoginError();
    // if (user?.["id"] != data?.["userId"]) throw new RequiresAccessError();

    const id = generateIdFromEntropySize(10);
    await db.post.create({
      data: {
        id,
        ...data,
      },
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

// export async function updatePost({
//   id,
//   ...data
// }: z.infer<typeof postsUpdateSchema>) {
//   try {
//     const user = await getAuth();
//     if (!user) throw new RequiresLoginError();

//     await db.post.update({
//       data,
//       where: {
//         id,
//       },
//     });

//     revalidatePath("/", "layout");
//   } catch (error: any) {
//     console.log(error?.["message"]);
//     if (error instanceof z.ZodError) return new ZodError(error);
//     throw Error(
//       error?.["message"] ??
//         "your post was not updated. Please try again.",
//     );
//   }
// }

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
