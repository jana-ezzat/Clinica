import { MdChevronLeft } from "react-icons/md";
import { useTranslations } from "next-intl";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";
import type {
  AppointmentStatus,
  UpcomingAppointment,
} from "../../lib/mockData";

const statusClassNames: Record<AppointmentStatus, string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-500 text-white",
  pending: "ds-bg-grey ds-text-secondary",
};

type Props = {
  appointments: UpcomingAppointment[];
};

export default function UpcomingAppointmentsTable({ appointments }: Props) {
  const t = useTranslations("dashboard.home.upcomingAppointments");

  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="!gap-1 !p-0 !text-sm ds-text-secondary hover:opacity-70">
          <MdChevronLeft size={16} />
          {t("viewAll")}
        </Button>
        <Title size="sm" className="p-0! font-bold">
          {t("title")}
        </Title>
      </div>
      <Text size="sm" className="mb-4 p-0 text-end">
        {t("subtitle")}
      </Text>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="ds-bg-button-primary text-white">
              <th className="rounded-e-lg px-4 py-3 text-start font-medium">
                {t("columns.patient")}
              </th>
              <th className="px-4 py-3 text-start font-medium">
                {t("columns.time")}
              </th>
              <th className="px-4 py-3 text-start font-medium">
                {t("columns.type")}
              </th>
              <th className="rounded-s-lg px-4 py-3 text-start font-medium">
                {t("columns.status")}
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
                      statusClassNames[appt.status]
                    }`}>
                    {t(`status.${appt.status}`)}
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
