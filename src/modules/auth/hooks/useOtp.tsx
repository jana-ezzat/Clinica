"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { OtpSchema, OtpValue } from "../schema/OtpSechma";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { OtpRequest, OtpResponse } from "./useOtpRequest";
import { useResendCode } from "./useResendCode";

export const useOtp = () => {
  const [apiError, setApiError] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    const currentEmail = Cookies.get("reset_email");
    if (!currentEmail) {
      router.replace("/forget-pass");
    }
  }, [router]);

  // React Hook Form
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpValue>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { otpNumber: "" },
  });

  // Submit OTP
  const { mutateAsync, isPending } = useApiMutation<
    { email: string; otp: string },
    OtpResponse
  >({
    mutationFn: OtpRequest,
  });

  const Submit = async (data: OtpValue) => {
    try {
      setApiError(null);

      const currentEmail = Cookies.get("reset_email");

      if (!currentEmail) {
        router.replace("/forget-pass");
        return;
      }

      const response = await mutateAsync({
        email: currentEmail,
        otp: data.otpNumber,
      });

      if (response?.changePasswordToken) {
        Cookies.set("reset_token", response.changePasswordToken, {
          expires: 10 / (24 * 60),
          secure: true,
          sameSite: "strict",
        });

        Cookies.remove("reset_email");
        router.push("/reset-pass");
      }
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "رمز التحقق غير صحيح، حاول مرة أخرى",
      );
    }
  };

  const currentEmail =
    typeof window !== "undefined" ? Cookies.get("reset_email") || "" : "";
  const { handleResend, isResending, resendError } =
    useResendCode(currentEmail);

  return {
    setValue,
    handleSubmit: handleSubmit(Submit),
    errors,
    isPending,
    apiError: apiError || resendError,
    isResending,
    handleResend,
  };
};

export default useOtp;
