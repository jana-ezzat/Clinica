import React from "react";
import Title from "../atoms/Title";
import Text from "../atoms/Text";

interface HeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "right" | "left" | "center";
}

const ALIGN_CLASS: Record<
  NonNullable<HeaderProps["align"]>,
  string
> = {
  right: "text-right",
  left: "text-left",
  center: "text-center",
};

export default function Header({
  title,
  subtitle,
  align = "right",
}: HeaderProps) {
  return (
    <div className={ALIGN_CLASS[align]}>
      <Title size="lg" className="ds-text font-bold">
        {title}
      </Title>
      {subtitle && (
        <Text size="sm" className="ds-text-secondary">
          {subtitle}
        </Text>
      )}
    </div>
  );
}
