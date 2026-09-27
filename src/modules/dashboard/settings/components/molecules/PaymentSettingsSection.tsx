import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ClinicSettingsForm, paymentMethods } from "../../lib/SettingData";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import Title from "@/shared/components/atoms/Title";
import SettingsField from "./SettingsField";
import { useSettingsEdit } from "../../context/SettingEdit";

interface props {
  register: UseFormRegister<ClinicSettingsForm>;
}
const PaymentSettingsSection = ({ register }: props) => {
  const t = useTranslations("settings.payment");
  const { isEditing } = useSettingsEdit();
  return (
    <div className="flex flex-col gap-6">
      <Title size="lg" variant="primary" className="font-bold">
        {t("title")}
      </Title>

      <div className="border shadow-md border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        <Text size="sm" variant="secondary" className="font-semibold">
          {t("methodsLabel")}
        </Text>

        <div className="flex flex-col gap-3">
          {paymentMethods.map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={method}
                disabled={!isEditing}
                {...register("paymentMethods")}
              />
              {t(method)}
            </label>
          ))}
        </div>

        <div className="max-w-xs">
          <SettingsField
            label={t("taxLabel")}
            name="taxRate"
            type="number"
            register={register}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSettingsSection;
