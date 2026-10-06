import Accordion from "../molecules/Accordion";
import DataField from "@/shared/components/atoms/DataField";
import type { PatientDetails } from "../../hooks/usePatient";

interface Props {
  patient: PatientDetails;
}

export default function EmergencySection({ patient }: Props) {
  const contact = patient.emergencyContact;

  return (
    <Accordion title="جهة اتصال الطوارئ">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <DataField label="الاسم" value={contact?.emergencyname ?? "—"} />
        <DataField label="رقم الهاتف" value={contact?.emergencyphone ?? "—"} />
        <DataField
          label="صلة القرابة"
          value={contact?.emergencyrelationship ?? "—"}
        />
      </div>
    </Accordion>
  );
}
