import axiosConfig from "@/services/axiosConfig";

export interface ResetPayload {
  newPassword: string;
  confirmPassword: string;
}

export async function ResetPasswordRequest({
  newPassword,
  confirmPassword,
}: ResetPayload) {
  const res = await axiosConfig.patch("auth/changePassword", {
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  });
  return res.data;
}
