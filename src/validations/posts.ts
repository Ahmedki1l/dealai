import { z } from "@/lib/zod";

export const postInsertSchema = z.object({
  id: z.string("id"),
  caseStudyId: z.string("caseStudyId"),
  // title: z.string("title"),
  description: z.string("description"),
  imageDescription: z.string("image description"),
  postAt: z.date("postAt").optional(),
  accounts: z.array(z.enum(["FACEBOOK", "INSTAGRAM", "LINKEDIN"])).optional(),
  content: z.string("content").optional(),
  noOfWeeks: z.string("no. of weeks").optional(),
  image: z.string("image").optional(),
});

export const postCreateSchema = postInsertSchema.omit({ id: true });
export const postCreateFormSchema = postCreateSchema
  .omit({ accounts: true })
  .and(
    z.object({
      accounts: z.array(
        z.object({
          value: z.enum(["FACEBOOK", "INSTAGRAM", "LINKEDIN"]),
        }),
      ),
    }),
  );
// export const postUpdateSchema = postInsertSchema.omit({
//   caseStudyId: true,
// });
export const postDeleteSchema = postInsertSchema.pick({ id: true });
