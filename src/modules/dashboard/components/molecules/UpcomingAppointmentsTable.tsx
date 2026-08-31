import { MdChevronLeft } from "react-icons/md";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import type {
  AppointmentStatus,
  UpcomingAppointment,
} from "../../lib/mockData";
import Badge, { type BadgeTone } from "@/shared/components/atoms/Badge";

const statusConfig: Record<
  AppointmentStatus,
  { label: string; tone: BadgeTone }
> = {
  confirmed: { label: "مؤكد", tone: "success" },
  cancelled: { label: "ملغي", tone: "red" },
  pending: { label: "قيد الانتظار", tone: "neutral" },
};

type Props = {
  appointments: UpcomingAppointment[];
};

export default function UpcomingAppointmentsTable({ appointments }: Props) {
  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <button className="flex items-center gap-1 text-sm ds-text-secondary hover:opacity-70">
          <MdChevronLeft size={16} />
          عرض الكل
        </button>
        <Title size="sm" className="p-0! font-bold">
          المواعيد القادمة
        </Title>
      </div>
      <Text size="sm" className="mb-4 p-0 text-end">
        جدول مواعيد اليوم
      </Text>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="ds-bg-button-primary text-white">
              <th className="rounded-e-lg px-4 py-3 text-start font-medium">
                المريض
              </th>
              <th className="px-4 py-3 text-start font-medium">الوقت</th>
              <th className="px-4 py-3 text-start font-medium">نوع الكشف</th>
              <th className="rounded-s-lg px-4 py-3 text-start font-medium">
                الحالة
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b ds-border-gray">
                <td className="px-4 py-3 ds-text">{appt.patient}</td>
                <td className="px-4 py-3 ds-text-secondary">{appt.time}</td>
                <td className="px-4 py-3 ds-text-secondary">{appt.type}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusConfig[appt.status].tone}>
                    {statusConfig[appt.status].label}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
