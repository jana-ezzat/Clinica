import Accordion from "../molecules/Accordion";
import FieldGroup from "../atoms/FieldGroup";
import DataField from "@/shared/components/atoms/DataField";
import IconList from "@/shared/components/molecules/IconList";
import { Pill, Scissors } from "lucide-react";
import Badge from "@/shared/components/atoms/Badge";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
}

export default function MedicalFileSection({ patient }: Props) {
  const med = patient.medicalInformation;

  return (
    <Accordion title="الملف الطبي">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FieldGroup label="فصيلة الدم">
          {med?.bloodType ? (
            <Badge tone="red">{med.bloodType}</Badge>
          ) : (
            <span>—</span>
          )}
        </FieldGroup>

        <FieldGroup label="الحساسية">
          {med?.allergies && med.allergies.length > 0 ? (
            med.allergies.map((a) => (
              <Badge key={a} tone="pink">
                {a}
              </Badge>
            ))
          ) : (
            <span>—</span>
          )}
        </FieldGroup>

        <FieldGroup label="الامراض المزمنة">
          {med?.chronicDiseases && med.chronicDiseases.length > 0 ? (
            med.chronicDiseases.map((d) => (
              <Badge key={d} tone="yellow">
                {d}
              </Badge>
            ))
          ) : (
            <span>—</span>
          )}
        </FieldGroup>

        <IconList
          label="الأدوية الحالية"
          icon={Pill}
          items={med?.medications ?? []}
          iconClassName="ds-color-secondary"
        />

        <IconList
          label="العمليات السابقة"
          icon={Scissors}
          items={
            med?.previousSurgeries?.map((s) => `${s.name} - ${s.date}`) ?? []
          }
          iconClassName="text-red-500"
        />

        <DataField
          label="تاريخ العائلة المرضي"
          value={med?.familyMedicalHistory ?? "—"}
          fullWidth
        />
        <DataField
          label="التاريخ المرضي"
          value={med?.medicalHistory ?? "—"}
          fullWidth
        />
      </div>
    </Accordion>
  );
}
