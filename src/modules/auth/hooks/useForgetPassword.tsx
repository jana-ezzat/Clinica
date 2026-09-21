"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  forgetPasswordSchema,
  ForgetPasswordValues,
} from "../schema/ForgetPasswordSechma";
import { useModal } from "./useModal";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { forgetPasswordRequest } from "./useForgetPasswordRequest";

export const useForgetPassword = () => {
  const [submitemail, setSubmitemail] = useState("");
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const { mutateAsync, isPending: isSubmitting } = useApiMutation<
    string,
    ForgetPasswordValues
  >({
    mutationFn: forgetPasswordRequest,
  });

  useModal(success, "/otp", 3000);

  //Submit
  const Submit = async (data: ForgetPasswordValues) => {
    try {
      await mutateAsync(data.email);
      setSubmitemail(data.email);
      setSuccess(true);
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "حدث خطأ ما، حاول مرة أخرى",
      );
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(Submit),
    errors,
    isSubmitting,
    success,
    router,
    submitemail,
    apiError,
  };
};

export default useForgetPassword;
