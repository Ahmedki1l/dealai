import { z } from "@/lib/zod";

export const projectInsertSchema = z.object({
  id: z.string("id"),
  userId: z.string("userId"),
  title: z.string("title"),
  description: z.string("description"),
  distinct: z.string("distinct"),
  city: z.string("city"),
  country: z.string("country"),
  type: z.string("type"),
  spaces: z.string("spaces"),
  accounts: z.array(z.enum(["FACEBOOK", "INSTAGRAM", "LINKEDIN"])),
});

export const projectCreateSchema = projectInsertSchema.omit({ id: true });
export const projectCreateFormSchema = projectCreateSchema
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
export const projectUpdateSchema = projectInsertSchema.omit({ userId: true });
export const projectUpdateFormSchema = projectUpdateSchema
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
export const projectDeleteSchema = projectInsertSchema.pick({ id: true });
