"use client";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/atoms/Button";
import type {
  EditPatientFormOutput,
  EditPatientFormValues,
} from "../../schema/EditPatientSchema";
import { errorClass, fieldClass } from "../../lib/formStyles";

interface Props {
  control: Control<EditPatientFormValues, any, EditPatientFormOutput>;
  register: UseFormRegister<EditPatientFormValues>;
  errors: FieldErrors<EditPatientFormValues>;
}

export default function PreviousSurgeriesField({
  control,
  register,
  errors,
}: Props) {
  const t = useTranslations("patients.edit");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousSurgeries",
  });

  return (
    <div className="sm:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm">{t("surgeries.title")}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => append({ name: "", date: "" })}>
          {t("surgeries.add")}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[1fr_auto_auto] items-start gap-3">
            <div>
              <input
                className={fieldClass}
                placeholder={t("surgeries.namePlaceholder")}
                aria-label={t("surgeries.namePlaceholder")}
                {...register(`previousSurgeries.${index}.name`)}
              />
              {errors.previousSurgeries?.[index]?.name && (
                <span className={errorClass}>{t("required")}</span>
              )}
            </div>
            <div>
              <input
                type="date"
                className={fieldClass}
                aria-label={t("surgeries.date")}
                {...register(`previousSurgeries.${index}.date`)}
              />
              {errors.previousSurgeries?.[index]?.date && (
                <span className={errorClass}>{t("required")}</span>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => remove(index)}>
              {t("surgeries.remove")}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
