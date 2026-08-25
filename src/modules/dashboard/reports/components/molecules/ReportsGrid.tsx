import StatCard from "@/modules/dashboard/components/molecules/StatCard";
import { CalendarDays, Siren, Users, Wallet } from "lucide-react";
import type { StatCardData } from "@/modules/dashboard/lib/mockData";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const reportStatIcons: IconComponent[] = [Users, CalendarDays, Wallet, Siren];


interface ReportsGridProps {
  stats: StatCardData[];
}

const ReportsGrid = ({ stats }: ReportsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} icon={reportStatIcons[i]} {...stat} />
      ))}
    </div>
  );
};

export default ReportsGrid;
