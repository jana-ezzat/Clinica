import React from "react";
import InfoStatCard from "../atoms/InfoStatCard";
import type { PatientDetails } from "../../hooks/usePatient";

interface PatientInfoCardsProps {
  patient: PatientDetails;
  labels: {
    lastVisit: string;
    phone: string;
    age: string;
    gender: string;
  };
  notAvailableLabel: string;
}

export default function PatientInfoCards({
  patient,
  labels,
  notAvailableLabel,
}: PatientInfoCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <InfoStatCard
        label={labels.lastVisit}
        value={patient.lastVisit ?? notAvailableLabel}
      />
      <InfoStatCard label={labels.phone} value={patient.phone} />
      <InfoStatCard
        label={labels.age}
        value={patient.age ? String(patient.age) : notAvailableLabel}
      />
      <InfoStatCard
        label={labels.gender}
        value={patient.gender ?? notAvailableLabel}
      />
    </div>
  );
}
