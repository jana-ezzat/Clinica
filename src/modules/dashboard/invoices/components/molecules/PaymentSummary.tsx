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

function Row({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Text size="sm" variant="secondary" className="p-0">
        {label}
      </Text>
      <Text
        size={strong ? "md" : "sm"}
        variant="primary"
        className={strong ? "p-0 font-bold" : "p-0"}>
        {value}
      </Text>
    </div>
  );
}

export default function PaymentSummary({
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
}: Props) {
  return (
    <div className="ds-bg-card ds-shadow-sm flex w-full flex-col gap-3 rounded-xl p-5 md:ms-auto md:max-w-sm">
      <Row label={totalLabel} value={total} />
      <Row label={discountLabel} value={discount} />
      <div className="ds-border-gray border-t pt-3">
        <Row label={netTotalLabel} value={netTotal} strong />
      </div>
      <Row label={paidLabel} value={paid} />
      <Row label={paymentMethodLabel} value={paymentMethod} />
    </div>
  );
}
