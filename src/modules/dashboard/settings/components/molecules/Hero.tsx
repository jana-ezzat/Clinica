import Button from "@/shared/components/atoms/Button";
import Title from "@/shared/components/atoms/Title";
import { Pencil } from "@/assets/icons/icons";
import { useTranslations } from "next-intl";
import { useSettingsEdit } from "../../context/SettingEdit";
const Hero = () => {
  const t = useTranslations("settings");
  const { isEditing, setIsEditing } = useSettingsEdit();
  return (
    <div className="flex items-center justify-between">
      <Title size="lg">{t("pageTitle")}</Title>

      {!isEditing && (
        <Button variant="primary" size="lg" onClick={() => setIsEditing(true)}>
          <Pencil size={18} />
        </Button>
      )}
    </div>
  );
};

export default Hero;
