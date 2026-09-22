import axiosConfig from "@/services/axiosConfig";

interface OtpPayload {
  email: string;
  otp: string;
}

export async function OtpRequest({ otp, email }: OtpPayload) {
  const res = await axiosConfig.post("auth/changePassword/otp", {
    otp: otp,
    email: email,
  });
  return res.data;
}
