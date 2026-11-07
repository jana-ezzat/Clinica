import { z } from "zod";

export const VisitSchema = z.object({
  visitDate: z.string().min(1, "required"),
  reason: z.string().min(1, "required"),
  weight: z.string().optional(),
  height: z.string().optional(),
  pulse: z.string().optional(),
  temperature: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  doctorNotes: z.string().optional(),
  followUpDate: z.string().optional(),
});

export type VisitFormValues = z.infer<typeof VisitSchema>;