"use client";
import { useLocale, useTranslations } from "next-intl";
import Accordion from "../molecules/Accordion";
import AppointmentRow from "../molecules/AppoitmentsRow";
import usePatientAppointments from "../../hooks/usePatientAppointments";
import { formatLongDate } from "@/lib/utils";
import { appointmentStatusTone } from "@/modules/dashboard/appointments/lib/appointmentStatus";

const LATEST_COUNT = 2;

const padTime = (time: string) => (time.length === 4 ? `0${time}` : time);

interface Props {
  patientId: string;
}

export default function LatestSection({ patientId }: Props) {
  const t = useTranslations("patients.details.latest");
  const tTypes = useTranslations("appointments.bookingTypes");
  const tStatuses = useTranslations("appointments.statuses");
  const locale = useLocale();

  const { data, isLoading, isError } = usePatientAppointments(patientId);
  const latest = (data ?? []).slice(0, LATEST_COUNT);

  return (
    <Accordion title={t("title")}>
      {isLoading && (
        <p className="ds-text-secondary py-4 text-sm">{t("loading")}</p>
      )}
      {isError && <p className="py-4 text-sm text-red-500">{t("loadError")}</p>}
      {!isLoading && !isError && latest.length === 0 && (
        <p className="ds-text-secondary py-4 text-sm">{t("empty")}</p>
      )}

      {latest.length > 0 && (
        <div className="ds-border-gray flex flex-col divide-y">
          {latest.map((appt) => (
            <AppointmentRow
              key={appt.id}
              doctor={appt.doctorName}
              type={tTypes(appt.type)}
              datetime={`${padTime(appt.time)} - ${formatLongDate(appt.date, locale)}`}
              status={tStatuses(appt.status)}
              statusColor={appointmentStatusTone[appt.status]}
            />
          ))}
        </div>
      )}
    </Accordion>
  );
}
