import Accordion from "../molecules/Accordion";
import DataField from "@/shared/components/atoms/DataField";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
}

export default function DataSection({ patient }: Props) {
  return (
    <Accordion title="البيانات الأساسية">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <DataField label="الاسم الرباعي" value={patient.name} />
        <DataField
          label="النوع"
          value={patient.gender === "female" ? "أنثى" : "ذكر"}
        />
        <DataField
          label="تاريخ الميلاد"
          value={
            patient.dateOfBirth
              ? new Date(patient.dateOfBirth).toLocaleDateString("ar-EG")
              : "—"
          }
        />

        <DataField
          label="العمر"
          value={patient.age !== undefined ? `${patient.age} سنه` : "—"}
        />
        <DataField label="الرقم القومي" value={patient.nationalID ?? "—"} />
        <DataField label="رقم الهاتف" value={patient.phone} />

        <DataField label="رقم الهاتف إضافي" value={patient.otherPhone ?? "—"} />
        <DataField label="البريد الالكتروني" value={patient.email ?? "—"} />
        <div />

        <DataField label="العنوان" value={patient.address ?? "—"} fullWidth />
      </div>
    </Accordion>
  );
}
