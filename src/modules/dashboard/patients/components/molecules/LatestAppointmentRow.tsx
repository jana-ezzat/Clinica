import Badge, { type BadgeTone } from "@/shared/components/atoms/Badge";
import Text from "@/shared/components/atoms/Text";

interface Props {
  doctor: string;
  type: string;
  datetime: string;
  status: string;
  statusTone: BadgeTone;
  statusSolid?: boolean;
}

export default function LatestAppointmentRow({
  doctor,
  type,
  datetime,
  status,
  statusTone,
  statusSolid = false,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex flex-col gap-1">
        <Text size="sm" className="ds-text !p-0 font-medium">
          {doctor}
        </Text>
        <Text size="xs" variant="secondary" className="!p-0">
          {type}
        </Text>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="ds-text-secondary text-xs" dir="ltr">
          {datetime}
        </span>
        <Badge tone={statusTone} solid={statusSolid}>
          {status}
        </Badge>
      </div>
    </div>
  );
}
