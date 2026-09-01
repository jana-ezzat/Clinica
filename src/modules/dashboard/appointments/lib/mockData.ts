import type { StatCardData } from "@/shared/types/stats";
import type { AppointmentStatus } from "@/modules/dashboard/lib/mockData";

export const appointmentStatCards: StatCardData[] = [
  {
    id: "bookingsToday",
    label: "عدد حجوزات اليوم",
    value: "25",
    delta: "55%+",
    deltaPositive: true,
    date: "السبت، 28 نوفمبر 2025",
  },
  {
    id: "confirmedToday",
    label: "الحجوزات المؤكدة اليوم",
    value: "14",
    delta: "55%+",
    deltaPositive: true,
    date: "السبت، 28 نوفمبر 2025",
  },
  {
    id: "confirmationRate",
    label: "نسبة الحجوزات المؤكدة",
    value: "66%",
    delta: "55%+",
    deltaPositive: true,
    date: "السبت، 28 نوفمبر 2025",
  },
];

export type AppointmentBookingType = "checkup" | "followup" | "emergency";

export type AppointmentBooking = {
  id: number;
  name: string;
  bookingType: AppointmentBookingType;
  status: AppointmentStatus;
  bookingDate: string;
  bookingTime: string;
};

export const appointmentsMockData: AppointmentBooking[] = [
  {
    id: 1,
    name: "اسلام سعيد محمد",
    bookingType: "checkup",
    status: "pending",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
  {
    id: 2,
    name: "محمد ابراهيم مدكور",
    bookingType: "followup",
    status: "confirmed",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
  {
    id: 3,
    name: "زينا المهدي محمد",
    bookingType: "emergency",
    status: "confirmed",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
  {
    id: 4,
    name: "ابراهيم علي علي",
    bookingType: "checkup",
    status: "cancelled",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
  {
    id: 5,
    name: "سمر عبدالثواب هلال",
    bookingType: "followup",
    status: "pending",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
  {
    id: 6,
    name: "عايدة السيد محمد",
    bookingType: "emergency",
    status: "cancelled",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
  {
    id: 7,
    name: "زياد ابراهيم عبدالجليل",
    bookingType: "checkup",
    status: "pending",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
  {
    id: 8,
    name: "يوسف احمد سالم",
    bookingType: "followup",
    status: "confirmed",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
  {
    id: 9,
    name: "ميادة ابراهيم السيد",
    bookingType: "emergency",
    status: "confirmed",
    bookingDate: "2025-05-18",
    bookingTime: "15:30",
  },
];
