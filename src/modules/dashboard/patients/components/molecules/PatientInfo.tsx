"use client";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import PatientButton from "./PatientButton";
import ModalField from "./ModalField";
import PatientTitle from "./PatientTitle";
import { AppointmentFormValues } from "@/modules/dashboard/lib/schema/AppointmentModalSechma";


interface Props {
  register: UseFormRegister<AppointmentFormValues>;
  errors: FieldErrors<AppointmentFormValues>;
}

const PatientInfo = ({ register, errors }: Props) => {
  const t = useTranslations("appointmentsModal.addAppointment.patient");

  const [patientType, setPatientType] = useState<"new" | "existing">("new");

  return (
    <div className="flex flex-col gap-4 rounded-md border border-gray-200 px-4 py-4">
      <PatientTitle text={t("subtitle")} title={t("title")} />

      <Text size="sm">{t("patientType")}</Text>

      <PatientButton patientType={patientType} onChange={setPatientType} />

      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ModalField
          label={t("name")}
          name="name"
          required
          register={register}
          error={errors.name}
          type="text"
          placeholder={t("name")}
        />

        <ModalField
          label={t("nationality")}
          name="nationality"
          required
          register={register}
          error={errors.nationality}
          type="text"
          placeholder={t("nationality")}
        />

        <ModalField
          label={t("phone")}
          name="phone"
          required
          register={register}
          error={errors.phone}
          type="tel"
          placeholder="01xxxxxxx"
        />

        <ModalField
          label={t("email")}
          name="email"
          required
          placeholder="email@gmail.com"
          register={register}
          error={errors.email}
          type="email"
        />
      </div>
    </div>
  );
};

export default PatientInfo;
