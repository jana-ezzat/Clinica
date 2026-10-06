"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import Input from "@/shared/components/atoms/Input";
import { cn } from "@/lib/cn";
import {
  DOCTOR_ROLES,
  type EditDoctorFormValues,
} from "../../schema/editDoctorSchema";

type DoctorRole = (typeof DOCTOR_ROLES)[number];

interface Props {
  register: UseFormRegister<EditDoctorFormValues>;
  errors: FieldErrors<EditDoctorFormValues>;
  extraRole?: string;
}

const isDoctorRole = (role: string): role is DoctorRole =>
  DOCTOR_ROLES.includes(role as DoctorRole);

export default function EditDoctorFields({
  register,
  errors,
  extraRole,
}: Props) {
  const t = useTranslations("doctorProfile.editDialog");

  const roles =
    extraRole && !isDoctorRole(extraRole)
      ? [extraRole, ...DOCTOR_ROLES]
      : [...DOCTOR_ROLES];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Text size="sm" variant="secondary">
          {t("name")}
          <span className="text-red-500"> *</span>
        </Text>
        <Input
          {...register("name")}
          hasError={Boolean(errors.name)}
          placeholder={t("namePlaceholder")}
        />
        {errors.name?.message && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Text size="sm" variant="secondary">
          {t("email")}
          <span className="text-red-500"> *</span>
        </Text>
        <Input
          type="email"
          {...register("email")}
          hasError={Boolean(errors.email)}
          placeholder={t("emailPlaceholder")}
        />
        {errors.email?.message && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Text size="sm" variant="secondary">
          {t("role")}
          <span className="text-red-500"> *</span>
        </Text>
        <select
          {...register("role")}
          className={cn(
            "h-11 w-full rounded-lg px-3.5 text-sm",
            "bg-ds-card-background text-ds-text",
            errors.role ? "border border-red-500" : "border border-gray-300",
            "outline-none focus:outline-none focus:ring-0",
          )}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {isDoctorRole(role) ? t(`roles.${role}`) : role}
            </option>
          ))}
        </select>
        {errors.role?.message && (
          <span className="text-xs text-red-500">{errors.role.message}</span>
        )}
      </div>
    </div>
  );
}
