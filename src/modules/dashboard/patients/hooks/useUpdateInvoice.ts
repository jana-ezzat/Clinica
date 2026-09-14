import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import { Invoice } from "../types/invoice";

interface UpdateInvoiceResponse {
  status: string;
  data: Invoice;
}

interface UpdateInvoiceVariables {
  invoiceId: string;
  paid: number;
}

const updateInvoice = async ({
  invoiceId,
  paid,
}: UpdateInvoiceVariables): Promise<Invoice> => {
  const { data } = await axiosConfig.patch<UpdateInvoiceResponse>(
    `/invoice/${invoiceId}`,
    { paid },
  );

  return data.data;
};

export const useUpdateInvoice = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInvoice,
    onSuccess: (_, { invoiceId }) => {
      queryClient.invalidateQueries({ queryKey: ["invoice", invoiceId] });
      queryClient.invalidateQueries({ queryKey: ["patient-invoices", patientId] });
    },
  });
};
