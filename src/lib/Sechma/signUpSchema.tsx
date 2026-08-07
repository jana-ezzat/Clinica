import z from "zod";

export const SignUpSchema = z
    .object({
        name: z.string().min(1, "required"),
        specialty: z.string().min(1, "required"),
        email: z.email("invalidEmail"),
        password: z.string().min(8, "passwordTooShort"),
        confirmPassword: z.string().min(8, "passwordTooShort"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "passwordNotMatch",
    });

export type SignUpValues = z.infer<typeof SignUpSchema>;
