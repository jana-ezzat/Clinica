import { cn } from "@/lib/cn";
import StatCard from "./StatCard";
import type {
  StatCardDisplayData,
  StatCardIconConfig,
  StatCardId,
} from "@/shared/types/stats";

interface StatsGridProps {
  stats: StatCardDisplayData[];
  icons: Partial<Record<StatCardId, StatCardIconConfig>>;
  comparisonLabel: string;
}

export default function StatsGrid({
  stats,
  icons,
  comparisonLabel,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const config = icons[stat.id];
        return config ? (
          <StatCard
            key={stat.id}
            icon={config.icon}
            iconTone={config.tone}
            comparisonLabel={comparisonLabel}
            {...stat}
          />
        ) : null;
      })}
    </div>
  );
}
