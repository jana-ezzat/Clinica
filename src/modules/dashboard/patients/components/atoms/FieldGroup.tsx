import Text from "@/shared/components/atoms/Text";

export default function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Text size="sm" variant="accent" className="font-bold mb-2">
        {label}
      </Text>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
