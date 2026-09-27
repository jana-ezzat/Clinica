import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ClinicSettingsForm } from "../../lib/SettingData";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import Title from "@/shared/components/atoms/Title";
import SettingsField from "./SettingsField";

interface props {
  register: UseFormRegister<ClinicSettingsForm>;
}
const AppointmentRulesSection = ({ register }: props) => {
  const t = useTranslations("settings.rules");
  return (
    <div className="flex flex-col gap-6">
      <Title size="lg" variant="primary">
        {t("title")}
      </Title>
      <div className="border shadow-md border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        <SettingsField
          label={t("defaultDuration")}
          name="appointmentDuration"
          register={register}
        />
        <SettingsField
          label={t("maxPerDay")}
          name="maxAdvanceBookingDays"
          type="number"
          register={register}
        />
        <SettingsField
          label={t("cancelWindow")}
          name="minAdvanceBookingHours"
          type="number"
          register={register}
        />
      </div>
    </div>
  );
};

export default AppointmentRulesSection;
