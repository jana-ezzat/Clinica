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
  lastVisit?: string;
  ageText?: string;
  genderText?: string;
  notAvailableLabel: string;
}

const ltr = (value: string) => `\u2066${value}\u2069`;

export default function PatientInfoCards({
  patient,
  labels,
  lastVisit,
  ageText,
  genderText,
  notAvailableLabel,
}: PatientInfoCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <InfoStatCard
        label={labels.lastVisit}
        value={lastVisit ?? notAvailableLabel}
      />
      <InfoStatCard label={labels.phone} value={ltr(patient.phone)} />
      <InfoStatCard label={labels.age} value={ageText ?? notAvailableLabel} />
      <InfoStatCard
        label={labels.gender}
        value={genderText ?? notAvailableLabel}
      />
    </div>
  );
}
