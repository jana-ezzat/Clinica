// src/shared/components/atoms/DataField.tsx
import Text from "@/shared/components/atoms/Text";

export default function DataField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-full" : undefined}>
      <Text size="sm" variant="accent" className="font-bold mb-2">
        {label}
      </Text>
      <Text size="sm">{value}</Text>
    </div>
  );
}
