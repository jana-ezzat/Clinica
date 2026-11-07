"use client";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import PatientButton from "./PatientButton";
import ModalField from "./ModalField";
import PatientTitle from "./PatientTitle";
import { AppointmentFormValues } from "@/modules/dashboard/appointments/schema/AppointmentModalSchema";
import usePatients from "@/modules/dashboard/patients/hooks/usePatients";
import ExistingPatientPicker from "./ExistingPatientPicker";

interface Props {
  register: UseFormRegister<AppointmentFormValues>;
  errors: FieldErrors<AppointmentFormValues>;
  setValue: UseFormSetValue<AppointmentFormValues>;
  patientType: "new" | "existing";
  onPatientTypeChange: (type: "new" | "existing") => void;
}

const PatientInfo = ({
  register,
  errors,
  setValue,
  patientType,
  onPatientTypeChange,
}: Props) => {
  const t = useTranslations("appointmentsModal.addAppointment.patient");
  const [search, setSearch] = React.useState("");
  const { data: patients, isLoading } = usePatients();

  const [selectedId, setSelectedId] = useState<string>();

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setValue("patientId", id, { shouldValidate: true });
  };

  const filtered = (patients ?? []).filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelectPatient = (patientId: string) => {
    setValue("patientId", patientId);
  };

  return (
    <div className="flex flex-col gap-4 rounded-md border border-gray-200 px-4 py-4">
      <PatientTitle text={t("subtitle")} title={t("title")} />
      <Text size="sm">{t("patientType")}</Text>
      <PatientButton patientType={patientType} onChange={onPatientTypeChange} />

      {patientType === "existing" ? (
        <ExistingPatientPicker
          selectedId={selectedId}
          onSelect={handleSelect}
          error={errors.patientId?.message}
        />
      ) : (
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
            placeholder="email@gmail.com"
            register={register}
            error={errors.email}
            type="email"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{t("gender")}</label>
            <select
              className="ds-border w-full rounded-md border px-3 py-2 text-sm"
              {...register("gender")}>
              <option value="">{t("gender")}</option>
              <option value="male">{t("genderOptions.male")}</option>
              <option value="female">{t("genderOptions.female")}</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender.message}</p>
            )}
          </div>
          <ModalField
            label={t("age")}
            name="age"
            required
            register={register}
            error={errors.age}
            type="number"
            placeholder={t("age")}
          />
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
