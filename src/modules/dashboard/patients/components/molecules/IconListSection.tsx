import type { LucideIcon } from "lucide-react";
import Title from "@/shared/components/atoms/Title";

interface Props {
  title: string;
  items: string[];
  icon: LucideIcon;
  iconClassName?: string;
}
export default function IconListSection({
  title,
  items,
  icon: Icon,
  iconClassName = "text-blue-500",
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Title size="md" className="text-base sm:text-lg md:text-xl">
        {title}
      </Title>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <Icon size={16} className={`mt-0.5 shrink-0 ${iconClassName}`} />
            <span className="text-sm ds-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
