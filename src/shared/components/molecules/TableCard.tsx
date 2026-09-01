import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TableCardProps {
  children: ReactNode;
  footer?: ReactNode;
  minWidth?: string;
  className?: string;
}

export default function TableCard({
  children,
  footer,
  minWidth,
  className,
}: TableCardProps) {
  return (
    <div
      className={cn(
        "ds-bg-card ds-shadow-sm overflow-hidden rounded-[18px]",
        className,
      )}>
      <div className="overflow-x-auto">
        <table className={cn("w-full text-right", minWidth)}>{children}</table>
      </div>
      {footer}
    </div>
  );
}
