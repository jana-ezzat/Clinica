import type { BadgeTone } from "@/shared/components/atoms/Badge";
import type { AppointmentStatus } from "@/modules/dashboard/lib/mockData";

export const appointmentStatusTone: Record<AppointmentStatus, BadgeTone> = {
  pending: "neutral",
  confirmed: "success",
  completed: "info",
  cancelled: "red",
  "no-show": "orange",
};

export const appointmentStatusSolid: Record<AppointmentStatus, boolean> = {
  pending: false,
  confirmed: false,
  completed: false,
  cancelled: true,
  "no-show": false,
};
