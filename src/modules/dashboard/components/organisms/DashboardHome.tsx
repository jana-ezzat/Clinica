import DashboardHomeTemplate from "../../templates/DashboardHomeTemplate";
import {
  statCards,
  newPatients,
  upcomingAppointments,
} from "../../lib/mockData";

export default function DashboardHome() {
  return (
    <DashboardHomeTemplate
      doctorName="د/ أحمد محمد"
      stats={statCards}
      patients={newPatients}
      appointments={upcomingAppointments}
    />
  );
}
