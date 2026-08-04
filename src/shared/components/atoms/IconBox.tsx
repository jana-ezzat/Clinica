import { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

interface Props {
  icon: IconType;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
}

export default function IconBox({
  icon: Icon,
  size = "md",
  variant = "primary",
  className = "",
}: Props) {
  const box = {
    sm: "h-11 w-11",
    md: "h-14 w-14",
    lg: "h-16 w-16",
  };
  const iconSize = {
    sm: 20,
    md: 26,
    lg: 30,
  };
  const variants = {
   primary: "bg-[var(--ds-primary)]/10 ds-text-primary",
    secondary: "bg-[var(--ds-secondary)] text-[var(--ds-text)]",
  };

  return (
    <div
      className={cn(
        "mx-auto flex items-center justify-center rounded-full",
        box[size],
        variants[variant],
        className,
      )}
    >
      <Icon size={iconSize[size]} />
    </div>
  );
}
