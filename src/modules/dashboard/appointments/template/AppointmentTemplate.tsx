import { getTranslations } from "next-intl/server";

import StatsGrid from "@/shared/components/molecules/StatsGrid";
import { appointmentStatCards } from "../lib/mockData";
import { appointmentStatIcons } from "../lib/statIcons";
import AppointmentsHeader from "../components/organisms/AppointmentHeader";
import AppointmentsTable from "../components/organisms/AppointmentTable";

export default async function AppointmentsTemplate() {
  const t = await getTranslations("appointments");

  return (
    <div className="space-y-6">
      <AppointmentsHeader />
      <StatsGrid
        stats={appointmentStatCards}
        icons={appointmentStatIcons}
        comparisonLabel={t("fromAverage")}
      />
      <AppointmentsTable />
    </div>
  );
}
