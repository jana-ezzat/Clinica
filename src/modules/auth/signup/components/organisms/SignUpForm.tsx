"use client";
import FormHead from "@/modules/auth/reset-pass/components/molecules/FormHead";
import FormCard from "@/shared/components/atoms/Auth/FormCard";
import InputField from "@/shared/components/atoms/Auth/InputField";
import LoginLink from "@/shared/components/atoms/Auth/LoginLink";
import Button from "@/shared/components/atoms/Button";
import { useTranslations } from "next-intl";
import { ROLES } from "@/modules/auth/schema/signUpSchema";
import useSignUp from "@/modules/auth/hooks/useSignUp";
import SelectField from "@/shared/components/molecules/SelectField";

export default function SignUpForm() {
  const t = useTranslations("sign-up");
  const { register, handleSubmit, errors, isSubmitting, apiError } =
    useSignUp();

  return (
    <FormCard className="w-full max-w-172.75">
      <FormHead title={t("title")} description={t("description")} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="name"
          type="text"
          label={t("label")}
          placeholder={t("placeholder")}
          error={errors.name?.message && t(`error.${errors.name.message}`)}
          {...register("name")}
        />

        <SelectField
          id="role"
          label={t("role.label")}
          placeholder={t("role.placeholder")}
          options={ROLES.map((role) => ({
            value: role,
            label: t(`role.options.${role}`),
          }))}
          error={errors.role?.message && t(`error.${errors.role.message}`)}
          {...register("role")}
        />

        <InputField
          id="specialty"
          type="text"
          label={t("specialty.label")}
          placeholder={t("specialty.placeholder")}
          error={
            errors.specialty?.message && t(`error.${errors.specialty.message}`)
          }
          {...register("specialty")}
        />

        <InputField
          id="email"
          type="email"
          label={t("email.label")}
          placeholder={t("email.placeholder")}
          error={errors.email?.message && t(`error.${errors.email.message}`)}
          {...register("email")}
        />

        <InputField
          id="password"
          type="password"
          label={t("password.label")}
          placeholder={t("password.placeholder")}
          error={
            errors.password?.message && t(`error.${errors.password.message}`)
          }
          {...register("password")}
        />

        <InputField
          id="confirmPassword"
          type="password"
          label={t("confirmPassword.label")}
          placeholder={t("confirmPassword.placeholder")}
          error={
            errors.confirmPassword?.message &&
            t(`error.${errors.confirmPassword.message}`)
          }
          {...register("confirmPassword")}
        />

        {apiError && (
          <p className="text-center text-sm text-red-500">
            {t(`error.${apiError}`)}
          </p>
        )}

        <Button
          variant="primary"
          className="mt-4 w-full"
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ? t("btnLoading") : t("btn")}
        </Button>
        <LoginLink>{t("loginLink")}</LoginLink>
      </form>
    </FormCard>
  );
}
