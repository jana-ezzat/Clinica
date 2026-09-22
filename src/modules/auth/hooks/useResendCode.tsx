"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { forgetPasswordRequest } from "./useForgetPasswordRequest";
import { ForgetPasswordValues } from "../schema/ForgetPasswordSechma";

export const useResendCode = (email: string) => {
  const [resendError, setResendError] = useState<string | null>(null);
  const router = useRouter();

  const { mutateAsync: resendOtp, isPending: isResending } = useApiMutation<
    string,
    ForgetPasswordValues
  >({
    mutationFn: forgetPasswordRequest,
  });

  const handleResend = async () => {
    try {
      setResendError(null);

      const currentEmail = email || Cookies.get("reset_email");

      if (!currentEmail) {
        router.replace("/forget-pass");
        return;
      }

      await resendOtp(currentEmail);

      Cookies.set("reset_email", currentEmail, {
        expires: 30 / (24 * 60),
        sameSite: "strict",
      });
    } catch (error: any) {
      setResendError(
        error?.response?.data?.message || "تعذر إعادة إرسال الرمز",
      );
    }
  };

  return { handleResend, isResending, resendError };
};
