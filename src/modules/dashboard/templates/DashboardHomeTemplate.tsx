import { getTranslations } from "next-intl/server";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatsGrid from "@/shared/components/molecules/StatsGrid";
import { dashboardStatIcons } from "../lib/statIcons";
import NewPatientsTable from "../components/molecules/NewPatientsTable";
import UpcomingAppointmentsTable from "../components/molecules/UpcomingAppointmentsTable";
import RevenueChart from "../components/organisms/RevenueChart";
import WeeklyAppointmentsChart from "../components/organisms/WeeklyAppointmentsChart";
import { NewPatient, StatCardData, UpcomingAppointment } from "../lib/mockData";


interface DashboardHomeTemplateProps {
  doctorName: string;
  stats: StatCardData[];
  patients: NewPatient[];
  appointments: UpcomingAppointment[];
}

export default async function DashboardHomeTemplate({
  doctorName,
  stats,
  patients,
  appointments,
}: DashboardHomeTemplateProps) {
  const t = await getTranslations("dashboard");
  const tModal = await getTranslations("appointmentsModal.addAppointment");
  const tStats = await getTranslations("dashboard.home.stats");
  const translatedStats = stats.map(({ labelKey, ...stat }) => ({
    ...stat,
    label: tStats(labelKey),
  }));

  return (
    <div className="space-y-6">
      <DashboardHeader
        doctorName={doctorName}
        addAppointmentLabel={`+ ${tModal("title")}`}
      />
      <StatsGrid
        stats={translatedStats}
        icons={dashboardStatIcons}
        comparisonLabel={t("lastMonth")}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NewPatientsTable patients={patients} />
        <UpcomingAppointmentsTable appointments={appointments} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart />
        <WeeklyAppointmentsChart />
      </div>
    </div>
  );
}
