import React from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/atoms/Button";
interface Props {
  patientType: "new" | "existing";
  onChange: (type: "new" | "existing") => void;
}
const PatientButton = ({ patientType, onChange }: Props) => {
  const t = useTranslations("appointmentsModal.addAppointment.patient");

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className={` bg-transparent! ${
          patientType === "new"
            ? "border-2! border-blue-500!"
            : "border! border-gray-200!"
        }`}
        onClick={() => onChange("new")}
      >
        {t("newPatient")}
      </Button>

      <Button
        type="button"
        size="sm"
        variant="outline"
        className={` bg-transparent! ${
          patientType === "existing"
            ? "border-2! border-blue-500!"
            : "border! border-gray-200!"
        }`}
        onClick={() => onChange("existing")}
      >
        {t("existingPatient")}
      </Button>
    </div>
  );
};

export default PatientButton;
