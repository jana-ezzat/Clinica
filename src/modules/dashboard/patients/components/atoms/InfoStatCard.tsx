import React from "react";

interface InfoStatCardProps {
  label: string;
  value: string;
}

export default function InfoStatCard({ label, value }: InfoStatCardProps) {
  return (
    <div className="ds-bg-grey flex flex-col items-center gap-3 rounded-lg px-4 py-3 text-center">
      <span className="ds-color-secondary text-sm font-semibold">{label}</span>
      <span className="ds-text text-sm font-semibold">{value}</span>
    </div>
  );
}
