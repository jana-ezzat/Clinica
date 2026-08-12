export type StatCardData = {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
};

// ⚠️ Mock data only — swap for real API data once the backend endpoints
// for stats/patients/appointments/revenue are ready.
export const statCards: StatCardData[] = [
  { label: "حالات طارئة", value: "3", delta: "2%+", deltaPositive: false },
  { label: "الإيرادات", value: "40.00 EG", delta: "80%+", deltaPositive: true },
  { label: "المواعيد", value: "25", delta: "55%+", deltaPositive: true },
  { label: "مرضى اليوم", value: "43", delta: "12%+", deltaPositive: true },
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

export type UpcomingAppointment = {
  id: string;
  patient: string;
  time: string;
  type: string;
  status: AppointmentStatus;
};

export const upcomingAppointments: UpcomingAppointment[] = [
  {
    id: "1",
    patient: "أمير سالم",
    time: "10:30ص",
    type: "كشف دوري",
    status: "confirmed",
  },
  {
    id: "2",
    patient: "أحمد جلال",
    time: "11:30ص",
    type: "متابعة",
    status: "cancelled",
  },
  {
    id: "3",
    patient: "عمرو جمال",
    time: "12:30م",
    type: "استشارة",
    status: "pending",
  },
];

export const monthlyRevenue = [
  { month: "يناير", revenue: 12000 },
  { month: "فبراير", revenue: 28000 },
  { month: "مارس", revenue: 62000 },
  { month: "ابريل", revenue: 10000 },
  { month: "مايو", revenue: 55000 },
  { month: "يونيو", revenue: 78000 },
  { month: "يوليو", revenue: 98000 },
];

export const weeklyAppointments = [
  { day: "السبت", count: 15, max: 18 },
  { day: "الأحد", count: 18, max: 18 },
  { day: "الأثنين", count: 5, max: 18 },
  { day: "الثلاثاء", count: 14, max: 18 },
  { day: "الأربعاء", count: 16, max: 18 },
  { day: "الخميس", count: 8, max: 18 },
  { day: "الجمعة", count: 11, max: 18 },
];
