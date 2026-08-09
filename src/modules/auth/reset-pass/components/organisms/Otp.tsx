"use client";
import FooterNote from "@/shared/components/atoms/Auth/FooterNote";
import FormCard from "@/shared/components/atoms/Auth/FormCard";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import FormHead from "../molecules/FormHead";
import LoginLink from "@/shared/components/atoms/Auth/LoginLink";
import { TbLockPassword } from "react-icons/tb";
import Button from "@/shared/components/atoms/Button";
import OtpFeilds from "../molecules/OtpFeilds";
import OtpTimer from "../molecules/OtpTimer";
import { useRouter } from "next/navigation";

const Otp = () => {
  const c = useTranslations("resetpassword.commonAuth");
  const t = useTranslations("resetpassword.otp");
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("code", code);
    router.push("/reset-pass");
  };

  return (
    <div className="flex w-full flex-col items-center">
      <FormCard>
        <FormHead
          title={t("title")}
          description={t("description")}
          icon={TbLockPassword}
        />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <OtpFeilds length={6} error={error} onComplete={setCode} />
          <Button
            variant="primary"
            className="w-full mt-4"
            type="submit"
            disabled={!code}
          >
            {t("btn")}
          </Button>

          <OtpTimer
            seconds={60}
            labelBefore={t("resendIn")}
            labelResend={t("resend")}
            onResend={() => {
              console.log("Resending OTP...");
            }}
          />
        </form>

        <LoginLink>{c("loginLink")}</LoginLink>
      </FormCard>

      <FooterNote
        question={c("rememberPassword")}
        linkLabel={c("returnToLogin")}
        href="/sign-in"
      />
    </div>
  );
};

export default Otp;
