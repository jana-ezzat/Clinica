import type { LucideIcon } from "lucide-react";
import Title from "@/shared/components/atoms/Title";

interface Props {
  title: string;
  items: string[];
  icon: LucideIcon;
  iconClassName?: string;
  emptyLabel?: string;
}

export default function IconListSection({
  title,
  items,
  icon: Icon,
  iconClassName = "text-blue-500",
  emptyLabel = "—",
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Title size="md" className="text-base sm:text-lg md:text-xl">
        {title}
      </Title>
      {items.length === 0 ? (
        <span className="ds-text-secondary text-sm">{emptyLabel}</span>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-start gap-2">
              <Icon size={16} className={`mt-0.5 shrink-0 ${iconClassName}`} />
              <span className="ds-text text-sm">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
