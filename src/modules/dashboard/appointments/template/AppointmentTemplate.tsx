import { getTranslations } from "next-intl/server";

import StatsGrid from "@/shared/components/molecules/StatsGrid";
import { appointmentStatValues } from "../lib/mockData";
import { appointmentStatIcons } from "../lib/statIcons";
import AppointmentsHeader from "../components/organisms/AppointmentHeader";
import AppointmentsTable from "../components/organisms/AppointmentTable";
import { StatCardData } from "@/shared/types/stats";

export default async function AppointmentsTemplate() {
  const t = await getTranslations("appointments");
 const stats: StatCardData[] = appointmentStatValues.map((stat) => ({
   ...stat,
   labelKey: t(`stats.${stat.id}`),
   date: t("stats.date"),
 }));
  return (
    <div className="space-y-6">
      <AppointmentsHeader />
      <StatsGrid
        stats={stats}
        icons={appointmentStatIcons}
        comparisonLabel={t("fromAverage")}
      />
      <AppointmentsTable />
    </div>
  );
}
