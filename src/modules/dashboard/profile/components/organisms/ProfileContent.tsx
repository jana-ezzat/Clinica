"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Mail, ShieldCheck } from "@/assets/icons/icons";
import ProfileHeader from "../molecules/ProfileHeader";
import ProfileInfoCard from "../molecules/ProfileInfoCard";
import ProfileSkeleton from "../molecules/ProfileSkeleton";
import CredentialCard from "../molecules/CredentialCard";
import Reload from "@/shared/components/molecules/Reload";
import { useProfile } from "../../hooks/Queries/useProfile";
import {
  useGetAward,
  useGetCertificate,
} from "../../hooks/Queries/useGetAward";

export default function ProfileContent() {
  const t = useTranslations("profile");
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useProfile();

  const { data: awardsData, isLoading: isAwardsLoading } = useGetAward();
  const { data: certificatesData, isLoading: isCertificatesLoading } =
    useGetCertificate();

  const handleEdit = (type: "awards" | "certificates", id: string) => {
    router.push(`/dashboard/profile/updateData/${type}/${id}`);
  };

  if (isLoading || isAwardsLoading || isCertificatesLoading) {
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
        onEdit={(item) => handleEdit("awards", item._id)}
      />

      <CredentialCard
        title={t("certificates")}
        items={certificatesData?.certificates ?? []}
        hrefBase="/dashboard/profile/updateData/certificates"
        onEdit={(item) => handleEdit("certificates", item._id)}
      />
    </div>
  );
}
