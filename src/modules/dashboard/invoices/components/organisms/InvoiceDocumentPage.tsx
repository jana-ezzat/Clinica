// src/modules/dashboard/invoices/components/organisms/InvoiceDocumentPage.tsx
"use client";

import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { MdArrowBack } from "react-icons/md";
import Button from "@/shared/components/atoms/Button";
import StatusCard from "@/shared/components/atoms/StatusCard";
import SuccessModal from "@/shared/components/molecules/SuccessModal";
import { useDownloadPdf } from "@/shared/hooks/DownloadPdf";
import InfoBox from "@/modules/dashboard/patients/components/molecules/InfoBox";
import { useInvoicePdfProps } from "@/modules/dashboard/lib/InvoicePdfProps";
import type { InvoiceData } from "@/modules/dashboard/lib/InvoicesData";
import { useInvoice } from "../../../patients/hooks/useInvoice";
import { usePatient } from "../../../patients/hooks/usePatient";
import { usePatientVisits } from "../../../patients/hooks/usePatientVisits";
import { useProfile } from "../../../profile/hooks/Queries/useProfile";
import { useDoctor } from "../../../doctors/hooks/useDoctor";
import type { UserProfile } from "../../../profile/lib/Profile";
import {
  buildInvoiceDocument,
  type InvoiceDoctorInfo,
} from "../../lib/buildInvoiceDocument";
import InvoiceActionsBar from "../molecules/InvoiceActionsBar";
import ClinicInfoCard from "../molecules/ClinicInfoCard";
import InvoicesDate from "../molecules/InvoicesDate";
import PatientVisitCard from "../molecules/PatientVisitCard";
import ServicesTable from "../molecules/ServicesTable";
import PaymentSummary from "../molecules/PaymentSummary";
import PaymentDetails from "../molecules/PaymentDetails";
import InvoicePdf from "../molecules/InvoicePdf";

type PdfLabels = ReturnType<typeof useInvoicePdfProps>["labels"];

// /user/me also returns these for doctors (same user model as /user/:id),
// but the shared UserProfile type doesn't declare them yet.
type ProfileWithClinic = UserProfile & { phone?: string; clinicAddress?: string };

function InvoiceDocument({
  model,
  labels,
}: {
  model: InvoiceData;
  labels: PdfLabels;
}) {
  const t = useTranslations("Invoice");
  const tDoc = useTranslations("Invoice.document");

  const { handleDownload, isDownloading, showSuccess, setShowSuccess } =
    useDownloadPdf(
      <InvoicePdf invoice={model} labels={labels} />,
      `invoice-${model.invoiceNumber}`,
    );

  return (
    <div className="flex flex-col gap-7">
      <div>
        <Button
          tag="link"
          href="/dashboard/invoices"
          variant="ghost"
          size="sm"
          className="gap-2 !px-0">
          <MdArrowBack size={18} />
          {tDoc("back")}
        </Button>
      </div>

      <InvoiceActionsBar
        invoiceNumber={model.invoiceNumber}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />

      <ClinicInfoCard
        logoText={t("brand")}
        doctorName={model.clinic.doctorName}
        taxNumberLabel={t("taxNumber")}
        taxNumber={model.clinic.taxNumber}
        mainBranchLabel={t("mainBranch")}
        address={model.clinic.address}
        phone={model.clinic.phone}
        email={model.clinic.email}
      />

      <InvoicesDate
        title={t("titleDate")}
        invoiceNumber={model.invoiceNumber}
        dateLabel={t("date")}
        date={model.date}
        timeLabel={t("time")}
        time={model.time}
      />

      <PatientVisitCard
        name={model.patient.name}
        fileNumber={model.patient.fileNumber}
        phone={model.patient.phone}
        visitDate={model.patient.visitDate}
        doctorName={model.patient.doctorName}
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
        services={model.services}
      />

      <div className="mt-7 flex w-full flex-col gap-10 px-5">
        <PaymentSummary
          totalLabel={t("summary.total")}
          total={model.summary.total}
          discountLabel={t("summary.discount")}
          discount={model.summary.discount}
          netTotalLabel={t("summary.netTotal")}
          netTotal={model.summary.netTotal}
          paidLabel={t("summary.paid")}
          paid={model.summary.paid}
          paymentMethodLabel={t("summary.paymentMethod")}
          paymentMethod={model.summary.paymentMethod}
        />

        <PaymentDetails
          title={t("details.title")}
          methodLabel={t("details.method")}
          method={model.paymentDetails.method}
          statusLabel={t("details.status")}
          status={model.paymentDetails.status}
          dateLabel={t("details.date")}
          date={model.paymentDetails.date}
        />
      </div>

      {model.notes && (
        <InfoBox label={t("NotesLabel")} tone="gray">
          {model.notes}
        </InfoBox>
      )}

      {model.terms && (
        <InfoBox label={t("TermsLabel")} tone="gray">
          {model.terms}
        </InfoBox>
      )}

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={t("downloadSuccess")}
      />
    </div>
  );
}

export default function InvoiceDocumentPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("Invoice");
  const tDoc = useTranslations("Invoice.document");
  const tMethods = useTranslations("Invoice.form.methods");
  const tStatus = useTranslations("patients.details.invoices.status");
  const format = useFormatter();
  const { labels } = useInvoicePdfProps();

  const invoiceQuery = useInvoice(id);
  const invoice = invoiceQuery.data;

  const profile = useProfile();
  const me = profile.data as ProfileWithClinic | undefined;
  const isAdmin = me?.role === "admin";
  const isOwnInvoice = !!invoice && !!me && me._id === invoice.doctor;

  const patientQuery = usePatient(invoice?.patient ?? "");
  const visitsQuery = usePatientVisits(invoice?.patient ?? "");
  // Only an admin looking at another doctor's invoice needs the doctor's record.
  const doctorQuery = useDoctor(
    invoice && isAdmin && !isOwnInvoice ? invoice.doctor : "",
  );

  const isLoading =
    invoiceQuery.isLoading ||
    profile.isLoading ||
    patientQuery.isLoading ||
    visitsQuery.isLoading ||
    doctorQuery.isLoading;

  if (invoiceQuery.isError || (!invoice && !invoiceQuery.isLoading)) {
    return (
      <StatusCard
        tone="error"
        description={tDoc("loadError")}
        actionLabel={tDoc("retry")}
        onAction={() => invoiceQuery.refetch()}
      />
    );
  }

  if (isLoading || !invoice) {
    return <StatusCard description={tDoc("loading")} />;
  }

  const doctor: InvoiceDoctorInfo = isOwnInvoice
    ? {
        name: me?.name,
        email: me?.email,
        phone: me?.phone,
        address: me?.clinicAddress,
      }
    : doctorQuery.data
      ? {
          name: doctorQuery.data.name,
          email: doctorQuery.data.email,
          phone: doctorQuery.data.phone,
          address: doctorQuery.data.clinicAddress,
        }
      : {};

  const visit = visitsQuery.data?.find((v) => v._id === invoice.visit);
  const patient = patientQuery.data;

  const model = buildInvoiceDocument({
    invoice,
    patient: patient
      ? {
          name: patient.name,
          phone: patient.phone,
          fileNumber: patient.fileNumber,
        }
      : undefined,
    visitDate: visit?.visitDate,
    doctor,
    brand: t("brand"),
    methodLabel: tMethods(invoice.paymentMethod),
    statusLabel: tStatus(invoice.status),
    formatMoney: (value) =>
      format.number(value, { style: "currency", currency: "EGP" }),
    formatDate: (iso) =>
      format.dateTime(new Date(iso), { dateStyle: "medium" }),
    formatTime: (iso) =>
      format.dateTime(new Date(iso), { timeStyle: "short" }),
  });

  return <InvoiceDocument model={model} labels={labels} />;
}
