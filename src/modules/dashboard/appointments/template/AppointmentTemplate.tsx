import AppointmentsHeader from "../components/organisms/AppointmentHeader";
import AppointmentsStats from "../components/organisms/AppointmentStats";
import AppointmentsTable from "../components/organisms/AppointmentTable";

export default function AppointmentsTemplate() {
  return (
    <div className="space-y-6">
      <AppointmentsHeader />
      <AppointmentsStats />
      <AppointmentsTable />
    </div>
  );
}
