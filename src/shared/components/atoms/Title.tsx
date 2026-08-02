import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  variant?: "primary" | "secondary" | "inverse";
  center?: boolean;
  className?: string;
}

export default function Title({
  children,
  size = "xl",
  variant = "primary",
  center = false,
  className = "p-0 font-bold",
}: Props) {
  const sizes = {
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    xxl: "text-5xl",
    xxxl: "text-6xl",
  };
  const variants = {
    primary: "ds-text",
    secondary: "ds-text-secondary",
    inverse: "ds-text-inverse",
  };
  return (
    <h1
      className={cn(
        sizes[size],
        variants[variant],
        center ? "text-center" : "",
        className,
      )}
    >
      {children}
    </h1>
  );
}
