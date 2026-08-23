// src/modules/dashboard/reports/components/molecules/ReportTableRow.tsx
import { Pencil, Trash2 } from "lucide-react";
import type { ReportData } from "@/modules/dashboard/lib/mockData";
import Button from "@/shared/components/atoms/Button";

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

export default function ReportTableRow({
    report,
    labels,
}: ReportTableRowProps) {
    return (
        <tr className="ds-border-gray border-b transition-colors hover:bg-black/[0.02]">
            <td className="ds-text px-5 py-4 text-sm">
                {report.receivedFrom}
            </td>

            <td className="ds-text-secondary px-5 py-4 text-sm">
                {labels.bookingTypes[report.bookingType]}
            </td>

            <td className="px-5 py-4 text-sm">
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-medium">
                    {labels.statuses[report.status]}
                </span>
            </td>

            <td
                className="ds-text-secondary px-5 py-4 text-sm"
                dir="ltr"
            >
                {report.bookingDate}
            </td>

            <td className="ds-text-secondary px-5 py-4 text-sm">
                {labels.paymentMethods[report.paymentMethod]}
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={labels.edit}
                    >
                        <Pencil size={18} />
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        aria-label={labels.delete}
                    >
                        <Trash2 size={18} />
                    </Button>
                </div>
            </td>
        </tr>
    );
}