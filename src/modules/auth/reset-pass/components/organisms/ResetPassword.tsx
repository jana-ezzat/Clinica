"use client";
import FormHead from "../molecules/FormHead";
import FormCard from "@/shared/components/atoms/Auth/FormCard";
import { useTranslations } from "next-intl";
import { TbLockPassword } from "react-icons/tb";
import Button from "@/shared/components/atoms/Button";
import LoginLink from "@/shared/components/atoms/Auth/LoginLink";
import FooterNote from "@/shared/components/atoms/Auth/FooterNote";
import Modal from "@/shared/components/atoms/Modal";
import useRestPassword from "@/lib/hooks/useRestPassword";
import PasswordFelids from "../molecules/PasswordFelids";

const ResetPassword = () => {
  const t = useTranslations("resetpassword");
  const c = useTranslations("resetpassword.commonAuth");
  const { register, handleSubmit, errors, success, onSubmit, router } =
    useRestPassword();
  return (
    <div className="flex w-full flex-col items-center">
      <FormCard>
        <FormHead
          title={t("title")}
          description={t("description")}
          icon={TbLockPassword}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <PasswordFelids
            id="password"
            label={t("label")}
            placeholder={t("placeholder")}
            type="password"
            error={
              errors.password?.message && t(`error.${errors.password.message}`)
            }
            {...register("password")}
          />

          <PasswordFelids
            id="confirmPassword"
            label={t("titleConfirm")}
            placeholder={t("placeholderConfirm")}
            type="password"
            error={
              errors.confirmPassword?.message &&
              t(`error.${errors.confirmPassword.message}`)
            }
            {...register("confirmPassword")}
          />

          <Button variant="primary" className="w-full mt-4" type="submit">
            {t("btn")}
          </Button>
          <LoginLink>{c("loginLink")}</LoginLink>
        </form>
      </FormCard>

      <FooterNote
        question={c("rememberPassword")}
        linkLabel={c("returnToLogin")}
        href="/sign-in"
      />

      {/* Modal */}
      <Modal
        show={success}
        title={t("success.title")}
        message={t("success.description")}
        onClose={() => {
          router.push("/sign-in");
        }}
      />
    </div>
  );
};

export default ResetPassword;
