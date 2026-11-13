"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  LoginFormValues,
  loginSchema,
} from "@/modules/auth/schema/LoginSchema";
import axiosConfig from "@/services/axiosConfig";
import tokenService from "@/services/tokenService";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface LoginResponse {
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  jwt: string;
}

const useLogin = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const t = useTranslations("signin");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    setApiError(null);

    try {
      const response = await axiosConfig.post<LoginResponse>("/auth/login", {
        email: data.email,
        password: data.password,
      });

      tokenService.set(response.data.jwt);
      toast.success(t("success"));
      router.push("/dashboard");
    } catch (error: any) {
      setApiError(
        error?.response?.data?.error || t("error.somethingWentWrong"),
      );
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    apiError,
  };
};

export default useLogin;
