"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, LoginFormValues } from "../schema/LoginSechma";
import { env } from "@/config/env";
import { tokenService } from "@/services/tokenService";

export const useLogin = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null);

    // The Postman collection sends login as multipart form-data, not JSON.
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const res = await fetch(`${env.API_BASE_URL}/login`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        setApiError(
          res.status === 401 || res.status === 422
            ? "invalidCredentials"
            : "somethingWentWrong",
        );
        return;
      }

      const token = result?.token ?? result?.access_token;
      if (token) {
        tokenService.set(token);
      }

      router.push("/dashboard");
    } catch {
      setApiError("networkError");
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
