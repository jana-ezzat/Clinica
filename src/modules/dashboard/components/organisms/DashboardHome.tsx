import { MdOutlineWarningAmber, MdOutlineAttachMoney } from "react-icons/md";
import { MdOutlineCalendarToday, MdOutlineGroup } from "react-icons/md";
import Button from "@/shared/components/atoms/Button";
import WelcomeBanner from "../molecules/WelcomeBanner";
import StatCard from "../molecules/StatCard";
import NewPatientsTable from "../molecules/NewPatientsTable";
import UpcomingAppointmentsTable from "../molecules/UpcomingAppointmentsTable";
import RevenueChart from "./RevenueChart";
import WeeklyAppointmentsChart from "./WeeklyAppointmentsChart";
import {
  statCards,
  newPatients,
  upcomingAppointments,
} from "../../lib/mockData";

const statIcons = [
  MdOutlineWarningAmber,
  MdOutlineAttachMoney,
  MdOutlineCalendarToday,
  MdOutlineGroup,
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="primary" className="shrink-0">
          + إضافة موعد جديد
        </Button>
        <WelcomeBanner doctorName="د/ أحمد محمد" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <StatCard key={stat.label} icon={statIcons[i]} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NewPatientsTable patients={newPatients} />
        <UpcomingAppointmentsTable appointments={upcomingAppointments} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart />
        <WeeklyAppointmentsChart />
      </div>
    </div>
  );
}
