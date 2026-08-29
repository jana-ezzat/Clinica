import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  forgetPasswordSchema,
  ForgetPasswordValues,
} from "../schema/ForgetPasswordSechma";
import { useModal } from "./useModal";

export const useForgetPassword = () => {
  const [success, setSuccess] = useState(false);
  const [submitemail, setSubmitemail] = useState("");
  const router = useRouter();

  useModal(success, "/otp", 3000);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const Submit = async (data: ForgetPasswordValues) => {
    setSubmitemail(data.email);
    setSuccess(true);
  };

  return {
    register,
    handleSubmit: handleSubmit(Submit),
    errors,
    isSubmitting,
    success,
    router,
    submitemail,
  };
};

export default useForgetPassword;
