// src/modules/dashboard/invoices/hooks/useInvoices.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import { Invoice } from "../../patients/types/invoice";

interface InvoicesResponse {
  status: string;
  results?: number;
  data: unknown;
}

// GET /invoice/doctor/:id returns `data: Invoice[]`. For GET /invoice no sample
// response was shared yet, so accept both `data: [...]` and `data: { invoices: [...] }`.
const extractInvoices = (payload: unknown): Invoice[] => {
  if (Array.isArray(payload)) return payload as Invoice[];
  if (payload && typeof payload === "object") {
    const list = Object.values(payload).find(Array.isArray);
    if (list) return list as Invoice[];
  }
  return [];
};

const fetchAllInvoices = async (): Promise<Invoice[]> => {
  const { data } = await axiosConfig.get<InvoicesResponse>("/invoice");
  return extractInvoices(data.data);
};

const fetchDoctorInvoices = async (doctorId: string): Promise<Invoice[]> => {
  const { data } = await axiosConfig.get<InvoicesResponse>(
    `/invoice/doctor/${doctorId}`,
  );
  return extractInvoices(data.data);
};

interface InvoicesUser {
  _id: string;
  role: string;
}

// admin  -> every invoice        (GET /invoice)
// others -> only their own       (GET /invoice/doctor/:id)
// Anything that isn't "admin" falls back to the narrower, doctor-scoped list.
// NOTE: this only chooses what the UI asks for — the backend must enforce access.
export const useInvoices = (user: InvoicesUser | undefined) => {
  const isAdmin = user?.role === "admin";

  return useQuery({
    // starts with "invoices" so one invalidateQueries({ queryKey: ["invoices"] })
    // refreshes the admin list and the doctor list.
    queryKey: ["invoices", isAdmin ? "all" : "doctor", isAdmin ? null : user?._id],
    queryFn: () =>
      isAdmin ? fetchAllInvoices() : fetchDoctorInvoices(user!._id),
    enabled: !!user,
  });
};
