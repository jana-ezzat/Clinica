import Text from "@/shared/components/atoms/Text";

interface Props {
  title: string;
  invoiceNumber: string;
  dateLabel: string;
  date: string;
  timeLabel: string;
  time: string;
}

const InvoicesDate = ({
  title,
  invoiceNumber,
  dateLabel,
  date,
  timeLabel,
  time,
}: Props) => {
  return (
    <div className="flex items-center justify-between rounded-xl px-5 py-4">
      <div className="flex flex-col gap-2 text-start">
        <Text variant="primary" size="md">
          {title}
        </Text>

        <Text variant="primary" size="lg">
          {invoiceNumber}
        </Text>
      </div>
      <div className="flex flex-col gap-2 text-start text-sm">
        <div>
          <Text variant="primary" size="sm">
            {dateLabel}
          </Text>
          <Text variant="primary" size="sm" className="mt-1">
            {date}
          </Text>
        </div>

        <div>
          <Text variant="primary" size="sm">
            {timeLabel}
          </Text>
          <Text variant="primary" size="sm" className="mt-1">
            {time}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default InvoicesDate;
