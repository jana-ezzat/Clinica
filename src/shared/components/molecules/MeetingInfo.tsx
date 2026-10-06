"use client";
import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import PatientTitle from "./PatientTitle";
import ModalField from "./ModalField";
import Text from "@/shared/components/atoms/Text";
import SelectFields from "./SelectFields";
import { AppointmentFormValues } from "@/modules/dashboard/appointments/schema/AppointmentModalSchema";
import { APPOINTMENT_TYPES } from "@/modules/dashboard/appointments/lib/appointmentOptions";

interface Props {
  register: UseFormRegister<AppointmentFormValues>;
  errors: FieldErrors<AppointmentFormValues>;
}
const MeetingInfo = ({ register, errors }: Props) => {
  const t = useTranslations("appointmentsModal.addAppointment.meeting");
  const tTypes = useTranslations("appointments.bookingTypes");

  return (
    <div className="flex flex-col gap-4 rounded-md border border-gray-200 px-4 py-4">
      <PatientTitle text={t("subtitle")} title={t("title")} />

      <div className="mt-2 grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
        <ModalField
          label={t("date")}
          name="appointmentDate"
          type="date"
          register={register}
          required
          error={errors.appointmentDate}
        />

        <ModalField
          label={t("time")}
          name="time"
          type="time"
          register={register}
          required
          error={errors.time}
        />

        <SelectFields
          label={t("type")}
          placeholder={t("typePlaceholder")}
          name="appointmentType"
          register={register}
          error={errors.appointmentType}
          options={APPOINTMENT_TYPES.map((type) => ({
            value: type,
            label: tTypes(type),
          }))}
        />

        <SelectFields
          label={t("duration")}
          placeholder={t("durationPlaceholder")}
          name="duration"
          register={register}
          error={errors.duration}
          options={[
            { value: "15", label: t("durations.15") },
            { value: "30", label: t("durations.30") },
            { value: "45", label: t("durations.45") },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Text size="sm" variant="secondary">
          {t("notes")}
        </Text>

        <textarea
          {...register("notes")}
          placeholder={t("notesPlaceholder")}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {errors.notes && (
          <span className="text-xs text-red-500">{errors.notes.message}</span>
        )}
      </div>
    </div>
  );
};

export default MeetingInfo;
