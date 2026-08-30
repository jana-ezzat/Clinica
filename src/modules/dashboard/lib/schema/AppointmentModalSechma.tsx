import { z } from "zod";

export const AppointmentModalSchema = (requiredMessage: string) =>
  z.object({
    name: z.string().min(1, requiredMessage),

    nationality: z.string().min(1, requiredMessage),

    email: z.string().min(1, requiredMessage).email("Invalid email"),

    phone: z.string().min(1, requiredMessage),

    patientId: z.string().optional(),

    time: z.string().min(1, requiredMessage),

    appointmentDate: z.string().min(1, requiredMessage),

    appointmentType: z.string().min(1, requiredMessage),

    duration: z.string().min(1, requiredMessage),

    notes: z.string().min(1, requiredMessage),
  });

export type AppointmentFormValues = z.infer<
  ReturnType<typeof AppointmentModalSchema>
>;
