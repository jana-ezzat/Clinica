// src/modules/dashboard/invoices/components/molecules/InvoicesListRow.tsx
"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { MdOutlineEdit, MdOutlineVisibility } from "react-icons/md";
import Button from "@/shared/components/atoms/Button";
import InvoiceStatusBadge from "../../../patients/components/molecules/InvoiceStatusBadge";
import { Invoice } from "../../../patients/types/invoice";

interface Props {
  invoice: Invoice;
  patientName: string;
  onEdit: (invoice: Invoice) => void;
}

export default function InvoicesListRow({
  invoice,
  patientName,
  onEdit,
}: Props) {
  const t = useTranslations("Invoice.list");
  const format = useFormatter();
  const router = useRouter();
  const money = (value: number) =>
    format.number(value, { maximumFractionDigits: 2 });

  return (
    <tr className="ds-border-gray border-b last:border-0">
      <td className="ds-text px-5 py-4 text-sm font-medium">
        {invoice.invoiceNumber}
      </td>
      <td className="ds-text px-5 py-4 text-sm">{patientName}</td>
      <td className="ds-text-secondary px-5 py-4 text-sm">
        {format.dateTime(new Date(invoice.invoiceDate), {
          dateStyle: "medium",
        })}
      </td>
      <td className="ds-text px-5 py-4 text-sm">{money(invoice.total)}</td>
      <td className="ds-text px-5 py-4 text-sm">{money(invoice.paid)}</td>
      <td className="ds-text px-5 py-4 text-sm">{money(invoice.remaining)}</td>
      <td className="px-5 py-4">
        <InvoiceStatusBadge status={invoice.status} />
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("viewLabel")}
            title={t("viewLabel")}
            onClick={() => router.push(`/dashboard/invoices/${invoice._id}`)}>
            <MdOutlineVisibility size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("updateLabel")}
            title={t("updateLabel")}
            onClick={() => onEdit(invoice)}>
            <MdOutlineEdit size={20} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
