import type { AppointmentBookingType } from "@/modules/dashboard/appointments/lib/mockData";
import type { AppointmentStatus } from "@/modules/dashboard/lib/mockData";

export const APPOINTMENT_TYPES = [
  "consultation",
  "follow-up",
  "check-up",
  "emergency",
  "other",
] as const satisfies readonly AppointmentBookingType[];

export const APPOINTMENT_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no-show",
] as const satisfies readonly AppointmentStatus[];
