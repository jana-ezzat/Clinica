"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
  EditCredentialResponse,
  EditCredentialValues,
  EditingState,
} from "../../lib/EditModal";

import { EditAwardRequest } from "../Requests/useEditAwardRequest";
import { EditCertificateRequest } from "../Requests/useEditCredentialRequest";

type Payload = {
  type: "award" | "certificate";
  id: string;
  data: EditCredentialValues;
};

export function useEditCredential() {
  const queryClient = useQueryClient();
  const t = useTranslations("profile");

  const [editing, setEditing] = useState<EditingState>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removedImage, setRemovedImage] = useState(false);

  const { mutateAsync, isPending, error } = useApiMutation<
    Payload,
    EditCredentialResponse
  >({
    mutationFn: ({ type, id, data }) =>
      type === "award"
        ? EditAwardRequest(data, id)
        : EditCertificateRequest(data, id),
  });

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreview(imageUrl);
    setRemovedImage(false);

    e.target.value = "";
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setRemovedImage(true);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setRemovedImage(false);

    setIsEdit(false);
    setEditing(null);
  };

  const handleSave = async (
    type: "award" | "certificate",
    id: string,
    values: EditCredentialValues,
  ) => {
    try {
      await mutateAsync({
        type,
        id,
        data: values,
      });

      const queryType = type === "certificate" ? "certificates" : "awards";

      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["credential", queryType, id],
        }),

        queryClient.refetchQueries({
          queryKey: [type === "award" ? "Awards" : "Certificate"],
        }),
      ]);

      toast.success(
        type === "award"
          ? t("toast.awardUpdated")
          : t("toast.certificateUpdated"),
      );

      setIsEdit(false);
      setSelectedFile(null);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview(null);
      setRemovedImage(false);
      setEditing(null);
    } catch (error) {
      toast.error(
        type === "award"
          ? t("toast.awardSaveFailed")
          : t("toast.certificateSaveFailed"),
      );

      throw error;
    }
  };
  return {
    editing,
    setEditing,
    isEdit,
    handleEdit,
    preview,
    selectedFile,
    removedImage,
    handlePickImage,
    handleRemoveImage,
    handleCancel,
    handleSave,
    isSaving: isPending,
    error,
  };
}
