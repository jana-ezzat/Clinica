"use client";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";
import { VisitFormValues } from "../../schema/visitSchema";

interface Props {
  register: UseFormRegister<VisitFormValues>;
  errors: FieldErrors<VisitFormValues>;
}

const fieldClass =
  "h-11 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none";
const areaClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none";
const labelClass = "flex flex-col gap-2 text-sm";

export default function VisitFormFields({ register, errors }: Props) {
  const t = useTranslations("visitHistory");

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          {t("form.visitDate")}
          <input
            type="datetime-local"
            className={fieldClass}
            {...register("visitDate")}
          />
          {errors.visitDate && (
            <span className="text-xs text-red-500">{t("form.required")}</span>
          )}
        </label>
        <label className={labelClass}>
          {t("form.followUpDate")}
          <input
            type="date"
            className={fieldClass}
            {...register("followUpDate")}
          />
        </label>
      </div>

      <label className={labelClass}>
        {t("reason")}
        <input className={fieldClass} {...register("reason")} />
        {errors.reason && (
          <span className="text-xs text-red-500">{t("form.required")}</span>
        )}
      </label>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <label className={labelClass}>
          {t("weight")}
          <input
            type="number"
            step="any"
            className={fieldClass}
            {...register("weight")}
          />
        </label>
        <label className={labelClass}>
          {t("height")}
          <input
            type="number"
            step="any"
            className={fieldClass}
            {...register("height")}
          />
        </label>
        <label className={labelClass}>
          {t("pulse")}
          <input
            type="number"
            step="any"
            className={fieldClass}
            {...register("pulse")}
          />
        </label>
        <label className={labelClass}>
          {t("temperature")}
          <input
            type="number"
            step="any"
            className={fieldClass}
            {...register("temperature")}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          {t("diagnosis")}
          <textarea rows={2} className={areaClass} {...register("diagnosis")} />
        </label>
        <label className={labelClass}>
          {t("prescription")}
          <textarea rows={2} className={areaClass} {...register("treatment")} />
        </label>
      </div>

      <label className={labelClass}>
        {t("doctorNotes")}
        <textarea rows={2} className={areaClass} {...register("doctorNotes")} />
      </label>
    </div>
  );
}
