import { cn } from "@/lib/cn";
import React, { forwardRef, InputHTMLAttributes } from "react";

interface Props extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  value: string;
  length?: number;
  hasError?: boolean;
  className?: string;
  onComplete?: (value: string) => void;
}

const OtpInput = forwardRef<HTMLInputElement, Props>(
  (
    { value, length = 1, hasError = false, className = "", onComplete, ...props },
    ref,
  ) => {
    return (
      <input
        className={cn(
          "h-14 w-12 rounded-md border border-gray-300 p-2 text-center text-xl font-bold outline-none transition-all",
          hasError
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-(--ds-primary)",
          className,
        )}
        ref={ref}
        type="text"
        inputMode="numeric"
        maxLength={length}
        value={value}
        {...props}
        onChange={(e) => onComplete?.(e.target.value)}
      />
    );
  },
);

export default OtpInput;
