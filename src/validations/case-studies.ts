import { z } from "@/lib/zod";

export const caseStudyInsertSchema = z.object({
  id: z.string("id"),
  projectId: z.string("projectId"),
  title: z.string("title"),
  description: z.string("description"),
  // address: z.string("address"),
  // state: z.string("state"),
  // city: z.string("city"),
  // country: z.string("country"),
  // zip: z.string("zip"),
  // phones: z.array(z.string("phone")),
});

export const caseStudyCreateSchema = caseStudyInsertSchema.omit({ id: true });
export const caseStudyUpdateSchema = caseStudyInsertSchema.omit({
  projectId: true,
});
export const caseStudyDeleteSchema = caseStudyInsertSchema.pick({ id: true });
