import Title from "@/shared/components/atoms/Title";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import GroupDetails from "../molecules/GroupDetails";
import { Info, Pill } from "@/assets/icons/icons";
import IconListSection from "../molecules/IconListSection";
import HistorySection from "./HistorySection";
import { formatLongDate } from "@/lib/utils";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
}

const MedicalFile = ({ patient }: Props) => {
  const t = useTranslations("MedicalFile");
  const locale = useLocale();
  const med = patient.medicalInformation;

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <Title size="lg" className="text-2xl sm:text-3xl md:text-4xl">
        {t("title")}
      </Title>

      <GroupDetails
        title={t("chronicDiseases")}
        items={med?.chronicDiseases ?? []}
        emptyLabel={t("empty")}
        bgColor="bg-[#4DB6AC]/20"
      />

      <GroupDetails
        title={t("allergies")}
        items={med?.allergies ?? []}
        emptyLabel={t("empty")}
        bgColor="bg-[#FFCC0026]/60 dark:bg-[#FFCC0026]/80"
      />

      <IconListSection
        title={t("currentMedications")}
        icon={Pill}
        items={med?.medications ?? []}
        emptyLabel={t("empty")}
        iconClassName="text-green-500"
      />

      <IconListSection
        title={t("previousOperations")}
        icon={Info}
        items={(med?.previousSurgeries ?? []).map(
          (s) => `${s.name} - ${formatLongDate(s.date, locale)}`,
        )}
        emptyLabel={t("empty")}
        iconClassName="text-red-400"
      />

      <HistorySection
        title={t("medicalAndFamilyHistory")}
        medicalHistoryLabel={t("medicalHistory")}
        medicalHistory={med?.medicalHistory}
        familyHistoryLabel={t("familyHistory")}
        familyHistory={med?.familyMedicalHistory}
      />
    </div>
  );
};

export default MedicalFile;
