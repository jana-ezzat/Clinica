"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSchema, OtpValue } from "../schema/OtpSechma";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { OtpRequest } from "./useOtpRequest";
import { ForgetPasswordValues } from "../schema/ForgetPasswordSechma";
import { forgetPasswordRequest } from "./useForgetPasswordRequest";

export const useOtp = () => {
  const [apiError, setApiError] = useState<string | null>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpValue>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otpNumber: "",
    },
  });

  //   Submit
  const { mutateAsync, isPending } = useApiMutation<
    { email: string; otp: string },
    OtpValue
  >({
    mutationFn: OtpRequest,
  });
  const Submit = async (data: OtpValue) => {
    try {
      setApiError(null);
      await mutateAsync({ email, otp: data.otpNumber });
      router.push("/reset-pass");
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "حدث خطأ ما، حاول مرة أخرى",
      );
    }
  };

  const { mutateAsync: resendOtp, isPending: isResending } = useApiMutation<
    string,
    ForgetPasswordValues
  >({
    mutationFn: forgetPasswordRequest,
  });

  const handleResend = async () => {
    try {
      setApiError(null);
      await resendOtp(email);
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "تعذر إعادة إرسال الرمز");
    }
  };

  return {
    setValue,
    handleSubmit: handleSubmit(Submit),
    errors,
    isPending,
    apiError,
    isResending,
    handleResend,
  };
};

export default useOtp;
