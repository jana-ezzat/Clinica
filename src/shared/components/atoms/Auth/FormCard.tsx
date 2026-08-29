import { cn } from "@/lib/cn";
import React from "react";

interface FormCardProps {
  children: React.ReactNode;
  className?: string;
}

const FormCard = ({ children, className }: FormCardProps) => {
  return (
    <div
      className={cn(
        "ds-bg-card mx-auto w-full rounded-[18px] px-4 pb-6 pt-7 shadow-xl sm:max-w-[691px] sm:px-10 sm:pb-7 sm:pt-9 md:px-14",
        className,
      )}>
      {children}
    </div>
  );
};

export default FormCard;
