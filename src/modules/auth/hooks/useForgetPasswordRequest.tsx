import axiosConfig from "@/services/axiosConfig";

export async function forgetPasswordRequest(email: string) {
  const res = await axiosConfig.post("auth/changePassword/request", { email });
  return res.data;
}
