import { caseStudyTypesArr } from "@/db/enums";
import { z } from "@/lib/zod";
import { CASE_STUDY_TYPE } from "@prisma/client";

export const caseStudySchema = z.object({
  id: z.string("id"),
  projectId: z.string("projectId"),
  title: z.string("title"),
  description: z.string("description").optional(),
  refImages: z.array(z.string("reference image")),

  content: z.string("content"),
  targetAudience: z.string("targetAudience"),
  pros: z.string("pros"),
  cons: z.string("pros"),
  hashtags: z.string("hashtags"),

  // Unit Features
  type: z.enum(caseStudyTypesArr as [CASE_STUDY_TYPE]),
  units: z.string("units"),
  space: z.string("space"),
  finishing: z.string("finishing"),
  floors: z.string("floors"),
  rooms: z.string("rooms"),
  bathrooms: z.string("bathrooms"),
  recipients: z.string("recipients"),
  garden: z.string("garden"),
  pool: z.string("hashtags"),
  view: z.string("view"),
});

export const caseStudyCreateSchema = caseStudySchema.omit({
  id: true,
  // content: true,
  // targetAudience: true,
  // pros: true,
  // cons: true,
  // hashtags: true,
});
export const caseStudyUpdateSchema = caseStudySchema.omit({
  projectId: true,
});
export const caseStudyDeleteSchema = caseStudySchema.pick({ id: true });
