import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export default function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium",
        "ds-bg-secondary ds-text-inverse",
        className,
      )}>
      {children}
    </span>
  );
}
