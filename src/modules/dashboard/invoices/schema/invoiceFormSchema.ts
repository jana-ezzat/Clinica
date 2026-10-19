// src/modules/dashboard/invoices/schema/invoiceFormSchema.ts
import { z } from "zod";
import { addInvoiceSchema } from "../../patients/schema/addInvoiceSchema";

// Same rules the patient module already defined, plus:
// - `patient`: the doctor picks it here (fixed on the patient page)
// - `visit`: OPTIONAL — a first-time patient may not have a visit yet.
//   (admins still need one: it is how we know which doctor the invoice is for;
//   that rule lives in the form, see InvoiceFormModal)
// - `invoiceDate`: only used when editing (PATCH accepts it)
export const invoiceFormSchema = addInvoiceSchema.extend({
  patient: z.string().min(1, "requiredField"),
  // visit: z.string().optional(),
  // admins only (on the patient page there is no visit to take the doctor from)
  doctor: z.string().optional(),
  invoiceDate: z.string().optional(),
});

export type InvoiceFormInput = z.input<typeof invoiceFormSchema>;
export type InvoiceFormValues = z.output<typeof invoiceFormSchema>;
