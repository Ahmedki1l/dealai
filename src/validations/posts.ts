import { z } from "@/lib/zod";
import { platform } from "os";

export const postInsertSchema = z.object({
  id: z.string("id"),
  caseStudyId: z.string("caseStudyId"),
  title: z.string("title"),
  description: z.string("description").optional(),
  imageDescription: z.string("image description"),
  postAt: z.date("postAt").optional(),
  content: z.string("content").optional(),
  noOfWeeks: z.string("noOfWeeks").optional(),
  image: z.string("image").optional(),
  platform: z.string("platform"),
});

export const postCreateSchema = postInsertSchema.omit({ id: true });
export const postCreateFormSchema = postCreateSchema;
// export const postUpdateSchema = postInsertSchema.omit({
//   caseStudyId: true,
// });
export const postDeleteSchema = postInsertSchema.pick({ id: true });
