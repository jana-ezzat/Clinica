import { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export default function Label({ className = "", children, ...props }: Props) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-sm font-semibold text-ds-text",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
