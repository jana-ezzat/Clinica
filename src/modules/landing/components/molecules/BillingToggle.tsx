"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import PricingBtn from "../atoms/PricingBtn";

export default function BillingToggle({
  onChange,
}: {
  onChange?: (isMonthly: boolean) => void;
}) {
  const [isMonthly, setIsMonthly] = useState(true);
  const t = useTranslations("pricing");

  function handleChange(value: boolean) {
    setIsMonthly(value);
    onChange?.(value);
  }

  return (
    <div className="inline-flex items-center gap-1 ds-bg-card rounded-lg p-1">
      <PricingBtn type="year" isActive={!isMonthly} setIsMonthly={handleChange}>
        {t("yearly")}
      </PricingBtn>
      <PricingBtn type="month" isActive={isMonthly} setIsMonthly={handleChange}>
        {t("monthly")}
      </PricingBtn>
    </div>
  );
}
