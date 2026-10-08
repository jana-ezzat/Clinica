"use client";
import { useLocale, useTranslations } from "next-intl";
import Accordion from "../molecules/Accordion";
import FieldGroup from "../atoms/FieldGroup";
import DataField from "@/shared/components/atoms/DataField";
import IconList from "@/shared/components/molecules/IconList";
import { Pill, Scissors } from "lucide-react";
import Badge from "@/shared/components/atoms/Badge";
import { formatLongDate } from "@/lib/utils";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
}

const EMPTY = "—";

export default function MedicalFileSection({ patient }: Props) {
  const t = useTranslations("patients.details.overview");
  const locale = useLocale();
  const med = patient.medicalInformation;

  return (
    <Accordion title={t("sections.medical")}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FieldGroup label={t("fields.bloodType")}>
          {med?.bloodType ? (
            <Badge tone="red">{med.bloodType}</Badge>
          ) : (
            <span>{EMPTY}</span>
          )}
        </FieldGroup>

        <FieldGroup label={t("fields.allergies")}>
          {med?.allergies && med.allergies.length > 0 ? (
            med.allergies.map((a, i) => (
              <Badge key={`${a}-${i}`} tone="pink">
                {a}
              </Badge>
            ))
          ) : (
            <span>{EMPTY}</span>
          )}
        </FieldGroup>

        <FieldGroup label={t("fields.chronicDiseases")}>
          {med?.chronicDiseases && med.chronicDiseases.length > 0 ? (
            med.chronicDiseases.map((d, i) => (
              <Badge key={`${d}-${i}`} tone="yellow">
                {d}
              </Badge>
            ))
          ) : (
            <span>{EMPTY}</span>
          )}
        </FieldGroup>

        <IconList
          label={t("fields.medications")}
          icon={Pill}
          items={med?.medications ?? []}
          iconClassName="ds-color-secondary"
        />

        <IconList
          label={t("fields.previousSurgeries")}
          icon={Scissors}
          items={(med?.previousSurgeries ?? []).map(
            (s) => `${s.name} - ${formatLongDate(s.date, locale)}`,
          )}
          iconClassName="text-red-500"
        />

        <DataField
          label={t("fields.familyMedicalHistory")}
          value={med?.familyMedicalHistory ?? EMPTY}
          fullWidth
        />
        <DataField
          label={t("fields.medicalHistory")}
          value={med?.medicalHistory ?? EMPTY}
          fullWidth
        />
      </div>
    </Accordion>
  );
}
