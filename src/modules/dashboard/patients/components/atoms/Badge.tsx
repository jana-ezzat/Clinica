import React from "react";

interface BadgeProps {
  type: "new" | "returning";
  labels: { new: string; returning: string };
}

export default function Badge({
  type,
  labels,
}: BadgeProps) {
  const isReturning = type === "returning";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        isReturning ? "ds-badge-info" : "ds-badge-success"
      }`}>
      {isReturning ? labels.returning : labels.new}
    </span>
  );
}
