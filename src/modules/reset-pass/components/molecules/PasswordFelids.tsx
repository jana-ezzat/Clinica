"use client";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/cn";
import Input from "@/shared/components/atoms/Input";
import Label from "@/shared/components/atoms/lable";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  type?: "email" | "password" | "text";
}

const PasswordFelids = forwardRef<HTMLInputElement, Props>(
  ({ label, error, id, type = "text", className = "", ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword ? (visible ? "text" : "password") : type;

    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          hasError={!!error}
          ref={ref}
          type={type}
          className={cn("mt-1.5", className)}
          {...props}
        />

        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

export default PasswordFelids;
