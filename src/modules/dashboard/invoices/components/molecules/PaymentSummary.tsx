import Text from "@/shared/components/atoms/Text";

interface Props {
  totalLabel: string;
  total: string;
  discountLabel: string;
  discount: string;
  netTotalLabel: string;
  netTotal: string;
  paidLabel: string;
  paid: string;
  paymentMethodLabel: string;
  paymentMethod: string;
}

const PaymentSummary = ({
  totalLabel,
  total,
  discountLabel,
  discount,
  netTotalLabel,
  netTotal,
  paidLabel,
  paid,
  paymentMethodLabel,
  paymentMethod,
}: Props) => {
  const rows = [
    {
      label: totalLabel,
      value: total,
    },
    {
      label: discountLabel,
      value: discount,
    },
    {
      label: netTotalLabel,
      value: netTotal,
    },
    {
      label: paidLabel,
      value: paid,
      isGreen: true,
    },
    {
      label: paymentMethodLabel,
      value: paymentMethod,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {rows.map((row, index) => (
        <div key={row.label}>
          <div className="grid grid-cols-3 items-center mb-6">
            <Text size="sm" variant="secondary">
              {row.label}
            </Text>

            <Text size="sm" variant={row.isGreen ? "accent" : "primary"}>
              {row.value}
            </Text>
          </div>
          {index === 2 && (
            <div className="border-t border ds-border-secondary mx-1 " />
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentSummary;
