// src/modules/dashboard/patients/invoices/hooks/useAddInvoice.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateInvoicePayload, Invoice } from "../types/invoice";
import axiosConfig from "@/services/axiosConfig";

interface CreateInvoiceResponse {
    status: string;
    data: Invoice;
}

const addInvoice = async (
    payload: CreateInvoicePayload
): Promise<Invoice> => {
    const { data } = await axiosConfig.post<CreateInvoiceResponse>(
        "/invoice",
        payload
    );
    return data.data;
};

export const useAddInvoice = (patientId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addInvoice,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["patient-invoices", patientId],
            });
        },
    });
};