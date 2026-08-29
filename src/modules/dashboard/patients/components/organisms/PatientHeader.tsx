"use client";
import { useTranslations } from "next-intl";
import PatientInfoCards from "../molecules/PatientInfoCards";
import PatientTabs, { PatientTab } from "../molecules/PatientTabs";
import type { PatientDetails } from "../../hooks/usePatient";
import BackButton from "@/shared/components/atoms/BackButton";
import Header from "@/shared/components/molecules/Header";


interface PatientHeaderProps {
  patient: PatientDetails;
  activeTab: PatientTab;
  onTabChange: (tab: PatientTab) => void;
}

export default function PatientHeader({
  patient,
  activeTab,
  onTabChange,
}: PatientHeaderProps) {
  const t = useTranslations("patients.details");

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-start justify-between">
        <Header
          title={patient.name}
          subtitle={`${t("fileNumberLabel")}: ${patient.fileNumber ?? t("notAvailable")}`}
        />
        <BackButton />
      </div>

      <PatientInfoCards
        patient={patient}
        labels={{
          lastVisit: t("lastVisit"),
          phone: t("phone"),
          age: t("age"),
          gender: t("gender"),
        }}
        notAvailableLabel={t("notAvailable")}
      />

      <PatientTabs
        active={activeTab}
        onChange={onTabChange}
        labels={{
          overview: t("tabs.overview"),
          visits: t("tabs.visits"),
          medicalFile: t("tabs.medicalFile"),
          invoices: t("tabs.invoices"),
          attachments: t("tabs.attachments"),
        }}
      />
    </div>
  );
}
