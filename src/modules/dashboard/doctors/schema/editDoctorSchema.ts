import { z } from "zod";

export const DOCTOR_ROLES = [
  "doctor",
  "receptionist",
  "accountant",
  "nurse",
] as const;

export const EditDoctorSchema = (messages: {
  required: string;
  invalidEmail: string;
}) =>
  z.object({
    name: z.string().min(1, messages.required),
    email: z.string().min(1, messages.required).email(messages.invalidEmail),
    role: z.string().min(1, messages.required),
  });

export type EditDoctorFormValues = z.infer<ReturnType<typeof EditDoctorSchema>>;
