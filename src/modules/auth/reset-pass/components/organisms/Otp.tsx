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
import useOtp from "@/modules/auth/hooks/useOtp";

const Otp = () => {
  const c = useTranslations("resetpassword.commonAuth");
  const t = useTranslations("resetpassword.otp");
  const Loading = useTranslations("forgetpassword");
  const [code, setCode] = useState("");

  const {
    apiError,
    setValue,
    handleSubmit,
    errors,
    isResending,
    isPending,
    handleResend,
  } = useOtp();

  const handleOtpChange = (val: string) => {
    setCode(val);
    setValue("otpNumber", val);
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
          <OtpFeilds
            length={6}
            error={
              errors.otpNumber?.message
                ? t(`error.${errors.otpNumber.message}`)
                : undefined
            }
            onChange={handleOtpChange}
          />

          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          <Button
            variant="primary"
            className="w-full mt-4"
            type="submit"
            disabled={code.length < 6 || isPending}
          >
            {isPending ? Loading("btnLoading") : t("btn")}
          </Button>

          <OtpTimer
            seconds={60}
            labelBefore={t("resendIn")}
            labelResend={isResending ? "..." : t("resend")}
            onResend={handleResend}
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
