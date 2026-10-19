import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";

interface Props {
  title: string;
  invoiceNumber: string;
  dateLabel: string;
  date: string;
  timeLabel: string;
  time: string;
}

export default function InvoicesDate({
  title,
  invoiceNumber,
  dateLabel,
  date,
  timeLabel,
  time,
}: Props) {
  return (
    <div className="flex flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1 text-start">
        <Title size="md" className="p-0 font-bold">
          {title}
        </Title>
        <Text size="sm" variant="secondary">
          {invoiceNumber}
        </Text>
      </div>

      <div className="flex flex-col gap-1 text-start sm:text-end">
        <Text size="sm" variant="secondary">
          {dateLabel}: {date}
        </Text>
        <Text size="sm" variant="secondary">
          {timeLabel}: {time}
        </Text>
      </div>
    </div>
  );
}
