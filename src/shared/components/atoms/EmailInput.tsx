import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  className?: string;
}

const EmailInput = forwardRef<HTMLInputElement, Props>(
  ({ hasError = false, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-lg border px-3.5 text-sm outline-none transition-colors",
          "bg-ds-card-background text-ds-text placeholder:text-ds-text-secondary",
          hasError
            ? "border-red-500 focus:border-red-500"
            : "border-ds-shadow-sm focus:border-ds-primary",
          className,
        )}
        {...props}
      />
    );
  },
);

export default EmailInput;
