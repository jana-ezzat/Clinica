import { useTranslations } from "next-intl";
import { invoiceData } from "@/modules/dashboard/lib/InvoicesData";
export function useInvoicePdfProps() {
  const t = useTranslations("Invoice");

  return {
    invoice: {
      ...invoiceData,

      clinic: {
        ...invoiceData.clinic,
        brand: t("brand"),
      },

      summary: {
        ...invoiceData.summary,
        paymentMethod: t("cash"),
      },

      paymentDetails: {
        ...invoiceData.paymentDetails,
        method: t("cash"),
        status: t("paid"),
      },

      services: invoiceData.services.map((service) => ({
        ...service,
        description: t(`servicesList.${service.key}`),
      })),

      notes: t("Notes"),
      terms: t("Terms"),
    },

    labels: {
      invoice: t("invoice"),
      taxNumber: t("taxNumber"),
      address: t("address"),
      phone: t("phone"),
      email: t("email"),
      date: t("date"),
      time: t("time"),

      patient: t("patient"),
      fileNumber: t("fileNumber"),
      visitDate: t("visitDate"),
      doctor: t("doctor"),

      services: t("services"),
      description: t("headers.description"),
      price: t("headers.price"),
      discount: t("headers.discount"),
      total: t("headers.total"),

      paymentSummary: t("summary.title"),
      netTotal: t("summary.netTotal"),
      paid: t("summary.paid"),
      paymentMethod: t("summary.paymentMethod"),

      paymentDetails: t("details.title"),
      status: t("details.status"),

      notes: t("NotesLabel"),
      terms: t("TermsLabel"),
    },
  };
}
