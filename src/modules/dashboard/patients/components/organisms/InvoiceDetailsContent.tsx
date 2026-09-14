// src/modules/dashboard/patients/components/organisms/InvoiceDetailsContent.tsx
"use client";

import { useTranslations, useFormatter } from "next-intl";
import { Invoice } from "../../types/invoice";
import InvoiceStatusBadge from "../molecules/InvoiceStatusBadge";

interface InvoiceDetailsContentProps {
    invoice: Invoice;
}

const InvoiceDetailsContent = ({ invoice }: InvoiceDetailsContentProps) => {
    const t = useTranslations("patients.details.invoices.details");
    const format = useFormatter();

    return (
        <div className="flex flex-col gap-6">
            {/* Header: invoice number + date + status */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-lg font-semibold">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">
                        {format.dateTime(new Date(invoice.invoiceDate), {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
                <InvoiceStatusBadge status={invoice.status} />
            </div>

            {/* Services table */}
            <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-start text-sm">
                    <thead className="bg-muted/40 text-muted-foreground">
                        <tr>
                            <th className="p-3 font-medium">{t("service")}</th>
                            <th className="p-3 font-medium">{t("price")}</th>
                            <th className="p-3 font-medium">{t("discount")}</th>
                            <th className="p-3 font-medium">{t("total")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.services.map((service, index) => (
                            <tr key={index} className="border-t border-border">
                                <td className="p-3">{service.name}</td>
                                <td className="p-3">{service.price}</td>
                                <td className="p-3 text-red-600">{service.discount}</td>
                                <td className="p-3 font-medium">{service.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals summary */}
            <div className="flex flex-col gap-2 rounded-xl bg-muted/40 p-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span>{invoice.subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("discount")}</span>
                    <span className="text-red-600">-{invoice.discount}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-semibold">
                    <span>{t("total")}</span>
                    <span>{invoice.total}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("paid")}</span>
                    <span className="text-green-600">{invoice.paid}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("remaining")}</span>
                    <span className="text-red-600">{invoice.remaining}</span>
                </div>
            </div>

            {/* Payment method */}
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("paymentMethod")}</span>
                <span className="font-medium">{t(`method.${invoice.paymentMethod}`)}</span>
            </div>

            {/* Notes */}
            {invoice.notes && (
                <div className="flex flex-col gap-1 text-sm">
                    <span className="text-muted-foreground">{t("notes")}</span>
                    <p>{invoice.notes}</p>
                </div>
            )}

            {/* Terms */}
            {invoice.TermsAndConditions && (
                <div className="flex flex-col gap-1 text-sm">
                    <span className="text-muted-foreground">{t("terms")}</span>
                    <p className="text-xs text-muted-foreground">
                        {invoice.TermsAndConditions}
                    </p>
                </div>
            )}
        </div>
    );
};

export default InvoiceDetailsContent;