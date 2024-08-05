import { z } from "@/lib/zod";

export const userInsertSchema = z.object({
  name: z.string("name"),
  email: z.string("email").email("invalid email."),
  password: z
    .string("password")
    .min(6, "strong password can't be less than 6 characters.")
    .max(20, "ooh, 20 characters. make it less."),
});

export const userAuthLoginSchema = userInsertSchema.pick({
  email: true,
  password: true,
});

export const userAuthRegisterSchema = userInsertSchema.pick({
  name: true,
  email: true,
  password: true,
});
