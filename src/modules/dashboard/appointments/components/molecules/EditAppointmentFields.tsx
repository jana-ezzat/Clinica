"use client";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { EditAppointmentFormValues } from "../../schema/EditAppointmentSchema";
import {
  APPOINTMENT_STATUSES,
  APPOINTMENT_TYPES,
} from "../../lib/appointmentOptions";

interface Props {
  register: UseFormRegister<EditAppointmentFormValues>;
  errors: FieldErrors<EditAppointmentFormValues>;
}

const fieldClass =
  "h-11 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none";

export default function EditAppointmentFields({ register, errors }: Props) {
  const t = useTranslations("appointmentsModal.editAppointment");
  const tTypes = useTranslations("appointments.bookingTypes");
  const tStatuses = useTranslations("appointments.statuses");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-sm">
        {t("date")}
        <input type="date" className={fieldClass} {...register("date")} />
        {errors.date && (
          <span className="text-xs text-red-500">{t("required")}</span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm">
        {t("time")}
        <input type="time" className={fieldClass} {...register("startTime")} />
        {errors.startTime && (
          <span className="text-xs text-red-500">{t("required")}</span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm">
        {t("type")}
        <select className={fieldClass} {...register("type")}>
          {APPOINTMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {tTypes(type)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm">
        {t("status")}
        <select className={fieldClass} {...register("status")}>
          {APPOINTMENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {tStatuses(status)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
