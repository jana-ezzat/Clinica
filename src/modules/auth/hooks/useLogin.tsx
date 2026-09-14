// src/modules/auth/hooks/useLogin.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosConfig from "@/services/axiosConfig";
import tokenService from "@/services/tokenService";

interface LoginForm {
  email: string;
  password: string;
}

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

  const {
    register,
    handleSubmit: submit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const handleSubmit = submit(async (values) => {
    try {
      setApiError(null);

      const response = await axiosConfig.post<LoginResponse>(
        "/auth/login",
        values,
      );

      tokenService.set(response.data.jwt);

      router.push("/dashboard");
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "loginFailed",
      );
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    apiError,
  };
};

export default useLogin;