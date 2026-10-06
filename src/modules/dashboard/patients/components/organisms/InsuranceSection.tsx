import Accordion from "../molecules/Accordion";
import DataField from "@/shared/components/atoms/DataField";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
}

export default function InsuranceSection({ patient }: Props) {
  const insurance = patient.insurance;

  return (
    <Accordion title="بيانات التأمين">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <DataField label="شركة التأمين" value={insurance?.company ?? "—"} />
        <DataField label="رقم العضوية" value={insurance?.memberNumber ?? "—"} />
        <DataField
          label="نسبة التغطية"
          value={
            insurance?.coverageRatio !== undefined
              ? `${insurance.coverageRatio}%`
              : "—"
          }
        />
        <DataField
          label="تاريخ انتهاء التأمين"
          value={
            insurance?.endDate
              ? new Date(insurance.endDate).toLocaleDateString("ar-EG")
              : "—"
          }
        />
      </div>
    </Accordion>
  );
}
