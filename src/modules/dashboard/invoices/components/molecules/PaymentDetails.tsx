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

const PaymentDetails = ({
  title,
  methodLabel,
  method,
  statusLabel,
  status,
  dateLabel,
  date,
}: Props) => {
  const details = [
    {
      label: methodLabel,
      value: method,
    },
    {
      label: statusLabel,
      value: status,
      isGreen: true,
    },
    {
      label: dateLabel,
      value: date,
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Text size="lg" variant="primary" className="font-medium">
        {title}
      </Text>

      <div className="grid grid-cols-3 items-start">
        {details.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <Text size="sm" variant="secondary">
              {item.label}
            </Text>

            <Text
              size="sm"
              variant={item.isGreen ? "accent" : "primary"}
            >
              {item.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentDetails;
