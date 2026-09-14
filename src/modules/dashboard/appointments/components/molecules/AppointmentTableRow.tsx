import Badge from "@/shared/components/atoms/Badge";
import RowActions from "@/shared/components/molecules/RowActions";
import type {
  AppointmentBooking,
  AppointmentBookingType,
} from "../../lib/mockData";
import type { AppointmentStatus } from "@/modules/dashboard/lib/mockData";
import { appointmentStatusSolid, appointmentStatusTone } from "../../lib/appointmentStatus";

interface AppointmentTableRowProps {
  appointment: AppointmentBooking;
  labels: {
    bookingTypes: Record<AppointmentBookingType, string>;
    statuses: Record<AppointmentStatus, string>;
    edit: string;
    delete: string;
  };
}

export default function AppointmentTableRow({
  appointment,
  labels,
}: AppointmentTableRowProps) {
  return (
    <tr className="ds-border-gray border-b transition-colors hover:bg-black/[0.02]">
      <td className="ds-text px-5 py-4 text-sm">{appointment.name}</td>
      <td className="ds-text-secondary px-5 py-4 text-sm">
        {labels.bookingTypes[appointment.bookingType]}
      </td>
      <td className="px-5 py-4 text-sm">
        <Badge
          tone={appointmentStatusTone[appointment.status]}
          solid={appointmentStatusSolid[appointment.status]}>
          {labels.statuses[appointment.status]}+{" "}
        </Badge>
      </td>
      <td className="ds-text-secondary px-5 py-4 text-sm" dir="ltr">
        {appointment.bookingDate}
      </td>
      <td className="ds-text-secondary px-5 py-4 text-sm" dir="ltr">
        {appointment.bookingTime}
      </td>
      <td className="px-5 py-4">
        <RowActions editLabel={labels.edit} deleteLabel={labels.delete} />
      </td>
    </tr>
  );
}
