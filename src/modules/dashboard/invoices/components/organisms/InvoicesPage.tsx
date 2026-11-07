// src/modules/dashboard/invoices/components/organisms/InvoicesPage.tsx
"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import StatusCard from "@/shared/components/atoms/StatusCard";
import InvoicesHeader from "../../../patients/components/molecules/InvoicesHeader";
import { usePatients } from "../../../patients/hooks/usePatients";
import { useProfile } from "../../../profile/hooks/Queries/useProfile";
import { Invoice } from "../../../patients/types/invoice";
import { useInvoices } from "../../hooks/useInvoices";
import InvoicesListTable from "./InvoicesListTable";
import InvoiceFormModal from "./InvoiceFormModal";

export default function InvoicesPage() {
  const t = useTranslations("Invoice.list");

  const profile = useProfile();
  const invoicesQuery = useInvoices(profile.data);
  const patientsQuery = usePatients();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Invoice | null>(null);

  // Invoices only carry the patient id, so names come from the patients list.
  const patientNames = useMemo(
    () =>
      Object.fromEntries(
        (patientsQuery.data ?? []).map((p) => [p.id, p.name]),
      ),
    [patientsQuery.data],
  );

  const openCreate = () => {
    setEditing(null);
    setIsFormOpen(true);
  };

  const openEdit = (invoice: Invoice) => {
    setEditing(invoice);
    setIsFormOpen(true);
  };

  const invoices = invoicesQuery.data;
  const hasError = profile.isError || invoicesQuery.isError;

  const retry = () => {
    if (profile.isError) profile.refetch();
    invoicesQuery.refetch();
  };

  let content;
  if (hasError) {
    content = (
      <StatusCard
        tone="error"
        description={t("loadError")}
        actionLabel={t("retry")}
        onAction={retry}
      />
    );
  } else if (!invoices) {
    content = <StatusCard description={t("loading")} />;
  } else if (invoices.length === 0) {
    content = <StatusCard description={t("empty")} />;
  } else {
    content = (
      <InvoicesListTable
        invoices={invoices}
        patientNames={patientNames}
        onEdit={openEdit}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <InvoicesHeader
        title={t("title")}
        btnTitle={t("addBtn")}
        onClick={openCreate}
      />

      {content}

      <InvoiceFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        invoice={editing}
        patientName={editing ? patientNames[editing.patient] : undefined}
      />
    </div>
  );
}
