// src/modules/dashboard/invoices/lib/buildInvoiceDocument.ts
import type { InvoiceData } from "@/modules/dashboard/lib/InvoicesData";
import type { Invoice } from "../../patients/types/invoice";

/**
 * Clinic/doctor details printed in the invoice header.
 * Clinic settings (GET /settings) are admin-only, so for now these come from the
 * doctor's own account. Anything missing stays empty and is hidden by the UI/PDF.
 */
export interface InvoiceDoctorInfo {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface Params {
  invoice: Invoice;
  patient?: { name?: string; phone?: string; fileNumber?: string };
  visitDate?: string;
  doctor: InvoiceDoctorInfo;
  brand: string;
  methodLabel: string;
  statusLabel: string;
  formatMoney: (value: number) => string;
  formatDate: (iso: string) => string;
  formatTime: (iso: string) => string;
}

const DASH = "—";

// Turns the API invoice (+ patient, visit, doctor lookups) into the shape the
// invoice page components and the PDF already expect. All numbers/dates come out
// as display strings; totals are the server's, nothing is recalculated here.
export function buildInvoiceDocument(p: Params): InvoiceData {
  const { invoice, doctor } = p;
  const doctorName = doctor.name || DASH;

  return {
    invoiceNumber: invoice.invoiceNumber,
    clinic: {
      brand: p.brand,
      doctorName,
      taxNumber: "", // not available to doctors (settings are admin-only)
      address: doctor.address ?? "",
      phone: doctor.phone ?? "",
      email: doctor.email ?? "",
    },
    date: p.formatDate(invoice.invoiceDate),
    time: p.formatTime(invoice.invoiceDate),
    patient: {
      name: p.patient?.name || DASH,
      fileNumber: p.patient?.fileNumber ?? "",
      phone: p.patient?.phone ?? "",
      visitDate: p.visitDate ? p.formatDate(p.visitDate) : DASH,
      doctorName,
    },
    services: invoice.services.map((service, index) => ({
      key: String(index),
      description: service.name,
      price: p.formatMoney(service.price),
      discount: p.formatMoney(service.discount),
      total: p.formatMoney(service.total),
    })),
    summary: {
      total: p.formatMoney(invoice.subtotal),
      discount: p.formatMoney(invoice.discount),
      netTotal: p.formatMoney(invoice.total),
      paid: p.formatMoney(invoice.paid),
      paymentMethod: p.methodLabel,
    },
    paymentDetails: {
      method: p.methodLabel,
      status: p.statusLabel,
      date: p.formatDate(invoice.invoiceDate),
    },
    notes: invoice.notes ?? "",
    terms: invoice.TermsAndConditions ?? "",
  };
}
