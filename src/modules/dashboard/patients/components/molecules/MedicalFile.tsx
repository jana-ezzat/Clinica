import Title from "@/shared/components/atoms/Title";
import { useTranslations } from "next-intl";
import React from "react";
import GroupDetails from "../molecules/GroupDetails";
import { medicalFileData } from "@/modules/dashboard/lib/medicalfile";
import { Info, Pill } from "@/assets/icons/icons";
import IconListSection from "../molecules/IconListSection";
import HistorySection from "./HistorySection";

const MedicalFile = () => {
  const t = useTranslations("MedicalFile");
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <Title size="lg" className="text-2xl sm:text-3xl md:text-4xl">
        {t("title")}
      </Title>

      <GroupDetails
        title={t("chronicDiseases")}
        items={medicalFileData.chronicDiseases}
        bgColor="bg-[#4DB6AC]/20"
      />

      <GroupDetails
        title={t("allergies")}
        items={medicalFileData.allergies}
        bgColor="bg-[#FFCC0026]/60 dark:bg-[#FFCC0026]/80"
      />

      <IconListSection
        title={t("currentMedications")}
        icon={Pill}
        items={medicalFileData.medications}
        iconClassName="text-green-500"
      />

      <IconListSection
        title={t("previousOperations")}
        icon={Info}
        items={medicalFileData.operations.map(
          (op) => `${op.name} - ${op.year}`,
        )}
        iconClassName="text-red-400"
      />

      <HistorySection
        title={t("medicalAndFamilyHistory")}
        medicalHistoryLabel={t("medicalHistory")}
        medicalHistory={medicalFileData.medicalHistory}
        familyHistoryLabel={t("familyHistory")}
        familyHistory={medicalFileData.familyHistory}
      />
    </div>
  );
};

export default MedicalFile;
