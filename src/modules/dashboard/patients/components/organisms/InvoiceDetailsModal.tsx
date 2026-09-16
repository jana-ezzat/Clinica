"use client";

import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Title from "@/shared/components/atoms/Title";
import Button from "@/shared/components/atoms/Button";
import InvoiceDetailsContent from "./InvoiceDetailsContent";
import { useInvoice } from "../../hooks/useInvoice";
import { useUpdateInvoice } from "../../hooks/useUpdateInvoice";
// import Modal from "@/shared/components/atoms/Modal";
import StatusCard from "@/shared/components/atoms/StatusCard";
import Modal from "@/shared/components/molecules/ModalShell";

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string | null;
  patientId: string;
}

const InvoiceDetailsModal = ({
  isOpen,
  onClose,
  invoiceId,
  patientId,
}: InvoiceDetailsModalProps) => {
  const t = useTranslations("patients.details.invoices.details");
  const [paid, setPaid] = useState("");
  const { data: invoice, isLoading, isError, refetch } = useInvoice(
    isOpen ? invoiceId : null,
  );
  const { mutate: updateInvoice, isPending: isUpdating, isError: isUpdateError } =
    useUpdateInvoice(patientId);

  useEffect(() => {
    if (invoice && isOpen) setPaid(String(invoice.paid));
  }, [invoice, isOpen]);

  const handleUpdatePaid = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const paidAmount = Number(paid);
    if (!invoice || !Number.isFinite(paidAmount) || paidAmount < 0) return;

    updateInvoice(
      { invoiceId: invoice._id, paid: paidAmount },
      { onSuccess: onClose },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title size="lg" className="mb-4 font-bold">
        {invoice
          ? `${t("title")} - ${invoice.invoiceNumber}`
          : t("title")}
      </Title>

      {isLoading && <StatusCard description={t("loading")} />}

      {isError && (
        <StatusCard
          description={t("loadError")}
          tone="error"
          actionLabel={t("retry")}
          onAction={() => refetch()}
        />
      )}

      {invoice && (
        <>
          <InvoiceDetailsContent invoice={invoice} />

          <form onSubmit={handleUpdatePaid} className="flex items-end gap-3">
            <label className="flex flex-1 flex-col gap-1 text-sm">
              {t("paid")}
              <input
                type="number"
                min="0"
                step="0.01"
                value={paid}
                onChange={(event) => setPaid(event.target.value)}
                className="h-11 rounded-lg border border-gray-300 bg-transparent px-3 text-sm"
              />
            </label>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? t("updating") : t("updatePaid")}
            </Button>
          </form>
        </>
      )}

      {isUpdateError && <p className="text-sm text-red-600">{t("updateError")}</p>}
    </Modal>
  );
};

export default InvoiceDetailsModal;
