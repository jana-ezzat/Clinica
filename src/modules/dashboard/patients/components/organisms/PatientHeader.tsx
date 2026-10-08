"use client";
import { useTranslations } from "next-intl";
import PatientInfoCards from "../molecules/PatientInfoCards";
import PatientTabs, { PatientTab } from "../molecules/PatientTabs";
import type { PatientDetails } from "../../hooks/usePatient";
import BackButton from "@/shared/components/atoms/BackButton";
import Header from "@/shared/components/molecules/Header";
import Button from "@/shared/components/atoms/Button";
import { useState } from "react";
import EditPatientModal from "./EditPatientModal";
import { useLocale} from "next-intl";
import { formatLongDate } from "@/lib/utils";
import useVisits from "../../hooks/useVisits";

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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const tOverview = useTranslations("patients.details.overview");
const locale = useLocale();
const { data: visits } = useVisits(patient.id);

const latestVisit = visits?.[0]; // useVisits sorts newest first
const lastVisit = latestVisit ? formatLongDate(latestVisit.visitDate, locale) : undefined;
const ageText =
  patient.age !== undefined ? tOverview("ageYears", { count: patient.age }) : undefined;
const genderText = patient.gender ? tOverview(`gender.${patient.gender}`) : undefined;  


  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-start justify-between">
        <Header title={patient.name} subtitle={t("notAvailable")} />
        <BackButton />
      </div>

      <Button variant="primary" size="sm" onClick={() => setIsEditOpen(true)}>
        {t("editButton")}
      </Button>

      {isEditOpen && (
        <EditPatientModal
          patient={patient}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      <PatientInfoCards
        patient={patient}
        labels={{
          lastVisit: t("lastVisit"),
          phone: t("phone"),
          age: t("age"),
          gender: t("gender"),
        }}
        lastVisit={lastVisit}
        ageText={ageText}
        genderText={genderText}
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
