import type { ComponentType, SVGProps } from "react";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import { cn } from "@/lib/utils";

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaPositive,
}: Props) {
  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <Text size="sm" className="!p-0 font-medium">
          {label}
        </Text>
        <Icon size={22} className="ds-text-secondary" />
      </div>

      <Title size="md" className="mb-2 !p-0 font-bold">
        {value}
      </Title>

      <div className="flex items-center justify-between text-xs">
        <Text size="xs" className="!p-0">
          من الشهر الماضي
        </Text>
        <Text
          size="xs"
          className={cn(
            "!inline-flex !p-0 items-center gap-1 font-medium",
            deltaPositive ? "!text-emerald-500" : "!text-red-500",
          )}>
          {delta}
          {deltaPositive ? (
            <MdOutlineTrendingUp size={14} />
          ) : (
            <MdOutlineTrendingDown size={14} />
          )}
        </Text>
      </div>
    </div>
  );
}
