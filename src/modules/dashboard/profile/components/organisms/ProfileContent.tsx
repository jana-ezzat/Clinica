"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Mail, ShieldCheck } from "lucide-react";

import ProfileHeader from "../molecules/ProfileHeader";
import ProfileInfoCard from "../molecules/ProfileInfoCard";
import ProfileSkeleton from "../molecules/ProfileSkeleton";
import CredentialCard from "../molecules/CredentialCard";

import { EditCredentialProvider } from "../../context/EditCredintalContext";

import Reload from "@/shared/components/molecules/Reload";
import { useProfile } from "../../hooks/Queries/useProfile";
import { useDeleteCredential } from "../../hooks/useDeleteCredential";
import {
  useGetAward,
  useGetCertificate,
} from "../../hooks/Queries/useGetAward";

function GetProfileData() {
  const t = useTranslations("profile");
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useProfile();

  const {
    handleDeleteAward,
    handleDeleteCertificate,
    deletingAwardId,
    deletingCertificateId,
  } = useDeleteCredential();

  const { data: awardsData } = useGetAward();
  const { data: certificatesData } = useGetCertificate();

  const handleEdit = (type: "awards" | "certificates", id: string) => {
    router.push(`/dashboard/profile/updateData/${type}/${id}`);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !data) {
    return (
      <Reload
        error={t("Reload.error")}
        retry={t("Reload.retry")}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="w-full rounded-2xl p-7">
      <ProfileHeader name={data.name} role={data.role} img={data.img} />

      <ProfileInfoCard
        title={t("personalData")}
        items={[
          {
            label: t("email"),
            value: data.email,
            icon: Mail,
          },
          {
            label: t("role"),
            value: data.role,
            icon: ShieldCheck,
          },
        ]}
      />

      <CredentialCard
        title={t("awards")}
        items={awardsData?.awards ?? []}
        hrefBase="/dashboard/profile/updateData/awards"
        deletingId={deletingAwardId}
        onEdit={(item) => handleEdit("awards", item._id)}
      />

      <CredentialCard
        title={t("certificates")}
        items={certificatesData?.certificates ?? []}
        hrefBase="/dashboard/profile/updateData/certificates"
        deletingId={deletingCertificateId}
        onEdit={(item) => handleEdit("certificates", item._id)}
      />
    </div>
  );
}

export default function ProfileContent() {
  return (
    <EditCredentialProvider>
      <GetProfileData />
    </EditCredentialProvider>
  );
}
