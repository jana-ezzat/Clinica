"use client";
import { useTranslations } from "next-intl";
import InvoiceActionsBar from "../molecules/InvoiceActionsBar";
import {
  invoiceData,
  invoiceHeaderData,
  servicesData,
  visitData,
} from "@/modules/dashboard/lib/InvoicesData";
import ClinicInfoCard from "../molecules/ClinicInfoCard";
import InvoicesDate from "../molecules/InvoicesDate";
import InfoBox from "@/modules/dashboard/patients/components/molecules/InfoBox";
import PatientVisitCard from "../molecules/PatientVisitCard";
import ServicesTable from "../molecules/ServicesTable";
import PaymentSummary from "../molecules/PaymentSummary";
import PaymentDetails from "../molecules/PaymentDetails";
import SuccessModal from "../molecules/SuccessModal";
import { useInvoicePdfProps } from "@/modules/dashboard/lib/InvoicePdfProps";
import { useDownloadPdf } from "../hooks/DownloadPdf";

const Invoices = () => {
  const t = useTranslations("Invoice");
  const pdf = useInvoicePdfProps();
  const { handleDownload, isDownloading, showSuccess, setShowSuccess } =
    useDownloadPdf(pdf, `invoice-${invoiceData.invoiceNumber}`);

  return (
    <div className="flex flex-col gap-7">
      <InvoiceActionsBar
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />

      <ClinicInfoCard
        logoText={t("brand")}
        doctorName={invoiceHeaderData.doctorName}
        taxNumberLabel={t("taxNumber")}
        taxNumber={invoiceHeaderData.taxNumber}
        mainBranchLabel={t("mainBranch")}
        address={invoiceHeaderData.address}
        phone={invoiceHeaderData.phone}
        email={invoiceHeaderData.email}
      />

      <InvoicesDate
        title={t("titleDate")}
        invoiceNumber="INV-2024-1247"
        dateLabel={t("date")}
        date="2024-11-10"
        timeLabel={t("time")}
        time="10:30 AM"
      />

      <PatientVisitCard
        name={visitData.patient.name}
        fileNumber={visitData.patient.fileNumber}
        phone={visitData.patient.phone}
        visitDate={visitData.patient.visitDate}
        doctorName={visitData.doctor.name}
        fileNumberLabel={t("fileNumber")}
        phoneLabel={t("phone")}
        visitDateLabel={t("visitDate")}
      />

      <ServicesTable
        title={t("servicestitle")}
        headers={{
          total: t("headers.total"),
          discount: t("headers.discount"),
          price: t("headers.price"),
          description: t("headers.description"),
        }}
        services={servicesData.map((service) => ({
          ...service,
          description: t(`servicesList.${service.key}`),
        }))}
      />

      <div className="mt-7 flex w-full flex-col gap-10 px-5">
        <PaymentSummary
          totalLabel={t("summary.total")}
          total="1350 جنيه"
          discountLabel={t("summary.discount")}
          discount="150 جنيه"
          netTotalLabel={t("summary.netTotal")}
          netTotal="1300 جنيه"
          paidLabel={t("summary.paid")}
          paid="1300 جنيه"
          paymentMethodLabel={t("summary.paymentMethod")}
          paymentMethod={t("cash")}
        />

        <PaymentDetails
          title={t("details.title")}
          methodLabel={t("details.method")}
          method={t("cash")}
          statusLabel={t("details.status")}
          status={t("paid")}
          dateLabel={t("details.date")}
          date="2024-11-10"
        />
      </div>

      <InfoBox label={t("NotesLabel")} tone="gray">
        {t("Notes")}
      </InfoBox>

      <InfoBox label={t("TermsLabel")} tone="gray">
        {t("Terms")}
      </InfoBox>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={t("downloadSuccess")}
      />
    </div>
  );
};

export default Invoices;
