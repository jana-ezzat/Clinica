import type { BadgeTone } from "@/shared/components/atoms/Badge";
import type { AppointmentStatus } from "@/modules/dashboard/lib/mockData";

export const appointmentStatusTone: Record<AppointmentStatus, BadgeTone> = {
  confirmed: "success",
  cancelled: "red",
  pending: "neutral",
};

export const appointmentStatusSolid: Record<AppointmentStatus, boolean> = {
  confirmed: false,
  cancelled: true,
  pending: false,
};
