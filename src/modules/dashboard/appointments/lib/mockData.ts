import type { StatCardData } from "@/shared/types/stats";
import type { AppointmentStatus } from "@/modules/dashboard/lib/mockData";
export type { AppointmentStatus };

export type AppointmentStatValue = Pick<
  StatCardData,
  "id" | "value" | "delta" | "deltaPositive"
>;

export type AppointmentBookingType =
  | "consultation"
  | "follow-up"
  | "check-up"
  | "emergency"
  | "other";

export type AppointmentBooking = {
  id: string;
  name: string;
  bookingType: AppointmentBookingType;
  status: AppointmentStatus;
  bookingDate: string;
  bookingTime: string;
};