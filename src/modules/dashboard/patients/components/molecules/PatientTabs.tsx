"use client";
import React from "react";

export type PatientTab =
  | "overview"
  | "visits"
  | "medicalFile"
  | "invoices"
  | "attachments";

interface PatientTabsProps {
  active: PatientTab;
  onChange: (tab: PatientTab) => void;
  labels: Record<PatientTab, string>;
}

const TAB_ORDER: PatientTab[] = [
  "overview",
  "visits",
  "medicalFile",
  "invoices",
  "attachments",
];

export default function PatientTabs({
  active,
  onChange,
  labels,
}: PatientTabsProps) {
  return (
    <div className="flex w-full justify-evenly pt-6">
      {TAB_ORDER.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`shrink-0 whitespace-nowrap px-1 pb-3 text-xs font-medium transition-colors sm:text-sm md:text-base lg:text-lg ${
            active === tab
              ? "ds-text-primary"
              : "ds-text-secondary hover:ds-text"
          }`}>
          {labels[tab]}
        </button>
      ))}
    </div>
  );
}
