"use server";

import { db } from "@/lib/db";
import { getAuth } from "@/lib/auth";
import {
  RequiresAccessError,
  RequiresLoginError,
  ZodError,
} from "@/lib/exceptions";
import {
  caseStudyCreateSchema,
  caseStudyDeleteSchema,
  // caseStudyDeleteSchema,
  caseStudyUpdateSchema,
} from "@/validations/case-studies";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateIdFromEntropySize } from "lucia";

export async function createCaseStudy(
  data: z.infer<typeof caseStudyCreateSchema>,
) {
  try {
    const user = await getAuth();

    if (!user) throw new RequiresLoginError();
    // if (user?.["id"] != data?.["userId"]) throw new RequiresAccessError();

    const id = generateIdFromEntropySize(10);
    await db.caseStudy.create({
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
      error?.["message"] ??
        "your case study was not created. Please try again.",
    );
  }
}

export async function updateCaseStudy({
  id,
  ...data
}: z.infer<typeof caseStudyUpdateSchema>) {
  try {
    const user = await getAuth();
    if (!user) throw new RequiresLoginError();

    await db.caseStudy.update({
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
      error?.["message"] ??
        "your case study was not updated. Please try again.",
    );
  }
}

export async function deleteCaseStudy({
  id,
}: z.infer<typeof caseStudyDeleteSchema>) {
  try {
    const user = await getAuth();
    if (!user) throw new RequiresLoginError();

    await db.caseStudy.delete({ where: { id } });

    revalidatePath("/", "layout");
  } catch (error: any) {
    console.log(error?.["message"]);
    if (error instanceof z.ZodError) return new ZodError(error);
    throw Error(
      error?.["message"] ??
        "your case study was not deleted. Please try again.",
    );
  }
}
