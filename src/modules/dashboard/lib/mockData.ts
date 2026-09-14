// // src/modules/dashboard/lib/mockData.ts
// export type StatCardData = {
//   label: string;
//   labelKey?: "emergencies" | "revenue" | "appointments" | "patientsToday";
//   value: string;
//   delta: string;
//   deltaPositive: boolean;
// };

import type { StatCardData, StatCardId } from "@/shared/types/stats";
export type { StatCardData, StatCardId };

export const statCards: StatCardData[] = [
  {
    id: "emergencyCases",
    labelKey: "emergencies",
    value: "3",
    delta: "2%+",
    deltaPositive: false,
  },
  {
    id: "revenue",
    labelKey: "revenue",
    value: "40.00 EG",
    delta: "80%+",
    deltaPositive: true,
  },
  {
 
    labelKey: "appointments",
    value: "3",
    delta: "80%+",
    id: "appointments",
    deltaPositive: true,
  },{
    id: "todayPatients",
    labelKey: "patientsToday",
    value: "43",
    delta: "12%+",
    deltaPositive: true,
  },
];

export type NewPatient = {
  id: string;
  name: string;
  age: number;
  symptoms: string;
  date: string;
};

export const newPatients: NewPatient[] = [
  {
    id: "1",
    name: "هدى علي",
    age: 28,
    symptoms: "آلام في الرقبة",
    date: "10 مارس 2025",
  },
  {
    id: "2",
    name: "ليلي أحمد",
    age: 34,
    symptoms: "آلام في الظهر",
    date: "9 مارس 2025",
  },
  {
    id: "3",
    name: "سامر أحمد",
    age: 45,
    symptoms: "صداع مزمن",
    date: "9 مارس 2025",
  },
];

export type AppointmentStatus = "confirmed" | "cancelled" | "pending";
export type VisitType = "checkup" | "followUp" | "consultation";

export type UpcomingAppointment = {
  id: string;
  patient: string;
  time: string;
  /** Translation key inside `dashboard.home.upcomingAppointments.visitTypes` */
  typeKey: VisitType;
  status: AppointmentStatus;
};

export const upcomingAppointments: UpcomingAppointment[] = [
  {
    id: "1",
    patient: "أمير سالم",
    time: "10:30ص",
    typeKey: "checkup",
    status: "confirmed",
  },
  {
    id: "2",
    patient: "أحمد جلال",
    time: "11:30ص",
    typeKey: "followUp",
    status: "cancelled",
  },
  {
    id: "3",
    patient: "عمرو جمال",
    time: "12:30م",
    typeKey: "consultation",
    status: "pending",
  },
];

export const monthlyRevenue = [
  { monthKey: "jan", revenue: 12000 },
  { monthKey: "feb", revenue: 28000 },
  { monthKey: "mar", revenue: 62000 },
  { monthKey: "apr", revenue: 10000 },
  { monthKey: "may", revenue: 55000 },
  { monthKey: "jun", revenue: 78000 },
  { monthKey: "jul", revenue: 98000 },
];

export const weeklyAppointments = [
  { dayKey: "sat", count: 15, max: 18 },
  { dayKey: "sun", count: 18, max: 18 },
  { dayKey: "mon", count: 5, max: 18 },
  { dayKey: "tue", count: 14, max: 18 },
  { dayKey: "wed", count: 16, max: 18 },
  { dayKey: "thu", count: 8, max: 18 },
  { dayKey: "fri", count: 11, max: 18 },
];

export const reportStatCards: StatCardData[] = [
  {
    id: "todayPatients",
    labelKey: "patientsToday",
    value: "1,250",
    delta: "12%+",
    deltaPositive: true,
  },
  {
    id: "appointments",
    labelKey: "appointments",
    value: "320",
    delta: "8%+",
    deltaPositive: true,
  },
  {
    id: "revenue",
    labelKey: "revenue",
    value: "40,000 EG",
    delta: "15%+",
    deltaPositive: true,
  },
  {
    id: "emergencyCases",
    labelKey: "emergencies",
    value: "18",
    delta: "3%-",
    deltaPositive: false,
  },
];

export type ReportData = {
  id: number;
  reportName: string;
  receivedFrom: string;
  bookingType: "consultation" | "regular" | "emergency";
  status: "paid" | "pending" | "overdue";
  bookingDate: string;
  paymentMethod: "cash" | "visa";
};

export const reportsMockData: ReportData[] = [
  {
    id: 1,
    reportName: "booking-report-001",
    receivedFrom: "د/ أحمد محمد",
    bookingType: "consultation",
    status: "paid",
    bookingDate: "2026-08-20",
    paymentMethod: "cash",
  },
  {
    id: 2,
    reportName: "booking-report-002",
    receivedFrom: "د/ أحمد محمد",
    bookingType: "emergency",
    status: "pending",
    bookingDate: "2026-08-21",
    paymentMethod: "visa",
  },
  {
    id: 3,
    reportName: "booking-report-003",
    receivedFrom: "د/ محمد علي",
    bookingType: "regular",
    status: "overdue",
    bookingDate: "2026-08-22",
    paymentMethod: "cash",
  },
  {
    id: 4,
    reportName: "booking-report-004",
    receivedFrom: "د/ أحمد محمد",
    bookingType: "consultation",
    status: "paid",
    bookingDate: "2026-08-23",
    paymentMethod: "visa",
  },
  {
    id: 5,
    reportName: "booking-report-005",
    receivedFrom: "د/ سارة حسن",
    bookingType: "regular",
    status: "pending",
    bookingDate: "2026-08-18",
    paymentMethod: "cash",
  },
  {
    id: 6,
    reportName: "booking-report-006",
    receivedFrom: "د/ محمد علي",
    bookingType: "emergency",
    status: "paid",
    bookingDate: "2026-08-17",
    paymentMethod: "visa",
  },
  {
    id: 7,
    reportName: "booking-report-007",
    receivedFrom: "د/ أحمد محمد",
    bookingType: "consultation",
    status: "overdue",
    bookingDate: "2026-08-16",
    paymentMethod: "cash",
  },
  {
    id: 8,
    reportName: "booking-report-008",
    receivedFrom: "د/ سارة حسن",
    bookingType: "regular",
    status: "paid",
    bookingDate: "2026-08-15",
    paymentMethod: "visa",
  },
  {
    id: 9,
    reportName: "booking-report-009",
    receivedFrom: "د/ محمد علي",
    bookingType: "consultation",
    status: "pending",
    bookingDate: "2026-08-14",
    paymentMethod: "cash",
  },
  {
    id: 10,
    reportName: "booking-report-010",
    receivedFrom: "د/ أحمد محمد",
    bookingType: "emergency",
    status: "paid",
    bookingDate: "2026-08-13",
    paymentMethod: "visa",
  },
  {
    id: 11,
    reportName: "booking-report-011",
    receivedFrom: "د/ سارة حسن",
    bookingType: "regular",
    status: "overdue",
    bookingDate: "2026-08-12",
    paymentMethod: "cash",
  },
  {
    id: 12,
    reportName: "booking-report-012",
    receivedFrom: "د/ محمد علي",
    bookingType: "consultation",
    status: "paid",
    bookingDate: "2026-08-11",
    paymentMethod: "visa",
  },
];
