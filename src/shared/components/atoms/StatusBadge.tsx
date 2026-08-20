import { cn } from "@/lib/cn";

const COLORS = {
  orange: "bg-orange-500 text-white",
  primary: "ds-bg-primary ds-text-inverse",
  red: "bg-red-500 text-white",
} as const;

export default function StatusBadge({
  children,
  color = "primary",
}: {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold",
        COLORS[color],
      )}>
      {children}
    </span>
  );
}
