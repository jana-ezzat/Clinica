"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UpdateData, UserProfile } from "../lib/Profile";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useProfileForm } from "./useProfileForm";
import { useProfileImage } from "./useProfileImage";
import { useCredentials } from "./useCredentials";
import { UpdateRequest } from "./Requests/useUpdateRequest";
import { useState } from "react";

export function useEditProfile(data?: UserProfile) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { register, handleSubmit, reset, errors } = useProfileForm(data);

  const {
    imageFile,
    imagePreview,
    handleImageChange,
    handleImageDelete,
    removeImage,
  } = useProfileImage(data?.img?.url);
  const [isSaving, setIsSaving] = useState(false);
  const {
    award,
    setAward,
    certificate,
    setCertificate,
    awardFileError,
    certificateError,
    validateCredentials,
    submitCredentials,
  } = useCredentials();

  const { mutateAsync, isPending } = useApiMutation<UpdateData, UserProfile>({
    mutationFn: UpdateRequest,
  });

  const handleUpdateProfile = async (values: UpdateData) => {
    const isValid = validateCredentials();
    setIsSaving(true);
    try {
      if (!isValid) return;

      // Update profile
      await mutateAsync({
        ...values,
        img: imageFile,
        removeImage,
      });

      await submitCredentials();
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["user-profile"], type: "all" }),
        queryClient.refetchQueries({ queryKey: ["Awards"], type: "all" }),
        queryClient.refetchQueries({ queryKey: ["Certificate"], type: "all" }),
      ]);
      router.push("/dashboard/profile");
    } catch (error) {
      setIsSaving(false);
      throw error;
    }
  };

  const onSubmit = handleSubmit(handleUpdateProfile);

  return {
    register,
    errors,
    onSubmit,
    reset,
    imagePreview,
    handleImageChange,
    handleImageDelete,
    isUpdating: isSaving || isPending,
    award,
    setAward,
    awardFileError,
    certificate,
    setCertificate,
    certificateError,
  };
}
