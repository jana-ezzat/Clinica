"use client";
import FormCard from "@/shared/components/atoms/Auth/FormCard";
import AuthTop from "../molecules/AuthTop";
import FormHead from "../molecules/FormHead";
import { MdOutlineEmail } from "react-icons/md";
import { getTranslations } from "next-intl/server";
import { EmailField } from "../molecules/EmailField";
import Button from "@/shared/components/atoms/Button";
import LoginLink from "@/shared/components/atoms/Auth/LoginLink";
import FooterNote from "@/shared/components/atoms/Auth/FooterNote";
import { forgetPasswordSchema } from "@/lib/Sechma/ForgetPasswordSechma";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type ForgetPasswordFormValues = {
  email: string;
};
const ForgetPassword = () => {
  const t = useTranslations("forgetpassword");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  return (
    <div className="flex w-full flex-col items-center">
      <FormCard>
        <FormHead
          title={t("title")}
          description={t("description")}
          icon={MdOutlineEmail}
        />

        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <EmailField
            id="email"
            label={t("label")}
            placeholder={t("placeholder")}
            error={
              errors.email?.message &&
              t(`error.${errors.email.message}`)
            }
            {...register("email")}
          />

          <Button variant="primary" className="w-full mt-4" type="submit">
            {t("btn")}
          </Button>
        </form>

        <LoginLink>{t("loginLink")}</LoginLink>
      </FormCard>

      <FooterNote
        question={t("rememberPassword")}
        linkLabel={t("returnToLogin")}
        href="/sign-in"
      />
    </div>
  );
};

export default ForgetPassword;
