import Tag from "@/shared/components/atoms/Tag";
import Text from "@/shared/components/atoms/Text";

interface Props {
  doctor: string;
  type: string;
  datetime: string;
  status: string;
  statusColor?: "pink" | "yellow" | "blue" | "orange" | "green";
}

export default function AppointmentRow({
  doctor,
  type,
  datetime,
  status,
  statusColor = "blue",
}: Props) {
  return (
    <div className="flex items-center justify-between py-4">
      <Tag color={statusColor}>{status}</Tag>

      <Text size="sm" variant="secondary">
        {type}
      </Text>

      <Text size="sm" variant="secondary">
        {datetime}
      </Text>

      <Text size="sm" variant="primary" className="font-medium">
        {doctor}
      </Text>
    </div>
  );
}
