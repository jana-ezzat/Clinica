import { cn } from "@/lib/cn";
import React from "react";

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium",
        "bg-(--ds-secondary)/10 text-(--ds-secondary)",
        className,
      )}>
      {children}
    </span>
  );
}
