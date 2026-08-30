"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "../schema/ResetPasswordSechma";

export const useResetPassword = () => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => router.push("/sign-in"), 3000);
    return () => clearTimeout(timer);
  }, [success, router]);

  const onSubmit = (_data: ResetPasswordFormValues) => {
    setSuccess(true);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    success,
    router,
  };
};

export default useResetPassword;
