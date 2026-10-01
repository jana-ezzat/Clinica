"use client";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import axiosConfig from "@/services/axiosConfig";
import {
  buildDashboard,
  type ApiAppointment,
  type ApiInvoice,
  type ApiPatient,
  type ApiVisit,
  type DashboardRaw,
} from "../lib/dashboardStats";

interface ListResponse<T> {
  status?: string;
  results?: number;
  // Either `data: [...]` or `data: { patients: [...] }` depending on endpoint.
  data?: T[] | Record<string, unknown>;
}

interface MeResponse {
  status?: string;
  data?: { name?: string; role?: string };
  name?: string;
  role?: string;
}

const getList = async <T>(url: string): Promise<T[]> => {
  const { data } = await axiosConfig.get<ListResponse<T>>(url);
  const payload = data.data;
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const nested = Object.values(payload).find(Array.isArray);
    if (nested) return nested as T[];
  }
  return [];
};

const getMe = async () => {
  const { data } = await axiosConfig.get<MeResponse>("user/me");
  const me = data.data ?? data;
  return { name: me.name, role: me.role };
};

type RawWithFailures = DashboardRaw & { failed: string[] };

/**
 * One request per resource, all in parallel. A failing source (for example a
 * role without invoice permission) only empties its own widgets instead of
 * breaking the whole page. If EVERYTHING fails we throw so the page can show
 * an error state.
 */
const fetchDashboardRaw = async (): Promise<RawWithFailures> => {
  const sources = {
    me: getMe(),
    appointments: getList<ApiAppointment>("appointment"),
    patients: getList<ApiPatient>("patient"),
    visits: getList<ApiVisit>("visit"),
    invoices: getList<ApiInvoice>("invoice"),
  };

  const names = Object.keys(sources) as (keyof typeof sources)[];
  const results = await Promise.allSettled(Object.values(sources));

  if (results.every((r) => r.status === "rejected")) {
    throw (results[0] as PromiseRejectedResult).reason;
  }

  const failed: string[] = [];
  const pick = <T>(name: keyof typeof sources, fallback: T): T => {
    const r = results[names.indexOf(name)];
    if (r.status === "fulfilled") return r.value as T;
    failed.push(name);
    return fallback;
  };

  return {
    me: pick("me", null),
    appointments: pick("appointments", [] as ApiAppointment[]),
    patients: pick("patients", [] as ApiPatient[]),
    visits: pick("visits", [] as ApiVisit[]),
    invoices: pick("invoices", [] as ApiInvoice[]),
    failed,
  };
};

export const useDashboardData = () => {
  const locale = useLocale();

  const select = useCallback(
    (raw: RawWithFailures) => ({
      ...buildDashboard(raw, locale),
      failed: raw.failed,
    }),
    [locale],
  );

  return useQuery({
    queryKey: ["dashboard-home"],
    queryFn: fetchDashboardRaw,
    select,
  });
};

export default useDashboardData;
