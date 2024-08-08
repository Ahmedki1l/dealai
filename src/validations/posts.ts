import { z } from "@/lib/zod";
import { platform } from "os";

export const postInsertSchema = z.object({
  id: z.string("id"),
  caseStudyId: z.string("caseStudyId"),
  title: z.string("title"),
  description: z.string("description").optional(),
  imageDescription: z.string("image description").optional(),
  contentLength: z.enum(["SHORT", "MEDIUM", "LONG"]),
  campaignType: z.enum([
    "BRANDING_AWARENESS",
    "ENGAGEMENT",
    "SALES_CONVERSION",
  ]),
  postAt: z.date("post at").optional(),
  content: z.string("content").optional(),
  noOfWeeks: z.string("no of weeks").optional(),
  image: z.string("image").optional(),
  platform: z.string("platform"),
});

export const postCreateSchema = postInsertSchema.omit({ id: true });
export const postCreateFormSchema = postCreateSchema;
export const postUpdateSchema = postInsertSchema.omit({
  caseStudyId: true,
});
export const postUpdateContentSchema = postInsertSchema.pick({
  id: true,
  content: true,
});
export const postUpdateImageSchema = postInsertSchema.pick({
  id: true,
  image: true,
});
export const postUpdateScheduleSchema = postInsertSchema.pick({
  id: true,
  postAt: true,
});
export const postDeleteSchema = postInsertSchema.pick({ id: true });
