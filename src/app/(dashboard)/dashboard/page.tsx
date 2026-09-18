import DashboardHomeTemplate from "@/modules/dashboard/templates/DashboardHomeTemplate";
import {
  statCards,
  newPatients,
  upcomingAppointments,
} from "@/modules/dashboard/lib/mockData";

export default function DashboardPage() {
  return (
    <DashboardHomeTemplate
      doctorName="د/ أحمد محمد"
      stats={statCards}
      patients={newPatients}
      appointments={upcomingAppointments}
    />
  );
}
