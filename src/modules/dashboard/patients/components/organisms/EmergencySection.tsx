"use client";
import { useTranslations } from "next-intl";
import Accordion from "../molecules/Accordion";
import DataField from "@/shared/components/atoms/DataField";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
}

const EMPTY = "—";

export default function EmergencySection({ patient }: Props) {
  const t = useTranslations("patients.details.overview");
  const contact = patient.emergencyContact;

  return (
    <Accordion title={t("sections.emergency")}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <DataField
          label={t("fields.emergencyName")}
          value={contact?.emergencyname ?? EMPTY}
        />
        <DataField
          label={t("fields.emergencyPhone")}
          value={contact?.emergencyphone ?? EMPTY}
        />
        <DataField
          label={t("fields.emergencyRelationship")}
          value={contact?.emergencyrelationship ?? EMPTY}
        />
      </div>
    </Accordion>
  );
}
