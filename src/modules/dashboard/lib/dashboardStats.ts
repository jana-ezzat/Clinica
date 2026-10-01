import type {
  AppointmentStatus,
  NewPatient,
  StatCardData,
  UpcomingAppointment,
  VisitType,
} from "./mockData";

/* -------------------------------------------------------------------------- */
/*  Shapes we expect from the backend.                                        */
/*  If a field name differs, fix it HERE only - the UI never sees raw data.   */
/* -------------------------------------------------------------------------- */

export type EntityRef =
  | string
  | { _id: string; name?: string; personalInformation?: { name?: string } };

export interface ApiAppointment {
  _id: string;
  patient?: EntityRef | null; // null when the patient was deleted
  doctor?: EntityRef;
  date: string; // "2026-09-30T00:00:00.000Z"
  startTime?: string; // "10:00" - free text in the backend, see parseTime
  type?: string; // "consultation" | "check-up" | ...
  status?: string;
}

export interface ApiPatient {
  _id: string;
  slug?: string;
  createdAt?: string;
  personalInformation: { name: string; dateOfBirth?: string; age?: number };
}

export interface ApiVisit {
  _id: string;
  patient?: EntityRef | null;
  visitDate?: string;
  reason?: string;
}

export interface ApiInvoice {
  _id: string;
  paid: number;
  invoiceDate?: string;
  createdAt?: string;
}

export interface DashboardRaw {
  me: { name?: string; role?: string } | null;
  appointments: ApiAppointment[];
  patients: ApiPatient[];
  visits: ApiVisit[];
  invoices: ApiInvoice[];
}

export const EMPTY_RAW: DashboardRaw = {
  me: null,
  appointments: [],
  patients: [],
  visits: [],
  invoices: [],
};

/* -------------------------------------------------------------------------- */
/*  Output shapes used by the components                                      */
/* -------------------------------------------------------------------------- */

const MONTH_KEYS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;
export type MonthKey = (typeof MONTH_KEYS)[number];

// Week starts on Saturday (matches the design).
const WEEK_KEYS = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;
export type WeekdayKey = (typeof WEEK_KEYS)[number];

export type MonthlyRevenuePoint = { monthKey: MonthKey; revenue: number };
export type WeeklyAppointmentPoint = { dayKey: WeekdayKey; count: number };

export interface DashboardData {
  doctor: { name: string; role?: string } | null;
  stats: StatCardData[];
  newPatients: NewPatient[];
  upcomingAppointments: UpcomingAppointment[];
  monthlyRevenue: MonthlyRevenuePoint[];
  weeklyAppointments: WeeklyAppointmentPoint[];
}

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                             */
/* -------------------------------------------------------------------------- */

const pad = (n: number) => String(n).padStart(2, "0");

const dateKeyOf = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** "2026-09-01" stays as is; full ISO timestamps become the LOCAL date. */
function toDateKey(value?: string): string | null {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : dateKeyOf(d);
}

const idOf = (ref?: EntityRef | null): string =>
  !ref ? "" : typeof ref === "string" ? ref : ref._id;

const nameOfRef = (ref?: EntityRef | null): string | undefined =>
  !ref || typeof ref === "string"
    ? undefined
    : (ref.name ?? ref.personalInformation?.name);

/** Mongo ObjectId starts with the creation time (seconds, hex). */
const objectIdDate = (id: string): Date | null => {
  const seconds = parseInt(id.slice(0, 8), 16);
  return Number.isNaN(seconds) ? null : new Date(seconds * 1000);
};

const pctChange = (current: number, previous: number): number =>
  previous === 0
    ? current === 0
      ? 0
      : 100
    : Math.round(((current - previous) / previous) * 100);

function formatDelta(current: number, previous: number, locale: string) {
  const pct = pctChange(current, previous);
  const sign = pct >= 0 ? "+" : "-";
  const abs = Math.abs(pct);
  return {
    // In RTL the sign is written after the number so it renders as "+12%".
    delta: locale === "ar" ? `${abs}%${sign}` : `${sign}${abs}%`,
    deltaPositive: pct >= 0,
  };
}

const formatMoney = (n: number) =>
  `${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} EG`;

/**
 * startTime is free text in the backend ("10:00", "5:00", "1:30pm", even
 * "011pm"). Returns minutes since midnight, or null when it can't be read.
 * Without am/pm the value is read as 24h - we never guess a period.
 */
function parseTime(time?: string): number | null {
  if (!time) return null;
  const m = time
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})(?::?(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2] ?? 0);
  if (min > 59) return null;
  if (m[3]) {
    if (h < 1 || h > 12) return null;
    h = (h % 12) + (m[3] === "pm" ? 12 : 0);
  } else if (h > 23) {
    return null;
  }
  return h * 60 + min;
}

function formatTime(time: string | undefined, locale: string): string {
  const minutes = parseTime(time);
  if (minutes === null) return time?.trim() || "—"; // unreadable: show as typed
  const h = Math.floor(minutes / 60);
  const ar = locale === "ar";
  const suffix = h < 12 ? (ar ? "ص" : "AM") : ar ? "م" : "PM";
  return `${h % 12 || 12}:${pad(minutes % 60)}${ar ? "" : " "}${suffix}`;
}

function formatDate(date: Date | null, locale: string): string {
  if (!date || Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(
    locale === "ar" ? "ar-EG-u-nu-latn" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(date);
}

function ageFrom(dob: string | undefined, now: Date): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age >= 0 ? age : null;
}

/* ----- backend value -> UI value mapping (adjust if your enums differ) ----- */

const toStatus = (status?: string): AppointmentStatus => {
  const v = status?.toLowerCase();
  if (v === "confirmed" || v === "completed") return "confirmed";
  if (v === "cancelled" || v === "canceled") return "cancelled";
  return "pending";
};

const toVisitType = (type?: string): VisitType => {
  const v = type?.toLowerCase().replace(/[\s_-]/g, "");
  if (v === "followup") return "followUp";
  if (v === "consultation") return "consultation";
  if (v === "emergency") return "emergency";
  return "checkup";
};

const isActive = (a: ApiAppointment) => toStatus(a.status) !== "cancelled";

/* -------------------------------------------------------------------------- */
/*  Main entry                                                                */
/* -------------------------------------------------------------------------- */

export function buildDashboard(
  raw: DashboardRaw,
  locale: string,
  now: Date = new Date(),
): DashboardData {
  const { appointments, patients, visits, invoices } = raw;

  const todayKey = dateKeyOf(now);
  const thisMonth = todayKey.slice(0, 7);
  const lastMonth = dateKeyOf(
    new Date(now.getFullYear(), now.getMonth() - 1, 1),
  ).slice(0, 7);

  const apptMonth = (a: ApiAppointment) => toDateKey(a.date)?.slice(0, 7);
  const apptsToday = appointments.filter((a) => toDateKey(a.date) === todayKey);
  const apptsIn = (month: string) =>
    appointments.filter((a) => apptMonth(a) === month);

  const invoiceMonth = (i: ApiInvoice) =>
    toDateKey(i.invoiceDate ?? i.createdAt)?.slice(0, 7);
  const invoiceDay = (i: ApiInvoice) => toDateKey(i.invoiceDate ?? i.createdAt);
  const revenueIn = (month: string) =>
    invoices
      .filter((i) => invoiceMonth(i) === month)
      .reduce((sum, i) => sum + (i.paid || 0), 0);

  const distinctPatients = (list: ApiAppointment[]) =>
    new Set(list.map((a) => idOf(a.patient)).filter(Boolean)).size;

  const emergencies = (list: ApiAppointment[]) =>
    list.filter((a) => toVisitType(a.type) === "emergency");

  /* ---- stat cards (value = today, delta = this month vs last month) ---- */
  const revenueToday = invoices
    .filter((i) => invoiceDay(i) === todayKey)
    .reduce((sum, i) => sum + (i.paid || 0), 0);

  const stats: StatCardData[] = [
    {
      id: "emergencyCases",
      labelKey: "emergencies",
      value: String(emergencies(apptsToday).length),
      ...formatDelta(
        emergencies(apptsIn(thisMonth)).length,
        emergencies(apptsIn(lastMonth)).length,
        locale,
      ),
    },
    {
      id: "revenue",
      labelKey: "revenue",
      value: formatMoney(revenueToday),
      ...formatDelta(revenueIn(thisMonth), revenueIn(lastMonth), locale),
    },
    {
      id: "appointments",
      labelKey: "appointments",
      value: String(apptsToday.filter(isActive).length),
      ...formatDelta(
        apptsIn(thisMonth).filter(isActive).length,
        apptsIn(lastMonth).filter(isActive).length,
        locale,
      ),
    },
    {
      id: "todayPatients",
      labelKey: "patientsToday",
      value: String(distinctPatients(apptsToday.filter(isActive))),
      ...formatDelta(
        distinctPatients(apptsIn(thisMonth).filter(isActive)),
        distinctPatients(apptsIn(lastMonth).filter(isActive)),
        locale,
      ),
    },
  ];

  /* ---- lookups ---- */
  const patientNameById = new Map(
    patients.map((p) => [p._id, p.personalInformation?.name ?? ""]),
  );

  const lastReasonByPatient = new Map<string, string>();
  [...visits]
    .sort((a, b) => (b.visitDate ?? "").localeCompare(a.visitDate ?? ""))
    .forEach((v) => {
      const pid = idOf(v.patient);
      if (pid && v.reason && !lastReasonByPatient.has(pid)) {
        lastReasonByPatient.set(pid, v.reason);
      }
    });

  /* ---- new patients ---- */
  const createdAtOf = (p: ApiPatient) =>
    p.createdAt ? new Date(p.createdAt) : objectIdDate(p._id);

  const newPatients: NewPatient[] = [...patients]
    .sort((a, b) => b._id.localeCompare(a._id))
    .slice(0, 5)
    .map((p) => ({
      id: p._id,
      name: p.personalInformation?.name ?? "—",
      age:
        p.personalInformation?.age ??
        ageFrom(p.personalInformation?.dateOfBirth, now),
      symptoms: lastReasonByPatient.get(p._id) ?? "—",
      date: formatDate(createdAtOf(p), locale),
    }));

  /* ---- today's appointments ---- */
  const upcomingAppointments: UpcomingAppointment[] = [...apptsToday]
    .sort(
      (a, b) =>
        (parseTime(a.startTime) ?? Infinity) -
        (parseTime(b.startTime) ?? Infinity),
    )
    .slice(0, 5)
    .map((a) => ({
      id: a._id,
      patient:
        patientNameById.get(idOf(a.patient)) || nameOfRef(a.patient) || "—",
      time: formatTime(a.startTime, locale),
      typeKey: toVisitType(a.type),
      status: toStatus(a.status),
    }));

  /* ---- revenue chart: last 7 months ---- */
  const monthlyRevenue: MonthlyRevenuePoint[] = Array.from(
    { length: 7 },
    (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (6 - i), 1);
      return {
        monthKey: MONTH_KEYS[d.getMonth()],
        revenue: revenueIn(dateKeyOf(d).slice(0, 7)),
      };
    },
  );

  /* ---- weekly chart: current week, Saturday -> Friday ---- */
  const dayIndex = (now.getDay() + 1) % 7; // Sat = 0 ... Fri = 6
  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - dayIndex,
  );
  const countByDay = new Map<string, number>();
  appointments.filter(isActive).forEach((a) => {
    const key = toDateKey(a.date);
    if (key) countByDay.set(key, (countByDay.get(key) ?? 0) + 1);
  });
  const weeklyAppointments: WeeklyAppointmentPoint[] = WEEK_KEYS.map(
    (dayKey, i) => {
      const d = new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + i,
      );
      return { dayKey, count: countByDay.get(dateKeyOf(d)) ?? 0 };
    },
  );

  return {
    doctor: raw.me?.name ? { name: raw.me.name, role: raw.me.role } : null,
    stats,
    newPatients,
    upcomingAppointments,
    monthlyRevenue,
    weeklyAppointments,
  };
}
