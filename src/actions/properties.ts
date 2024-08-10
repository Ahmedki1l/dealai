"use server";

import { db } from "@/db";
import { getAuth } from "@/lib/auth";
import { RequiresLoginError, ZodError } from "@/lib/exceptions";
import {
  propertyCreateSchema,
  propertyDeleteSchema,
  propertyUpdateSchema,
} from "@/validations/properties";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateIdFromEntropySize } from "lucia";

export async function createProperty(
  data: z.infer<typeof propertyCreateSchema>,
) {
  try {
    const { user } = await getAuth();

    if (!user) throw new RequiresLoginError();
    // if (user?.["id"] != data?.["userId"]) throw new RequiresAccessError();

    const id = generateIdFromEntropySize(10);
    await db.property.create({
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

export async function updateProperty({
  id,
  ...data
}: z.infer<typeof propertyUpdateSchema>) {
  try {
    const { user } = await getAuth();

    if (!user) throw new RequiresLoginError();

    await db.property.update({
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

export async function deleteProperty({
  id,
}: z.infer<typeof propertyDeleteSchema>) {
  try {
    const { user } = await getAuth();

    if (!user) throw new RequiresLoginError();

    await db.property.delete({ where: { id } });

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
