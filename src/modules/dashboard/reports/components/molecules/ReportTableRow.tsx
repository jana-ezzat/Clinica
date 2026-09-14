import { Pencil, Trash2 } from "lucide-react";
import type { ReportData } from "@/modules/dashboard/lib/mockData";
import Button from "@/shared/components/atoms/Button";
import Badge, { BadgeTone } from "@/shared/components/atoms/Badge";
import RowActions from "@/shared/components/molecules/RowActions";

interface ReportTableRowProps {
  report: ReportData;
  labels: {
    bookingTypes: Record<ReportData["bookingType"], string>;
    statuses: Record<ReportData["status"], string>;
    paymentMethods: Record<ReportData["paymentMethod"], string>;
    edit: string;
    delete: string;
  };
}

const statusTone: Record<ReportData["status"], BadgeTone> = {
  paid: "success",
  pending: "yellow",
  overdue: "red",
};

export default function ReportTableRow({
  report,
  labels,
}: ReportTableRowProps) {
  return (
    <tr className="ds-border-gray border-b transition-colors hover:bg-black/[0.02]">
      <td className="px-5 py-4 text-sm">
        <Badge tone={statusTone[report.status]}>
          {labels.statuses[report.status]}
        </Badge>
      </td>
      <td className="ds-text-secondary px-5 py-4 text-sm">
        {labels.bookingTypes[report.bookingType]}
      </td>

      <td className="px-5 py-4 text-sm">
        <span className="inline-flex rounded-full px-3 py-1 text-xs font-medium">
          {labels.statuses[report.status]}
        </span>
      </td>

      <td className="ds-text-secondary px-5 py-4 text-sm" dir="ltr">
        {report.bookingDate}
      </td>

      <td className="ds-text-secondary px-5 py-4 text-sm">
        {labels.paymentMethods[report.paymentMethod]}
      </td>

      <td className="px-5 py-4">
        <RowActions editLabel={labels.edit} deleteLabel={labels.delete} />
      </td>
    </tr>
  );
}
