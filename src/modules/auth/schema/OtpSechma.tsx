import z from "zod";

export const OtpSchema = z.object({
  otpNumber: z.string({ message: "OtpNumber" }),
});
export type OtpValue = z.infer<typeof OtpSchema>;
