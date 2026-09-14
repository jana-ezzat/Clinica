// src\modules\dashboard\patients\hooks\usePatientInvoices.ts
import { useQuery } from "@tanstack/react-query";
import { Invoice } from "../types/invoice";
import axiosConfig from "@/services/axiosConfig";

interface InvoicesResponse {
    status: string;
    results: number;
    data: Invoice[];
}

const fetchPatientInvoices = async (patientId: string): Promise<Invoice[]> => {
    const { data } = await axiosConfig.get<InvoicesResponse>(
        `/invoice/patient/${patientId}`
    );
    return data.data;
};

export const usePatientInvoices = (patientId: string) => {
    return useQuery({
        queryKey: ["patient-invoices", patientId],
        queryFn: () => fetchPatientInvoices(patientId),
        enabled: !!patientId,
    });
};