"use client";
import React from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import PatientButton from "./PatientButton";
import ModalField from "./ModalField";
import PatientTitle from "./PatientTitle";
import { AppointmentFormValues } from "@/shared/schema/AppointmentModalSechma";
import usePatients from "@/modules/dashboard/patients/hooks/usePatients";

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
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPatientPlaceholder")}
            className="ds-border w-full rounded-md border px-3 py-2 text-sm"
          />
          {isLoading && <Text size="sm">{t("loading")}</Text>}
          <div className="max-h-40 overflow-y-auto rounded-md border">
            {filtered.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPatient(p.id)}
                className="block w-full px-3 py-2 text-start text-sm hover:bg-gray-100">
                {p.name} — {p.phone}
              </button>
            ))}
            {filtered.length === 0 && !isLoading && (
              <p className="px-3 py-2 text-sm text-gray-400">
                {t("noResults")}
              </p>
            )}
          </div>
          {errors.patientId && (
            <p className="text-sm text-red-500">{errors.patientId.message}</p>
          )}
        </div>
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
