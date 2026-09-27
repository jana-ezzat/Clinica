import Button from "@/shared/components/atoms/Button";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  onCancel: () => void;
  isSaving?: boolean;
}
const SettingsFormActions = ({ onCancel, isSaving }: Props) => {
  const t = useTranslations("settings.actions");
  return (
    <div className="flex   gap-4">
      <Button variant="primary" type="submit" disabled={isSaving}>
        {isSaving ? t("saving") : t("save")}
      </Button>
      <Button
        variant="ghost"
        type="button"
        onClick={onCancel}
        className="text-red-500 text-sm"
      >
        {t("cancel")}
      </Button>
    </div>
  );
};

export default SettingsFormActions;
