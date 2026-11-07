"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePatient } from "@/modules/dashboard/patients/hooks/usePatient";
import useVisits from "@/modules/dashboard/patients/hooks/useVisits";
import usePatientAppointments from "@/modules/dashboard/patients/hooks/usePatientAppointments";

import type { PatientTab } from "@/modules/dashboard/patients/components/molecules/PatientTabs";
import PatientHeader from "@/modules/dashboard/patients/components/organisms/PatientHeader";
import DataSection from "@/modules/dashboard/patients/components/organisms/DataSection";
import MedicalFileSection from "@/modules/dashboard/patients/components/organisms/MedicalFileSection";
import EmergencySection from "@/modules/dashboard/patients/components/organisms/EmergencySection";
import InsuranceSection from "@/modules/dashboard/patients/components/organisms/InsuranceSection";
import LatestSection from "@/modules/dashboard/patients/components/organisms/LatestSection";
import PatientPageSkeleton from "@/modules/dashboard/patients/components/organisms/PatientPageSkeleton";
import SectionSkeleton from "@/shared/components/molecules/SectionSkeleton";
import StatusCard from "@/shared/components/atoms/StatusCard";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";

// These tabs are only downloaded when the user opens them
const tabFallback = () => <SectionSkeleton fields={6} />;

const VisitHistorySection = dynamic(
  () =>
    import("@/modules/dashboard/patients/components/organisms/VisitHistorySection"),
  { loading: tabFallback },
);
const MedicalFile = dynamic(
  () => import("@/modules/dashboard/patients/components/molecules/MedicalFile"),
  { loading: tabFallback },
);
const InvoicesSection = dynamic(
  () =>
    import("@/modules/dashboard/patients/components/organisms/InvoicesSection"),
  { loading: tabFallback },
);

export default function PatientDetailsPage() {
  const params = useParams<{ id: string }>();
  const t = useTranslations("patients.details");
  const { data: patient, isLoading, isError, refetch } = usePatient(params.id);
  const [activeTab, setActiveTab] = useState<PatientTab>("overview");

  
  useVisits(params.id);
  usePatientAppointments(params.id);

  if (isLoading) {
    return <PatientPageSkeleton />;
  }

  if (!patient) {
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
      {isError && (
        <div
          role="alert"
          className="ds-bg-card ds-border-gray flex items-center justify-between rounded-xl border p-4">
          <Text size="sm" className="!p-0">
            {t("refreshError")}
          </Text>
          <Button variant="ghost" size="sm" onClick={() => refetch()}>
            {t("retry")}
          </Button>
        </div>
      )}

      <PatientHeader
        patient={patient}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "overview" && (
        <>
          <DataSection patient={patient} />
          <MedicalFileSection patient={patient} />
          <EmergencySection patient={patient} />
          <InsuranceSection patient={patient} />
          <LatestSection patientId={patient.id} />
        </>
      )}

      {activeTab === "visits" && <VisitHistorySection patientId={patient.id} />}
      {activeTab === "medicalFile" && <MedicalFile patient={patient} />}
      {activeTab === "invoices" && <InvoicesSection patientId={patient.id} />}
    </div>
  );
}
