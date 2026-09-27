import { z } from "zod";

export const AppointmentModalSchema = (requiredMessage: string) =>
  z.object({
    name: z.string().min(1, requiredMessage),
    phone: z.string().min(1, requiredMessage),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    gender: z.enum(["male", "female"], { message: requiredMessage }),
    age: z.coerce.number().min(0, requiredMessage),

    patientId: z.string().optional(),

    time: z.string().min(1, requiredMessage),
    appointmentDate: z.string().min(1, requiredMessage),
    appointmentType: z.string().min(1, requiredMessage),
    duration: z.string().min(1, requiredMessage),
    notes: z.string().min(1, requiredMessage),
  });

export type AppointmentFormValues = z.input<
  ReturnType<typeof AppointmentModalSchema>
>;
export type AppointmentFormOutput = z.output<
  ReturnType<typeof AppointmentModalSchema>
>;