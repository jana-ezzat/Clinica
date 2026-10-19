// src/modules/dashboard/invoices/hooks/useCreateInvoice.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import { CreateInvoicePayload, Invoice } from "../../patients/types/invoice";



interface InvoiceResponse {
  status: string;
  message: string;
  data: Invoice;
}

// POST /invoice — the server generates invoiceNumber/invoiceDate and
// calculates subtotal, discount, total, remaining and status by itself.
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateInvoicePayload): Promise<Invoice> => {
      const { data } = await axiosConfig.post<InvoiceResponse>(
        "/invoice",
        payload,
      );
      return data.data;
    },
    onSuccess: (invoice) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({
        queryKey: ["patient-invoices", invoice.patient],
      });
    },
  });
};
