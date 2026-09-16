// src/modules/dashboard/patients/hooks/useInvoice.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import { Invoice } from "../types/invoice";

interface InvoiceResponse {
  status: string;
  data: Invoice;
}

const fetchInvoice = async (invoiceId: string): Promise<Invoice> => {
  const { data } = await axiosConfig.get<InvoiceResponse>(
    `/invoice/${invoiceId}`,
  );
  return data.data;
};

export const useInvoice = (invoiceId: string | null) => {
  return useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => fetchInvoice(invoiceId!),
    enabled: !!invoiceId,
  });
};
