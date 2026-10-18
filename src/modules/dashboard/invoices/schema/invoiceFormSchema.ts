// src/modules/dashboard/invoices/schema/invoiceFormSchema.ts
import { z } from "zod";
import { addInvoiceSchema } from "../../patients/schema/addInvoiceSchema";

// Same rules the patient module already defined, plus:
// - `patient`: the doctor picks it here (fixed on the patient page)
// - `invoiceDate`: only used when editing (PATCH accepts it)
export const invoiceFormSchema = addInvoiceSchema.extend({
  patient: z.string().min(1, "requiredField"),
  invoiceDate: z.string().optional(),
});

export type InvoiceFormInput = z.input<typeof invoiceFormSchema>;
export type InvoiceFormValues = z.output<typeof invoiceFormSchema>;
