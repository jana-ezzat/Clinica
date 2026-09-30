import { useState } from "react";
import { Credential } from "../lib/Profile";
import { useDeleteAward } from "./Queries/useDeleteAward";
import { useDeleteCertificate } from "./Queries/useDeleteCertificate";

export function useDeleteCredential() {
  const [deletingAwardId, setDeletingAwardId] = useState<string | null>(null);
  const [deletingCertificateId, setDeletingCertificateId] = useState<
    string | null
  >(null);

  const { mutateAsync: deleteAward } = useDeleteAward();
  const { mutateAsync: deleteCertificate } = useDeleteCertificate();

  const handleDeleteAward = async (item: Credential) => {
    setDeletingAwardId(item._id);

    try {
      await deleteAward(item._id);
    } finally {
      setDeletingAwardId(null);
    }
  };

  const handleDeleteCertificate = async (item: Credential) => {
    setDeletingCertificateId(item._id);

    try {
      await deleteCertificate(item._id);
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
