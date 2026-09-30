"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";

import CredentialField from "../../../components/molecules/CredentialField";
import EditProfileSkelton from "../molecules/EditProfileSkelton";
import { useProfile } from "../../../hooks/Queries/useProfile";
import { useEditProfile } from "../../../hooks/useEditProfile";
import ProfileImage from "../molecules/ProfileImage";
import ProfileField from "../molecules/ProfileField";

export default function EditProfile() {
  const router = useRouter();
  const t = useTranslations("profile");

  const { data, isLoading, isError } = useProfile();

  const {
    register,
    errors,
    onSubmit,
    handleImageChange,
    imagePreview,
    isUpdating,
    award,
    setAward,
    certificate,
    setCertificate,
    handleImageDelete,
  } = useEditProfile(data);

  if (isLoading) {
    return <EditProfileSkelton />;
  }

  if (isError || !data) {
    return <div className="p-6">Something went wrong.</div>;
  }

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      {/* Page Title */}
      <Text size="xl" className="font-bold" variant="primary">
        {t("editProfile")}
      </Text>

      <form onSubmit={onSubmit} className="flex w-full flex-col gap-6">
        {/* Profile Information */}
        <div className="ds-bg-card ds-shadow-sm rounded-xl p-6">
          <div className="mb-6 border-b pb-4 dark:border-gray-50">
            <Text size="lg" className="font-semibold" variant="primary">
              {t("personalData")}
            </Text>
          </div>

          <div className="flex flex-col gap-6">
            {/* Profile Image */}
            <div className="flex justify-center">
              <ProfileImage
                imagePreview={imagePreview}
                name={data.name}
                onImageChange={handleImageChange}
                onImageDelete={handleImageDelete}
              />
            </div>

            {/* Name */}
            <ProfileField
              label={t("name")}
              name="name"
              register={register}
              error={errors.name}
            />

            {/* Email */}
            <ProfileField
              label={t("email")}
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />
          </div>
        </div>

        {/* Certificates & Awards */}
        <div className="ds-bg-card ds-shadow-sm rounded-xl p-6">
          <div className="mb-6 border-b pb-4 dark:border-gray-50">
            <Text size="lg" className="font-semibold" variant="primary">
              {t("certificatesAwards")}
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Certificates */}
            <CredentialField
              label={t("certificates")}
              descLabel={t("descLabelaward")}
              item={certificate}
              setChange={setCertificate}
            />

            {/* Awards */}
            <CredentialField
              label={t("awards")}
              descLabel={t("descLabelCertification")}
              item={award}
              setChange={setAward}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            {t("cancel")}
          </Button>

          <Button type="submit" variant="primary" disabled={isUpdating}>
            {isUpdating ? t("saving") : t("saveChanges")}
          </Button>
        </div>
      </form>
    </div>
  );
}
