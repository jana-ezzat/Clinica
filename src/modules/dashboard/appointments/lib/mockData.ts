// lib/mockData.ts
import type { StatCardData } from "@/shared/types/stats";

export type AppointmentStatValue = Pick<
  StatCardData,
  "id" | "value" | "delta" | "deltaPositive"
>;

export type AppointmentBookingType =
  | "check-up"
  | "consultation"
  | "follow-up"
  | "emergency";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export type AppointmentBooking = {
  id: string;
  name: string;
  bookingType: AppointmentBookingType;
  status: AppointmentStatus;
  bookingDate: string;
  bookingTime: string;
};