"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePatient } from "@/modules/dashboard/patients/hooks/usePatient";

import { PatientTab } from "@/modules/dashboard/patients/components/molecules/PatientTabs";
import StatusCard from "@/modules/dashboard/patients/components/atoms/StatusCard";
import PatientHeader from "@/modules/dashboard/patients/components/organisms/PatientHeader";
import MedicalFileSection from "@/modules/dashboard/patients/components/organisms/MedicalFileSection";
import DataSection from "@/modules/dashboard/patients/components/organisms/DataSection";
import EmergencySection from "@/modules/dashboard/patients/components/organisms/EmergencySection";
import InsuranceSection from "@/modules/dashboard/patients/components/organisms/InsuranceSection";
import LatestSection from "@/modules/dashboard/patients/components/organisms/LatestSection";
import VisitHistorySection from "@/modules/dashboard/visting/components/organisms/VisitHistorySection";
import MedicalFile from "@/modules/dashboard/medicalfile/components/organisms/MedicalFile";

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

      {activeTab === "overview" && (
        <>
          <DataSection />
          <MedicalFileSection />
          <EmergencySection />
          <InsuranceSection />
          <LatestSection />
        </>
      )}

      {activeTab === "visits" && <VisitHistorySection />}
      {activeTab === "medicalFile" && <MedicalFile />}
    </div>
  );
}
