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
  locale: string;
}

export default function StatsGrid({
  stats,
  icons,
  comparisonLabel,
  locale,
}: StatsGridProps) {
  const isRtl = locale === "ar";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const config = icons[stat.id];
        return config ? (
          <div
            key={stat.id}
            style={{ order: isRtl ? stats.length - index : index }}>
            <StatCard
              icon={config.icon}
              iconTone={config.tone}
              comparisonLabel={comparisonLabel}
              {...stat}
            />
          </div>
        ) : null;
      })}
    </div>
  );
}
