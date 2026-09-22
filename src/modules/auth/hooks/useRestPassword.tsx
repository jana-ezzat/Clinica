"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "../schema/ResetPasswordSechma";
import { useModal } from "./useModal";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { ResetPasswordRequest, ResetPayload } from "./useResetRequest";
import Cookies from "js-cookie";

export const useResetPassword = () => {
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("reset_token");
    if (!token) {
      router.replace("/forget-pass");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutateAsync, isPending } = useApiMutation<ResetPayload, any>({
    mutationFn: ResetPasswordRequest,
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setApiError(null);
      await mutateAsync({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      Cookies.remove("reset_token");
      setSuccess(true);
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "حدث خطأ ما، حاول مرة أخرى",
      );
    }
  };

  useModal(success, "/sign-in", 3000);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    success,
    router,
    apiError,
    isPending,
  };
};

export default useResetPassword;
