"use client";
import { useTranslations, useLocale } from "next-intl";
import StatsGrid from "@/shared/components/molecules/StatsGrid";
import { appointmentStatIcons } from "../../lib/statIcons";
import useAppointmentStats from "../../hooks/useAppointmentStats";
import useFormattedDay from "@/shared/hooks/useFormattedDay";

export default function AppointmentsStats() {
  const t = useTranslations("appointments");
  const locale = useLocale();
  const statValues = useAppointmentStats();

  const todayLabel = useFormattedDay();

  const stats = statValues.map((stat) => ({
    ...stat,
    label: t(`stats.${stat.id}`),
    date: todayLabel,
  }));

  return (
    <StatsGrid
      stats={stats}
      icons={appointmentStatIcons}
      comparisonLabel={t("fromAverage")}
      locale={locale}
    />
  );
}
