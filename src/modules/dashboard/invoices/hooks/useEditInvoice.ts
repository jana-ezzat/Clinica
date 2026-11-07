// src/modules/dashboard/invoices/hooks/useEditInvoice.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import { Invoice, PaymentMethod } from "../../patients/types/invoice";

export interface EditInvoicePayload {
  services: { name: string; price: number; discount: number }[];
  paid: number;
  paymentMethod: PaymentMethod;
  notes?: string;
  TermsAndConditions?: string;
  invoiceDate?: string;
}

interface InvoiceResponse {
  status: string;
  message: string;
  data: Invoice;
}

// PATCH /invoice/:id — confirmed fields: services, paid, paymentMethod,
// notes, TermsAndConditions, invoiceDate. patient/visit/doctor never change.
export const useEditInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      invoiceId,
      payload,
    }: {
      invoiceId: string;
      payload: EditInvoicePayload;
    }): Promise<Invoice> => {
      const { data } = await axiosConfig.patch<InvoiceResponse>(
        `/invoice/${invoiceId}`,
        payload,
      );
      return data.data;
    },
    onSuccess: (invoice) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["invoice", invoice._id] });
      queryClient.invalidateQueries({
        queryKey: ["patient-invoices", invoice.patient],
      });
    },
  });
};
