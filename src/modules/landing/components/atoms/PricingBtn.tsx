import type { Dispatch, ReactNode, SetStateAction } from "react";
import { cn } from "@/lib/cn";

type PricingBtnProps = {
  children: ReactNode;
  isActive: boolean;
  type: "month" | "year";
  setIsMonthly: (value: boolean) => void;
};

export default function PricingBtn({
  children,
  isActive,
  type,
  setIsMonthly,
}: PricingBtnProps) {
  function clickHandler() {
    setIsMonthly(type === "month");
  }

  return (
    <button
      onClick={clickHandler}
      className={cn(
        "cursor-pointer rounded-lg transition-all duration-200 px-4 sm:px-6 lg:px-8 py-2 text-sm sm:text-base",
        isActive
          ? "ds-bg-button-primary ds-text-inverse shadow-md"
          : "ds-text-secondary hover:opacity-80",
      )}>
      {children}
    </button>
  );
}
