import { cn } from "@/lib/cn";

const COLORS = {
  pink: "ds-badge-pink",
  yellow: "ds-badge-yellow",
  blue: "ds-badge-info",
  orange: "ds-badge-orange",
  green: "ds-badge-green",
} as const;

export default function Tag({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-md text-xs font-medium",
        COLORS[color],
      )}>
      {children}
    </span>
  );
}
