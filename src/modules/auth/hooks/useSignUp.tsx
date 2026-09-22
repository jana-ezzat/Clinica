import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpSchema, SignUpValues } from "../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { env } from "@/lib/config/env";
import tokenService from "@/services/tokenService";

const useSignUp = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit = async (data: SignUpValues): Promise<void> => {
    setApiError(null);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (data.role === "doctor" && data.specialty) {
      formData.append("specialty", data.specialty);
    }

    try {
      const signUpResponse = await fetch(`${env.API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${env.TEMP_ADMIN_TOKEN}`,
          },
          body: formData,
        },
      );

      const signUpResult = await signUpResponse.json().catch(() => null);

      if (!signUpResponse.ok) {
        setApiError(
          signUpResponse.status === 409 ? "emailTaken" : "somethingWentWrong",
        );
        return;
      }
      
      const loginResponse = await fetch(`${env.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const loginResult = await loginResponse.json().catch(() => null);

      if (!loginResponse.ok) {
        router.push("sign-in");
        return;
      }

      const token = loginResult?.data?.token ?? loginResult?.token;
      if (token) {
        tokenService.set(token);
      }
      router.push("/dashboard");
    } catch (error) {
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

export default useSignUp;
