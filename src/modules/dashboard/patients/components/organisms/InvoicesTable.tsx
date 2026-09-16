// src/modules/dashboard/patients/components/organisms/InvoicesTable.tsx
"use client";

import { useTranslations } from "next-intl";
import { Invoice } from "../../types/invoice";
import StatusCard from "@/modules/dashboard/patients/components/atoms/StatusCard";
import InvoiceTableRow from "../molecules/InvoiceTableRow";
interface InvoicesTableProps {
    invoices: Invoice[];
    onRowClick: (invoice: Invoice) => void;
}

const InvoicesTable = ({ invoices, onRowClick }: InvoicesTableProps) => {
    const t = useTranslations("patients.details.invoices.table");

    if (invoices.length === 0) {
        return <StatusCard description={t("empty")} />;
    }

    return (
        <div className="ds-bg-card ds-shadow-sm overflow-x-auto rounded-[18px]">
            <table className="w-full text-start text-sm">
                <thead>
                    <tr className="ds-border-gray border-b">
                        <th className="ds-text-secondary px-5 py-5 font-medium">
                            {t("invoiceNumber")}
                        </th>
                        <th className="ds-text-secondary px-5 py-5 font-medium">
                            {t("date")}
                        </th>
                        <th className="ds-text-secondary px-5 py-5 font-medium">
                            {t("total")}
                        </th>
                        <th className="ds-text-secondary px-5 py-5 font-medium">
                            {t("paid")}
                        </th>
                        <th className="ds-text-secondary px-5 py-5 font-medium">
                            {t("remaining")}
                        </th>
                        <th className="ds-text-secondary px-5 py-5 font-medium">
                            {t("status")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <InvoiceTableRow
                            key={invoice._id}
                            invoice={invoice}
                            onClick={onRowClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoicesTable;
