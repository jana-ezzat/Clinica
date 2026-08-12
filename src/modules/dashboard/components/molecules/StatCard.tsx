import type { ComponentType, SVGProps } from "react";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";

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
        <Icon size={22} className="ds-text-secondary" />
        <span className="text-sm font-medium ds-text-secondary">{label}</span>
      </div>
      <div className="mb-2 text-2xl font-bold ds-text">{value}</div>
      <div className="flex items-center justify-between text-xs">
        <span className="ds-text-secondary">من الشهر الماضي</span>
        <span
          className={`flex items-center gap-1 font-medium ${
            deltaPositive ? "text-emerald-500" : "text-red-500"
          }`}>
          {delta}
          {deltaPositive ? (
            <MdOutlineTrendingUp size={14} />
          ) : (
            <MdOutlineTrendingDown size={14} />
          )}
        </span>
      </div>
    </div>
  );
}
