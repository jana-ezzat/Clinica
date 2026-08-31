import type { ComponentType, SVGProps } from "react";
import StatCard from "./StatCard";
import type { StatCardData, StatCardId } from "@/shared/types/stats";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

interface StatsGridProps {
  stats: StatCardData[];
  icons: Record<StatCardId, IconComponent>;
  comparisonLabel: string;
}

export default function StatsGrid({
  stats,
  icons,
  comparisonLabel,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          icon={icons[stat.id]}
          comparisonLabel={comparisonLabel}
          {...stat}
        />
      ))}
    </div>
  );
}
