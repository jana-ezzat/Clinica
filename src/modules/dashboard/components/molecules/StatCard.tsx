import type { ComponentType, SVGProps } from "react";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { StatCardData } from "@/modules/dashboard/lib/mockData";

type Props = StatCardData & {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaPositive,
}: Props) {
  const t = useTranslations("dashboard");

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
          {t("lastMonth")}
        </Text>
        <Text
          size="xs"
          className={cn(
            "!inline-flex !p-0 items-center gap-1 font-medium",
            deltaPositive ? "ds-text-success" : "ds-text-error",
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
