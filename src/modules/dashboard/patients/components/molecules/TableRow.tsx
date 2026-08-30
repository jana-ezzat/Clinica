import { useRouter } from "next/navigation";
import AvatarInitial from "../atoms/AvatarInitial";
import type { Patient } from "../../hooks/usePatients";
import Badge from "@/shared/components/atoms/Badge";

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
        <Badge tone={patient.patient_type === "returning" ? "info" : "success"}>
          {patient.patient_type === "returning"
            ? typeLabels.returning
            : typeLabels.new}
        </Badge>{" "}
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
