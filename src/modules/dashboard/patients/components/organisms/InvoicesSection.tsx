// src/modules/dashboard/patients/components/organisms/InvoicesSection.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePatientInvoices } from "../../hooks/usePatientInvoices";
import { Invoice } from "../../types/invoice";
import InvoicesHeader from "../molecules/InvoicesHeader";
import InvoicesTable from "./InvoicesTable";
import InvoiceDetailsModal from "./InvoiceDetailsModal";
import StatusCard from "@/modules/dashboard/patients/components/atoms/StatusCard";

interface InvoicesSectionProps {
    patientId: string;
}

const InvoicesSection = ({ patientId }: InvoicesSectionProps) => {
    const t = useTranslations("patients.details.invoices");
    const { data: invoices, isLoading, isError } = usePatientInvoices(patientId);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    if (isLoading) return <StatusCard description={t("loading")} />;
    if (isError) return <StatusCard description={t("loadError")} tone="error" />;

    return (
        <div className="flex flex-col gap-5">
            <InvoicesHeader
                title={t("title")}
                btnTitle={t("addBtn")}
                onClick={() => undefined}
            />

            <InvoicesTable
                invoices={invoices ?? []}
                onRowClick={(invoice) => setSelectedInvoice(invoice)}
            />

            <InvoiceDetailsModal
                isOpen={!!selectedInvoice}
                invoiceId={selectedInvoice?._id ?? null}
                patientId={patientId}
                onClose={() => setSelectedInvoice(null)}
            />

        </div>
    );
};

export default InvoicesSection;
