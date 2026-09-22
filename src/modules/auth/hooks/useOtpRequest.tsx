import axiosConfig from "@/services/axiosConfig";

interface OtpPayload {
  email: string;
  otp: string;
}

export interface OtpResponse {
  email: string;
  otp: string;
  changePasswordToken: string;
}

export async function OtpRequest({
  otp,
  email,
}: OtpPayload): Promise<OtpResponse> {
  const res = await axiosConfig.post("auth/changePassword/otp", {
    otp: otp,
    email: email,
  });
  return res.data;
}
