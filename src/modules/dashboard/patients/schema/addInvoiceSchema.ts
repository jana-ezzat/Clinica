import { z } from "zod";

export const invoiceServiceSchema = z.object({
  name: z.string().min(1, "requiredField"),
  price: z.coerce.number().min(0, "invalidPrice"),
  discount: z.coerce.number().min(0, "invalidDiscount").default(0),
});

export const addInvoiceSchema = z.object({
  visit: z.string().min(1, "requiredField"),
  services: z.array(invoiceServiceSchema).min(1, "atLeastOneService"),
  paid: z.coerce.number().min(0, "invalidPaid"),
  paymentMethod: z.enum(["cash", "card", "insurance"]),
  notes: z.string().optional(),
  TermsAndConditions: z.string().optional(),
});

export type AddInvoiceFormValues = z.infer<typeof addInvoiceSchema>;
