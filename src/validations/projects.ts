import { z } from "@/lib/zod";
import { PLATFORM, Project, PROJECT_TYPE } from "@prisma/client";
import { platformsArr, projectTypesArr } from "@/db/enums";

export const projectSchema = z.object({
  id: z.string("id"),
  userId: z.string("userId"),
  title: z.string("title"),
  description: z.string("description").optional(),
  distinct: z.string("distinct"),
  city: z.string("city"),
  country: z.string("country"),
  spaces: z.string("spaces"),

  type: z.enum(projectTypesArr as [PROJECT_TYPE]),
  platforms: z.array(z.enum(platformsArr as [PLATFORM])),
});

export const projectCreateSchema = projectSchema.omit({ id: true });
export const projectCreateFormSchema = projectCreateSchema
  .omit({ platforms: true })
  .and(
    z.object({
      platforms: z.array(
        z.object({
          value: z.enum(platformsArr as [PLATFORM]),
        }),
      ),
    }),
  );

export const projectUpdateSchema = projectSchema.omit({ userId: true });
export const projectUpdateFormSchema = projectUpdateSchema
  .omit({ platforms: true })
  .and(
    z.object({
      platforms: z.array(
        z.object({
          value: z.enum(platformsArr as [PLATFORM]),
        }),
      ),
    }),
  );
export const projectDeleteSchema = projectSchema.pick({ id: true });
