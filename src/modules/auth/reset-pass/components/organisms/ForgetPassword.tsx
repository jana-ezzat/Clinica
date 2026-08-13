"use client";
import FormCard from "@/shared/components/atoms/Auth/FormCard";
import FormHead from "../molecules/FormHead";
import { MdOutlineEmail } from "react-icons/md";
import { EmailField } from "../molecules/EmailField";
import Button from "@/shared/components/atoms/Button";
import LoginLink from "@/shared/components/atoms/Auth/LoginLink";
import FooterNote from "@/shared/components/atoms/Auth/FooterNote";
import { useTranslations } from "next-intl";
import Modal from "@/shared/components/atoms/Modal";
import useForgetPassword from "@/modules/auth/hooks/useForgetPassword";

const ForgetPassword = () => {
  const t = useTranslations("forgetpassword");
  const c = useTranslations("resetpassword.commonAuth");
  const { register, handleSubmit, errors, success, router, submitemail } =
    useForgetPassword();

  return (
    <div className="flex w-full flex-col items-center">
      <FormCard>
        <FormHead
          title={t("title")}
          description={t("description")}
          icon={MdOutlineEmail}
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailField
            id="email"
            label={t("label")}
            placeholder={t("placeholder")}
            error={errors.email?.message && t(`error.${errors.email.message}`)}
            {...register("email")}
          />

          <Button variant="primary" className="w-full mt-4" type="submit">
            {t("btn")}
          </Button>
        </form>

        <LoginLink>{c("loginLink")}</LoginLink>
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
        message={t("success.description", { email: submitemail })}
        onClose={() => {
          router.push("/otp");
        }}
      />
    </div>
  );
};

export default ForgetPassword;
