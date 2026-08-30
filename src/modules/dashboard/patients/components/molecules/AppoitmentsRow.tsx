import Badge, { type BadgeTone } from "@/shared/components/atoms/Badge";
import Text from "@/shared/components/atoms/Text";

interface Props {
  doctor: string;
  type: string;
  datetime: string;
  status: string;
  statusColor?: BadgeTone;
}

export default function AppointmentRow({
  doctor,
  type,
  datetime,
  status,
  statusColor = "info",
}: Props) {
  return (
    <div className="flex items-center justify-between py-4">
      <Badge tone={statusColor} size="md">
        {status}
      </Badge>
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
