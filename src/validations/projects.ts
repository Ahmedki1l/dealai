import { z } from "@/lib/zod";
import { platformsArr, propertiesTypesArr } from "@/db/enums";

export const projectSchema = z.object(
  // <Record<keyof Project, any>>
  {
    id: z.string("id"),
    userId: z.string("userId"),
    title: z.string("title"),
    description: z.string("description").optional(),

    distinct: z.string("distinct"),
    city: z.string("city"),
    country: z.string("country"),
    spaces: z.string("spaces"),

    propertiesType: z.enum(propertiesTypesArr),
    platforms: z.array(z.enum(platformsArr)),
  },
);

export const projectCreateSchema = projectSchema.omit({ id: true });
export const projectCreateFormSchema = projectCreateSchema
  .omit({ platforms: true })
  .and(
    z.object({
      platforms: z.array(
        z.object({
          value: z.enum(platformsArr),
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
          value: z.enum(platformsArr),
        }),
      ),
    }),
  );
export const projectDeleteSchema = projectSchema.pick({ id: true });
