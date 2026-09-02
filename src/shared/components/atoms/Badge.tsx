import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type BadgeTone =
  | "primary"
  | "info"
  | "success"
  | "pink"
  | "yellow"
  | "orange"
  | "green"
  | "red"
  | "dark"
  | "neutral";

export const BADGE_TONES: Record<BadgeTone, string> = {
  primary: "ds-bg-secondary ds-text-inverse",
  info: "ds-badge-info",
  success: "ds-badge-success",
  pink: "ds-badge-pink",
  yellow: "ds-badge-yellow",
  orange: "ds-badge-orange",
  green: "ds-badge-green",
  red: "ds-badge-red",
  dark: "ds-badge-dark",
  neutral: "ds-badge-neutral",
};

const SOLID_TONES: Partial<Record<BadgeTone, string>> = {
  red: "bg-red-600 text-white",
};

const SIZES = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
} as const;

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  solid?: boolean;
  size?: keyof typeof SIZES;
  className?: string;
}

export default function Badge({
  children,
  tone = "info",
  size = "sm",
  solid = false,
  className,
}: BadgeProps) {
  const toneClass = solid
    ? (SOLID_TONES[tone] ?? BADGE_TONES[tone])
    : BADGE_TONES[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        SIZES[size],
        toneClass,
        className,
      )}>
      {children}
    </span>
  );
}
