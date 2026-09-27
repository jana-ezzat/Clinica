"use client";
import { useTranslations } from "next-intl";
import SettingsField from "../molecules/SettingsField";
import UploadFile from "../molecules/UploadFile";
import WorkHoursSection from "../molecules/WorkHoursSection";
import { WorkHoursProvider } from "../../context/WorkHoursContext";
import PaymentSettingsSection from "../molecules/PaymentSettingsSection";
import AppointmentRulesSection from "../molecules/AppointmentRulesSection";
import SettingsFormActions from "../molecules/SettingsFormActions";
import ClinicSettingsSkeleton from "../molecules/ClinicSettingsSkeleton";
import { useClinicSettingsForm } from "../../hooks/useClinicSettingsForm";
import Reload from "@/shared/components/molecules/Reload";

import {
  SettingsEditProvider,
  useSettingsEdit,
} from "../../context/SettingEdit";
import Hero from "../molecules/Hero";

const ClinicSettingsContent = () => {
  const t = useTranslations("settings");
  const { isEditing, setIsEditing } = useSettingsEdit();
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
      <Hero />
      <form onSubmit={submitForm} className="flex flex-col gap-8">
        <div className="border border-gray-100 shadow-md rounded-xl p-5 flex flex-col gap-4">
          <SettingsField
            label={t("basicInfo.title")}
            name="clinicName"
            placeholder={t("basicInfo.clinicNamePlaceholder")}
            register={register}
            error={errors.clinicName}
            disabled={!isEditing}
          />

          <SettingsField
            label={t("basicInfo.phone")}
            name="phone"
            placeholder={t("basicInfo.phonePlaceholder")}
            register={register}
            error={errors.phone}
            disabled={!isEditing}
            onlyNumbers
          />

          <UploadFile
            label={t("logo.title")}
            uploadLabel={t("logo.upload")}
            disabled={!isEditing}
          />

          <SettingsField
            label={t("address.title")}
            name="address"
            placeholder={t("address.placeholder")}
            register={register}
            error={errors.address}
            disabled={!isEditing}
          />
        </div>

        <WorkHoursSection />

        <PaymentSettingsSection register={register} />
        <AppointmentRulesSection register={register} />

        <SettingsFormActions
          isSaving={isSaving}
          onCancel={() => {
            resetForm();
            setIsEditing(false);
          }}
        />
      </form>
    </div>
  );
};

const ClinicSettings = () => {
  return (
    <SettingsEditProvider>
      <WorkHoursProvider>
        <ClinicSettingsContent />
      </WorkHoursProvider>
    </SettingsEditProvider>
  );
};

export default ClinicSettings;
