import Title from "@/shared/components/atoms/Title";
import { useTranslations } from "next-intl";
import React from "react";
import GroupDetails from "../molecules/GroupDetails";
import { medicalFileData } from "@/modules/dashboard/lib/medicalfile";
import IconList from "@/shared/components/molecules/IconList";
import { Info, Pill } from "@/assets/icons/icons";
import IconListSection from "../molecules/IconListSection";
import InfoBox from "@/modules/dashboard/visting/components/molecules/InfoBox";

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

      <div className="flex flex-col gap-4">
        <Title size="md" className="text-xl sm:text-3xl md:text-4xl">
          {t("medicalAndFamilyHistory")}
        </Title>
        <div className="flex flex-col gap-3">
          <InfoBox label={t("medicalHistory")} tone="gray">
            {medicalFileData.medicalHistory}
          </InfoBox>
          <InfoBox label={t("familyHistory")} tone="gray">
            {medicalFileData.familyHistory}
          </InfoBox>
        </div>
      </div>
    </div>
  );
};

export default MedicalFile;
