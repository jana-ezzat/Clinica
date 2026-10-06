import Text from "@/shared/components/atoms/Text";
import { LucideIcon } from "lucide-react";

interface Item {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface Props {
  title: string;
  items: Item[];
}

export default function ProfileInfoCard({ title, items }: Props) {
  return (
    <div className="ds-bg-card ds-shadow-sm rounded-xl p-5 mb-3.5 mt-5">
      <div className="mb-4 border-b pb-3 dark:border-gray-50">
        <Text size="xl" className="font-medium">
          {title}
        </Text>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-start gap-2.5">
            <Icon size={16} className="ds-text-primary mt-0.5" />
            <div>
              <Text size="sm" className="text-gray-500 mb-0.5">
                {label}
              </Text>
              <Text size="sm" variant="primary">
                {value}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
