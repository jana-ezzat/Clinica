"use client";

import Title from "@/shared/components/atoms/Title";
import Button from "@/shared/components/atoms/Button";
import { useTranslations } from "next-intl";
import SettingsField from "../molecules/SettingsField";
import UploadFile from "../molecules/UploadFile";
import WorkHoursSection from "../molecules/WorkHoursSection";
import { WorkHoursProvider } from "../../context/WorkHoursContext";
import PaymentSettingsSection from "../molecules/PaymentSettingsSection";
import AppointmentRulesSection from "../molecules/AppointmentRulesSection";
import SettingsFormActions from "../molecules/SettingsFormActions";
import Text from "@/shared/components/atoms/Text";
import ClinicSettingsSkeleton from "../molecules/ClinicSettingsSkeleton";
import { useClinicSettingsForm } from "../../hooks/useClinicSettingsForm";
import Reload from "@/shared/components/molecules/Reload";

const ClinicSettingsContent = () => {
  const t = useTranslations("settings");
  const {
    register,
    errors,
    submitForm,
    isLoading,
    isError,
    isSaving,
    resetForm,
    refetch,
  } = useClinicSettingsForm();

  if (isLoading) {
    return <ClinicSettingsSkeleton />;
  }
  if (isError) {
    return (
      <Reload
        error={t("Reload.error")}
        retry={t("Reload.retry")}
        onRetry={refetch}
      />
    );
  }
  return (
    <div className="flex flex-col gap-6 w-full">
      <Title size="lg">{t("pageTitle")}</Title>

      <form onSubmit={submitForm} className="flex flex-col gap-8">
        <div className="border border-gray-100 shadow-md rounded-xl p-5 flex flex-col gap-4">
          <SettingsField
            label={t("basicInfo.title")}
            name="clinicName"
            placeholder={t("basicInfo.clinicNamePlaceholder")}
            register={register}
            error={errors.clinicName}
          />

          <SettingsField
            label={t("basicInfo.phone")}
            name="phone"
            placeholder={t("basicInfo.phonePlaceholder")}
            register={register}
            error={errors.phone}
          />

          <UploadFile label={t("logo.title")} uploadLabel={t("logo.upload")} />

          <SettingsField
            label={t("address.title")}
            name="address"
            placeholder={t("address.placeholder")}
            register={register}
            error={errors.address}
          />
        </div>

        <WorkHoursSection />

        <PaymentSettingsSection register={register} />
        <AppointmentRulesSection register={register} />
        <SettingsFormActions isSaving={isSaving} onCancel={resetForm} />
      </form>
    </div>
  );
};

const ClinicSettings = () => {
  return (
    <WorkHoursProvider>
      <ClinicSettingsContent />
    </WorkHoursProvider>
  );
};

export default ClinicSettings;
