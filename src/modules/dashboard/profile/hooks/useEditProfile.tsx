"use client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { UpdateData, UserProfile } from "../lib/Profile";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useProfileForm } from "./useProfileForm";
import { useProfileImage } from "./useProfileImage";
import { useCredentials } from "./useCredentials";
import { UpdateRequest } from "./Requests/useUpdateRequest";

export function useEditProfile(data?: UserProfile) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations("profile");

  const { register, handleSubmit, reset, errors } = useProfileForm(data);

  const {
    imageFile,
    imagePreview,
    handleImageChange,
    handleImageDelete,
    removeImage,
  } = useProfileImage(data?.img?.url);

  const {
    award,
    setAward,
    awardFileError,
    certificate,
    setCertificate,
    certificateError,
    validateCredentials,
    submitCredentials,
  } = useCredentials();

  const { mutateAsync, isPending } = useApiMutation<UpdateData, UserProfile>({
    mutationFn: UpdateRequest,
  });

  useEffect(() => {
    router.prefetch("/dashboard/profile");
  }, [router]);

  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateProfile = async (values: UpdateData) => {
    if (!validateCredentials()) return;

    setIsSaving(true);

    try {
      const [updatedProfile] = await Promise.all([
        mutateAsync({ ...values, img: imageFile, removeImage }),
        submitCredentials(),
      ]);

      queryClient.setQueryData(["user-profile"], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ["Awards"] });
      queryClient.invalidateQueries({ queryKey: ["Certificate"] });


      toast.success(t("toast.profileUpdated"));
      router.push("/dashboard/profile");
    } catch (error) {
      toast.error(t("toast.profileUpdateFailed"));
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
