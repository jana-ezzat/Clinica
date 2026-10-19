// src/modules/dashboard/invoices/components/organisms/InvoicesListTable.tsx
"use client";

import { useTranslations } from "next-intl";
import TableCard from "@/shared/components/molecules/TableCard";
import TableHeaderRow from "@/shared/components/molecules/TableHeaderRow";
import { Invoice } from "../../../patients/types/invoice";
import InvoicesListRow from "../molecules/InvoicesListRow";

interface Props {
  invoices: Invoice[];
  patientNames: Record<string, string>;
  onEdit: (invoice: Invoice) => void;
}

export default function InvoicesListTable({
  invoices,
  patientNames,
  onEdit,
}: Props) {
  const t = useTranslations("Invoice.list.columns");

  const columns = [
    t("invoiceNumber"),
    t("patient"),
    t("date"),
    t("total"),
    t("paid"),
    t("remaining"),
    t("status"),
    t("actions"),
  ];

  return (
    <TableCard minWidth="min-w-[900px]">
      <TableHeaderRow columns={columns} />
      <tbody>
        {invoices.map((invoice) => (
          <InvoicesListRow
            key={invoice._id}
            invoice={invoice}
            patientName={patientNames[invoice.patient] ?? "—"}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </TableCard>
  );
}
