import type { ComponentType, SVGProps } from "react";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import { cn } from "@/lib/cn";
import { BADGE_TONES, type BadgeTone } from "@/shared/components/atoms/Badge";
import type { StatCardData } from "@/shared/types/stats";

type Props = StatCardData & {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  iconTone: BadgeTone;
  comparisonLabel: string;
};

export default function StatCard({
  icon: Icon,
  iconTone,
  label,
  value,
  delta,
  deltaPositive,
  comparisonLabel,
  date,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm",
      )}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Text size="sm" variant="primary" className="!p-0 font-medium">
            {label}
          </Text>
          {date && (
            <Text size="xs" variant="secondary" className="!p-0 mt-2">
              {date}
            </Text>
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            BADGE_TONES[iconTone],
          )}>
          <Icon size={18} />
        </div>
      </div>

      <Title size="md" className="mb-2 !p-0 font-bold text-end">
        {value}
      </Title>

      <div className="flex items-center justify-between text-xs">
        <Text
          size="xs"
          variant="accent"
          className={cn(
            "!inline-flex !p-0 items-center gap-1 font-medium",
            deltaPositive ? "ds-text-success" : "ds-text-error",
          )}>
          {deltaPositive ? (
            <MdOutlineTrendingUp size={14} />
          ) : (
            <MdOutlineTrendingDown size={14} />
          )}
          {delta}
        </Text>
        <Text size="xs" className="!p-0">
          {comparisonLabel}
        </Text>
      </div>
    </div>
  );
}
