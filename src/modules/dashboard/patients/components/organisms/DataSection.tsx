"use client";
import { useLocale, useTranslations } from "next-intl";
import Accordion from "../molecules/Accordion";
import DataField from "@/shared/components/atoms/DataField";
import { formatLongDate } from "@/lib/utils";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
}

const EMPTY = "—";

export default function DataSection({ patient }: Props) {
  const t = useTranslations("patients.details.overview");
  const locale = useLocale();

  return (
    <Accordion title={t("sections.basic")}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <DataField label={t("fields.fullName")} value={patient.name} />
        <DataField
          label={t("fields.gender")}
          value={patient.gender ? t(`gender.${patient.gender}`) : EMPTY}
        />
        <DataField
          label={t("fields.dateOfBirth")}
          value={formatLongDate(patient.dateOfBirth, locale)}
        />

        <DataField
          label={t("fields.age")}
          value={
            patient.age !== undefined
              ? t("ageYears", { count: patient.age })
              : EMPTY
          }
        />
        <DataField
          label={t("fields.nationalID")}
          value={patient.nationalID ?? EMPTY}
        />
        <DataField label={t("fields.phone")} value={patient.phone} />

        <DataField
          label={t("fields.otherPhone")}
          value={patient.otherPhone ?? EMPTY}
        />
        <DataField label={t("fields.email")} value={patient.email ?? EMPTY} />
        <div />

        <DataField
          label={t("fields.address")}
          value={patient.address ?? EMPTY}
          fullWidth
        />
      </div>
    </Accordion>
  );
}
