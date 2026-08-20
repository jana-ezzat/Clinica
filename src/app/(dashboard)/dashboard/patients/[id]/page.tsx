"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePatient } from "@/modules/dashboard/patients/hooks/usePatient";

import { PatientTab } from "@/modules/dashboard/patients/components/molecules/PatientTabs";
import StatusCard from "@/modules/dashboard/patients/components/atoms/StatusCard";
import PatientHeader from "@/modules/dashboard/patients/components/organisms/PatientHeader";
import MedicalFileSection from "@/modules/dashboard/patients/components/organisms/MedicalFileSection";

export default function PatientDetailsPage() {
  const params = useParams<{ id: string }>();
  const t = useTranslations("patients.details");
  const { data: patient, isLoading, isError, refetch } = usePatient(params.id);
  const [activeTab, setActiveTab] = useState<PatientTab>("overview");

  if (isLoading) {
    return <StatusCard description={t("loading")} />;
  }

  if (isError || !patient) {
    return (
      <StatusCard
        description={t("loadError")}
        tone="error"
        actionLabel={t("retry")}
        onAction={() => refetch()}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PatientHeader
        patient={patient}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

    <MedicalFileSection />
      {/* Sections (البيانات الأساسية, الملف الطبي, جهة اتصال الطوارئ, بيانات التأمين)
          and "أخر المواعيد" go here next, once we build our way down. */}
    </div>
  );
}
