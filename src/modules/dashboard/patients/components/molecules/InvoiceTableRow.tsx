"use client";

import { useFormatter } from "next-intl";
import { Invoice } from "../../types/invoice";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

interface InvoiceTableRowProps {
  invoice: Invoice;
  onClick: (invoice: Invoice) => void;
}

export default function InvoiceTableRow({
  invoice,
  onClick,
}: InvoiceTableRowProps) {
  const format = useFormatter();
  const dateValue = invoice.invoiceDate || invoice.createdAt;

  return (
    <tr
      onClick={() => onClick(invoice)}
      className="ds-border-gray cursor-pointer border-b transition-colors hover:bg-black/[0.02]"
    >
      <td className="ds-text px-5 py-4 font-medium">{invoice.invoiceNumber}</td>
      <td className="ds-text-secondary px-5 py-4 text-sm">
        {dateValue
          ? format.dateTime(new Date(dateValue), {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "—"}
      </td>
      <td className="ds-text px-5 py-4">{invoice.total}</td>
      <td className="px-5 py-4 text-green-600">{invoice.paid}</td>
      <td className="px-5 py-4 text-red-600">{invoice.remaining}</td>
      <td className="px-5 py-4">
        <InvoiceStatusBadge status={invoice.status} />
      </td>
    </tr>
  );
}
