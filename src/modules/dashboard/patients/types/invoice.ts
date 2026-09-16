// src/modules/dashboard/patients/invoices/types/invoice.ts

export interface InvoiceService {
    name: string;
    price: number;
    discount: number;
    total: number;
}

export type InvoiceStatus = "paid" | "partial" | "unpaid";
export type PaymentMethod = "cash" | "card" | "insurance"; // عدّل حسب القيم الفعلية عندكم

export interface Invoice {
    _id: string;
    invoiceNumber: string;
    patient: string;
    doctor: string;
    visit: string;
    invoiceDate: string;
    services: InvoiceService[];
    subtotal: number;
    discount: number;
    total: number;
    paid: number;
    remaining: number;
    paymentMethod: PaymentMethod;
    status: InvoiceStatus;
    notes?: string;
    TermsAndConditions?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateInvoicePayload {
    patient: string;
    doctor: string;
    visit: string;
    services: { name: string; price: number; discount: number }[];
    paid: number;
    paymentMethod: PaymentMethod;
    notes?: string;
    TermsAndConditions?: string;
}
