"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatsGrid from "@/shared/components/molecules/StatsGrid";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";
import { cn } from "@/lib/cn";
import { dashboardStatIcons } from "../lib/statIcons";
import NewPatientsTable from "../components/molecules/NewPatientsTable";
import UpcomingAppointmentsTable from "../components/molecules/UpcomingAppointmentsTable";
import RevenueChart from "../components/organisms/RevenueChart";
import WeeklyAppointmentsChart from "../components/organisms/WeeklyAppointmentsChart";
import { useDashboardData } from "../hooks/useDashboardData";
import { buildDashboard, EMPTY_RAW } from "../lib/dashboardStats";

export default function DashboardHomeTemplate() {
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const tModal = useTranslations("appointmentsModal.addAppointment");
  const tStats = useTranslations("dashboard.home.stats");
  const tErr = useTranslations("dashboard.home.errors");

  const { data, isLoading, isError, refetch } = useDashboardData();

  // Zeros + empty charts while loading, so the layout never jumps.
  const empty = useMemo(() => buildDashboard(EMPTY_RAW, locale), [locale]);
  const dashboard = data ?? empty;

  const stats = dashboard.stats.map(({ labelKey, ...stat }) => ({
    ...stat,
    label: tStats(labelKey),
  }));

  const rawName = dashboard.doctor?.name ?? "";
  const doctorName =
    dashboard.doctor?.role === "doctor"
      ? `${locale === "ar" ? "د/" : "Dr."} ${rawName}`
      : rawName;

  return (
    <div className={cn("space-y-6", isLoading && "animate-pulse")}>
      <DashboardHeader
        doctorName={doctorName}
        addAppointmentLabel={`+ ${tModal("title")}`}
      />

      {isError && (
        <div className="flex items-center justify-between rounded-xl border ds-border-gray ds-bg-card p-4">
          <Text size="sm" className="!p-0">
            {tErr("load")}
          </Text>
          <Button variant="primary" onClick={() => refetch()}>
            {tErr("retry")}
          </Button>
        </div>
      )}
      {data && data.failed.length > 0 && (
        <Text size="sm" className="!p-0">
          {tErr("partial")}
        </Text>
      )}
 
      <StatsGrid
        stats={stats}
        icons={dashboardStatIcons}
        comparisonLabel={t("lastMonth")}
        locale={locale}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NewPatientsTable patients={dashboard.newPatients} />
        <UpcomingAppointmentsTable
          appointments={dashboard.upcomingAppointments}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart data={dashboard.monthlyRevenue} />
        <WeeklyAppointmentsChart data={dashboard.weeklyAppointments} />
      </div>
    </div>
  );
}
