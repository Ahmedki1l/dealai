import { propertyTypesArr } from "@/db/enums";
import { z } from "@/lib/zod";

export const propertySchema = z.object(
  // <Record<keyof Property, any>>
  {
    id: z.string("id"),
    projectId: z.string("projectId"),
    title: z.string("title"),

    type: z.enum(propertyTypesArr),
    units: z.string("units"),
    space: z.string("space"),
    finishing: z.string("finishing"),
    floors: z.string("floors"),
    rooms: z.string("rooms"),
    bathrooms: z.string("bathrooms"),
    recipients: z.string("recipients"),
    garden: z.string("garden").optional(),
    pool: z.string("pool").optional(),
    view: z.string("view").optional(),
  },
);

export const propertyCreateSchema = propertySchema.omit({
  id: true,
});
export const propertyCreateFormSchema = z.object({
  types: z.array(
    z.object({
      value: z.enum(propertyTypesArr),
      properties: z.array(propertyCreateSchema.omit({ type: true })),
    }),
  ),
});

export const propertyUpdateSchema = propertySchema.omit({
  projectId: true,
});
export const propertyDeleteSchema = propertySchema.pick({ id: true });
