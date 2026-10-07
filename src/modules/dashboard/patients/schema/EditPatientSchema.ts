import { z } from "zod";

export const EditPatientSchema = z.object({
  name: z.string().min(1, "required"),
  phone: z.string().min(1, "required"),
  otherPhone: z.string().optional(),
  email: z.string().email("invalidEmail").optional().or(z.literal("")),
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string().min(1, "required"),
  nationalID: z.string().optional(),
  address: z.string().optional(),

  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  chronicDiseases: z.string().optional(),
  medications: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  medicalHistory: z.string().optional(),

  emergencyname: z.string().optional(),
  emergencyphone: z.string().optional(),
  emergencyrelationship: z.string().optional(),

  insuranceCompany: z.string().optional(),
  insuranceMemberNumber: z.string().optional(),
  insuranceCoverageRatio: z.coerce.number().min(0).max(100).optional(),
  insuranceEndDate: z.string().optional(),
});

export type EditPatientFormValues = z.input<typeof EditPatientSchema>;
export type EditPatientFormOutput = z.output<typeof EditPatientSchema>;
