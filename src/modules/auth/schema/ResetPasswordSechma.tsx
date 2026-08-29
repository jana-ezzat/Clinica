import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "passwordRequired")
      .min(8, "passwordMinLength")
      .max(20, "passwordMaxLength"),
    confirmPassword: z.string().min(1, "passwordRequired"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "passwordsDontMatch",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
