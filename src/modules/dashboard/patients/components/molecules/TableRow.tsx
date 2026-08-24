// src/modules/dashboard/patients/components/molecules/TableRow.tsx
import { useRouter } from "next/navigation";
import AvatarInitial from "../atoms/AvatarInitial";
import PatientTypeBadge from "../atoms/Badge";
import type { Patient } from "../../hooks/usePatients";

interface PatientTableRowProps {
  patient: Patient;
  typeLabels: { new: string; returning: string };
  emptyValueLabel: string;
}

export default function PatientTableRow({
  patient,
  typeLabels,
  emptyValueLabel,
}: PatientTableRowProps) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/dashboard/patients/${patient.id}`)}
      className="ds-border-gray cursor-pointer border-b transition-colors hover:bg-black/[0.02] ">
      <td className="px-8 py-4">
        <div className="flex items-center gap-3">
          <AvatarInitial name={patient.name} />
          <span className="ds-text font-medium">{patient.name}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <PatientTypeBadge type={patient.patient_type} labels={typeLabels} />
      </td>
      <td className="ds-text-secondary px-4 py-3 text-sm">
        {patient.nationality}
      </td>
      <td className="ds-text-secondary px-4 py-3 text-sm" dir="ltr">
        {patient.phone}
      </td>
      <td className="ds-text-secondary px-4 py-3 text-sm">
        {patient.email ?? emptyValueLabel}
      </td>
    </tr>
  );
}
