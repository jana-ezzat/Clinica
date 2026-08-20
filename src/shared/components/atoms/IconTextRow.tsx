import type { ComponentType } from "react";
import Text from "@/shared/components/atoms/Text";

export default function IconTextRow({
  icon: Icon,
  children,
  iconClassName = "ds-text-secondary",
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  iconClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className={`${iconClassName} mt-1 shrink-0`} />
      <Text size="sm">{children}</Text>
    </div>
  );
}
