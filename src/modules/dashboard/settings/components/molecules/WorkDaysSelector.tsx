"use client";
import { useTranslations } from "next-intl";
import { DAYS } from "../../lib/SettingData";

interface Props {
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
}

export default function WorkDaysSelector({
  selectedDays,
  setSelectedDays,
}: Props) {
  const t = useTranslations("settings.workHours.days");

  const toggleDay = (day: string) => {
    setSelectedDays(
      selectedDays.includes(day)
        ? selectedDays.filter((d) => d !== day)
        : [...selectedDays, day],
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {DAYS.map((day) => (
        <button
          key={day}
          type="button"
          onClick={() => toggleDay(day)}
          className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
            selectedDays.includes(day)
              ? "bg-slate-600 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {t(day)}
        </button>
      ))}
    </div>
  );
}
