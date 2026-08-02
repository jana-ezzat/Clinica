import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "inverse";
  center?: boolean;
  className?: string;
}

export default function Text({
  children,
  size = "md",
  variant = "secondary",
  center = false,
  className = "p-0 font-regular",
}: Props) {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };
  const variants = {
    primary: "ds-text",
    secondary: "ds-text-secondary",
    inverse: "ds-text-inverse",
  };
  return (
    <p
      className={cn(
        sizes[size],
        variants[variant],
        center ? "text-center" : "",
        className,
      )}>
      {children}
    </p>
  );
}
