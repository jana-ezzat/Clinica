import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";
import React from "react";

interface StatusCardProps {
  title?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: "default" | "error";
}

export default function StatusCard({
  title,
  description,
  actionLabel,
  onAction,
  tone = "default",
}: StatusCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20">
      {title && <Text className="ds-text font-medium">{title}</Text>}
      <Text
        className={`text-sm ${tone === "error" ? "text-destructive" : "ds-text-secondary"}`}>
        {description}
      </Text>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="ds-text-primary mt-1 text-sm font-medium underline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
