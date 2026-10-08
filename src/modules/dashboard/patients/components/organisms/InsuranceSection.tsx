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

export default function InsuranceSection({ patient }: Props) {
  const t = useTranslations("patients.details.overview");
  const locale = useLocale();
  const insurance = patient.insurance;

  return (
    <Accordion title={t("sections.insurance")}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <DataField
          label={t("fields.insuranceCompany")}
          value={insurance?.company ?? EMPTY}
        />
        <DataField
          label={t("fields.memberNumber")}
          value={insurance?.memberNumber ?? EMPTY}
        />
        <DataField
          label={t("fields.coverageRatio")}
          value={
            insurance?.coverageRatio !== undefined
              ? `${insurance.coverageRatio}%`
              : EMPTY
          }
        />
        <DataField
          label={t("fields.insuranceEndDate")}
          value={formatLongDate(insurance?.endDate, locale)}
        />
      </div>
    </Accordion>
  );
}
