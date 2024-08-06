"use server";

import { db } from "@/lib/db";
import { getAuth } from "@/lib/auth";
import {
  RequiresAccessError,
  RequiresLoginError,
  ZodError,
} from "@/lib/exceptions";
import {
  projectCreateSchema,
  projectDeleteSchema,
  projectUpdateSchema,
  // projectDeleteSchema,
  // projectUpdateSchema,
} from "@/validations/projects";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateIdFromEntropySize } from "lucia";

export async function createProject(data: z.infer<typeof projectCreateSchema>) {
  try {
    const user = await getAuth();

    if (!user) throw new RequiresLoginError();
    // if (user?.["id"] != data?.["userId"]) throw new RequiresAccessError();

    const id = generateIdFromEntropySize(10);
    await db.project.create({
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
      error?.["message"] ?? "your project was not created. Please try again.",
    );
  }
}

export async function updateProject({
  id,
  ...data
}: z.infer<typeof projectUpdateSchema>) {
  try {
    const user = await getAuth();
    if (!user) throw new RequiresLoginError();

    await db.project.update({
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
      error?.["message"] ?? "your project was not updated. Please try again.",
    );
  }
}

export async function deleteProject({
  id,
}: z.infer<typeof projectDeleteSchema>) {
  try {
    const user = await getAuth();
    if (!user) throw new RequiresLoginError();

    await db.project.delete({ where: { id } });

    revalidatePath("/", "layout");
  } catch (error: any) {
    console.log(error?.["message"]);
    if (error instanceof z.ZodError) return new ZodError(error);
    throw Error(
      error?.["message"] ?? "your project was not deleted. Please try again.",
    );
  }
}
