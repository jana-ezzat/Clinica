import { MdChevronLeft } from "react-icons/md";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import type {
  AppointmentStatus,
  UpcomingAppointment,
} from "../../lib/mockData";

const statusStyles: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  confirmed: {
    label: "مؤكد",
    className: "bg-emerald-100 text-emerald-700",
  },
  cancelled: {
    label: "ملغي",
    className: "bg-red-500 text-white",
  },
  pending: {
    label: "قيد الانتظار",
    className: "ds-bg-grey ds-text-secondary",
  },
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
              <th className="px-4 py-3 text-start font-medium">
                نوع الكشف
              </th>
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
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[appt.status].className
                    }`}>
                    {statusStyles[appt.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
