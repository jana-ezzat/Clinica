"use client";
import FormCard from "@/shared/components/atoms/Auth/FormCard";
import FormHead from "@/modules/auth/reset-pass/components/molecules/FormHead";
import { EmailField } from "@/modules/auth/reset-pass/components/molecules/EmailField";
import PasswordFelids from "@/modules/auth/reset-pass/components/molecules/PasswordFelids";
import Button from "@/shared/components/atoms/Button";
import FooterNote from "@/shared/components/atoms/Auth/FooterNote";
import ForgotPasswordLink from "@/shared/components/atoms/Auth/ForgotPasswordLink";
import { useTranslations } from "next-intl";
import { MdLogin } from "react-icons/md";
import useLogin from "@/lib/Hooks/useLogin";

const SignIn = () => {
  const t = useTranslations("signin");
  const { register, handleSubmit, errors, isSubmitting, apiError } = useLogin();

  return (
    <div className="flex w-full flex-col items-center">
      <FormCard>
        <FormHead
          title={t("title")}
          description={t("description")}
          icon={MdLogin}
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailField
            id="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message && t(`error.${errors.email.message}`)}
            {...register("email")}
          />

          <PasswordFelids
            id="password"
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
            type="password"
            error={
              errors.password?.message && t(`error.${errors.password.message}`)
            }
            {...register("password")}
          />

          <ForgotPasswordLink>{t("forgotPassword")}</ForgotPasswordLink>

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
        </form>
      </FormCard>

      <FooterNote
        question={t("noAccount")}
        linkLabel={t("signUp")}
        href="/sign-up"
      />
    </div>
  );
};

export default SignIn;
