// src/shared/components/atoms/Input.tsx
"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  className?: string;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { type = "text", hasError = false, className = "", icon, trailingIcon, ...props },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword ? (visible ? "text" : "password") : type;

    return (
      <div className="relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute start-3.5 text-[var(--ds-text-secondary)]">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          type={resolvedType}
          className={cn(
            "h-11 w-full rounded-lg px-3.5 text-sm  transition-colors",
            "bg-ds-card-background text-ds-text placeholder:text-ds-text-secondary",
            isPassword && "pl-10",
            icon && "ps-10",
            trailingIcon && "pe-10",
            "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
            hasError
              ? "border-red-500 focus:border-red-500  border-2 focus:outline-none"
              : " border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500",
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute left-3 top-1/2 -translate-y-1/3 text-[var(--ds-text-secondary)]"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {trailingIcon && !isPassword && (
          <span className="pointer-events-none absolute end-3.5 text-[var(--ds-text-secondary)]">
            {trailingIcon}
          </span>
        )}
      </div>
    );
  },
);

export default Input;
