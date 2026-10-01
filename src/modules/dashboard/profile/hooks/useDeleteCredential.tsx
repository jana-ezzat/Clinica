import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Credential } from "../lib/Profile";
import { useDeleteAward } from "./Queries/useDeleteAward";
import { useDeleteCertificate } from "./Queries/useDeleteCertificate";

export function useDeleteCredential() {
  const [deletingAwardId, setDeletingAwardId] = useState<string | null>(null);

  const [deletingCertificateId, setDeletingCertificateId] = useState<
    string | null
  >(null);
  const t = useTranslations("profile");

  const { mutateAsync: deleteAward } = useDeleteAward();
  const { mutateAsync: deleteCertificate } = useDeleteCertificate();

  const handleDeleteAward = async (item: Credential) => {
    setDeletingAwardId(item._id);

    try {
      await deleteAward(item._id);
      toast.success(t("toast.awardDeleted"));
    } catch (error) {
      toast.error(t("toast.awardDeleteFailed"));
      throw error;
    } finally {
      setDeletingAwardId(null);
    }
  };

  const handleDeleteCertificate = async (item: Credential) => {
    setDeletingCertificateId(item._id);
    try {
      await deleteCertificate(item._id);
      toast.success(t("toast.certificateDeleted"));
    } catch (error) {
      toast.error(t("toast.certificateDeleteFailed"));

      throw error;
    } finally {
      setDeletingCertificateId(null);
    }
  };

  return {
    handleDeleteAward,
    handleDeleteCertificate,
    deletingAwardId,
    deletingCertificateId,
  };
}
