"use client";
import { useEffect, useMemo, useState } from "react";
import useAppointments from "./useAppointments";
import { getLocalDateString } from "@/lib/utils";
import type { AppointmentStatValue } from "../lib/mockData";

const DAY_MS = 24 * 60 * 60 * 1000;

const useAppointmentStats = (): AppointmentStatValue[] => {
  const { data: appointments } = useAppointments();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  return useMemo(() => {
    const list = appointments ?? [];

    if (now === null) {
      return [
        { id: "bookingsToday", value: "0", delta: "", deltaPositive: true },
        { id: "confirmedToday", value: "0", delta: "", deltaPositive: true },
        { id: "confirmationRate", value: "0%", delta: "", deltaPositive: true },
      ];
    }

    const todayStr = getLocalDateString(new Date(now));

    const isWithinLast7Days = (dateStr: string, excludeToday = true) => {
      const diffDays = Math.floor((now - new Date(dateStr).getTime()) / DAY_MS);
      return diffDays > (excludeToday ? 0 : -1) && diffDays <= 7;
    };

    const todayAppointments = list.filter((a) => a.bookingDate === todayStr);
    const confirmedToday = todayAppointments.filter(
      (a) => a.status === "confirmed",
    );

    const last7Days = list.filter((a) => isWithinLast7Days(a.bookingDate));
    const avgPerDay = last7Days.length / 7;
    const avgConfirmedPerDay =
      last7Days.filter((a) => a.status === "confirmed").length / 7;

    const pctDelta = (
      todayVal: number,
      avgVal: number,
    ): { delta: string; positive: boolean } => {
      if (avgVal === 0) return { delta: "—", positive: true };
      const pct = Math.round(((todayVal - avgVal) / avgVal) * 100);
      return { delta: `${pct >= 0 ? "+" : ""}${pct}%`, positive: pct >= 0 };
    };

    const bookingsDelta = pctDelta(todayAppointments.length, avgPerDay);
    const confirmedDelta = pctDelta(confirmedToday.length, avgConfirmedPerDay);

    const confirmedTotal = list.filter((a) => a.status === "confirmed").length;
    const confirmationRate =
      list.length > 0 ? Math.round((confirmedTotal / list.length) * 100) : 0;

    return [
      {
        id: "bookingsToday",
        value: String(todayAppointments.length),
        delta: bookingsDelta.delta,
        deltaPositive: bookingsDelta.positive,
      },
      {
        id: "confirmedToday",
        value: String(confirmedToday.length),
        delta: confirmedDelta.delta,
        deltaPositive: confirmedDelta.positive,
      },
      {
        id: "confirmationRate",
        value: `${confirmationRate}%`,
        delta: "",
        deltaPositive: true,
      },
    ];
  }, [appointments, now]);
};

export default useAppointmentStats;
