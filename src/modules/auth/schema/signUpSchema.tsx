import z from "zod";

export const ROLES = ["doctor", "receptionist", "accountant", "nurse"] as const;

export const SignUpSchema = z
  .object({
    name: z.string().min(2, "nameRequired"),
    role: z.enum(ROLES, { message: "roleRequired" }),
    specialty: z.string().min(1).optional(),
    email: z.string().min(1, "emailRequired").email("invalidEmail"),
    password: z
      .string()
      .min(8, "passwordMinLength")
      .max(20, "passwordMaxLength"),
    confirmPassword: z.string().min(1, "confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwordNotMatch",
  })
  .refine((data) => data.role !== "doctor" || !!data.specialty?.trim(), {
    message: "specialtyRequired",
    path: ["specialty"],
  });

export type SignUpValues = z.infer<typeof SignUpSchema>;
