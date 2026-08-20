import React from "react";
import type { LucideIcon } from "lucide-react";
import Text from "../atoms/Text";
import IconTextRow from "../atoms/IconTextRow";

interface IconListProps {
  label: string;
  icon: LucideIcon;
  items: string[];
  className?: string;
  iconClassName?: string;
}

export default function IconList({
  label,
  icon,
  items,
  className = "",
  iconClassName,
}: IconListProps) {
  return (
    <div className={className}>
      <Text size="sm" variant="accent" className="mb-2 font-bold">
        {label}
      </Text>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <IconTextRow key={item} icon={icon} iconClassName={iconClassName}>
            {item}
          </IconTextRow>
        ))}
      </div>
    </div>
  );
}
