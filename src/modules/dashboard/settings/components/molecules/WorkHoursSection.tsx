import Text from "@/shared/components/atoms/Text";
import { useTranslations } from "next-intl";
import WorkDaysSelector from "./WorkDaysSelector";
import TimeRangeField from "./TimeRangeField";
import { useWorkHours } from "../../context/WorkHoursContext";
import { useSettingsEdit } from "../../context/SettingEdit";

const WorkHoursSection = () => {
  const t = useTranslations("settings.workHours");

  const { selectedDays, setSelectedDays, slots, updateSlot } = useWorkHours();
  const { isEditing } = useSettingsEdit();

  return (
    <div className="border border-gray-100 shadow-md rounded-xl p-5 flex flex-col gap-4">
      <Text size="sm" variant="primary" className="font-semibold">
        {t("title")}
      </Text>

      <div className="flex flex-col gap-2">
        <Text size="xs" variant="secondary">
          {t("daysLabel")}
        </Text>

        <WorkDaysSelector
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          disabled={!isEditing}
        />

        {slots.map((slot, index) => (
          <TimeRangeField
            key={index}
            fromLabel={t("from")}
            toLabel={t("to")}
            fromValue={slot.from}
            toValue={slot.to}
            onFromChange={(value) => updateSlot(index, "from", value)}
            onToChange={(value) => updateSlot(index, "to", value)}
            disabled={!isEditing}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkHoursSection;
