"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/lib/Sechma/ResetPasswordSechma";
const useRestPassword = () => {
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
    let timer = setTimeout(() => router.push("/sign-in"), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  const onSubmit = (data: ResetPasswordFormValues) => {
    setSuccess(true);
  };
 return {
    register,
    handleSubmit,
    errors,
    success,
    onSubmit,
    router,
  };
};

export default useRestPassword;
