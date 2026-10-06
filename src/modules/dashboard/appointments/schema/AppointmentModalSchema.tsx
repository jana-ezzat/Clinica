import { z } from "zod";
import { APPOINTMENT_STATUSES, APPOINTMENT_TYPES } from "../lib/appointmentOptions";


/* ---------- Create appointment ---------- */

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

/* ---------- Edit appointment ---------- */

export const EditAppointmentSchema = z.object({
  date: z.string().min(1, "required"),
  startTime: z.string().min(1, "required"),
  type: z.enum(APPOINTMENT_TYPES),
  status: z.enum(APPOINTMENT_STATUSES),
});

export type EditAppointmentFormValues = z.infer<typeof EditAppointmentSchema>;