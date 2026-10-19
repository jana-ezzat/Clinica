import Text from "@/shared/components/atoms/Text";

interface Props {
  title: string;
  methodLabel: string;
  method: string;
  statusLabel: string;
  status: string;
  dateLabel: string;
  date: string;
}

export default function PaymentDetails({
  title,
  methodLabel,
  method,
  statusLabel,
  status,
  dateLabel,
  date,
}: Props) {
  const items = [
    { label: methodLabel, value: method },
    { label: statusLabel, value: status },
    { label: dateLabel, value: date },
  ];

  return (
    <div className="flex flex-col gap-3">
      <Text size="lg" variant="primary" className="font-bold">
        {title}
      </Text>

      <div className="ds-bg-card ds-shadow-sm grid grid-cols-1 gap-4 rounded-xl p-5 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 text-start">
            <Text size="xs" variant="secondary" className="p-0">
              {item.label}
            </Text>
            <Text size="sm" variant="primary" className="p-0 font-bold">
              {item.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
