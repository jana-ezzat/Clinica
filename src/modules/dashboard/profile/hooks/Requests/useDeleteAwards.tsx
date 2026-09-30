import axiosConfig from "@/services/axiosConfig";

export async function DeleteCertificateRequest(id: string) {
  const res = await axiosConfig.delete(`/user/me/certificates/${id}`);
  return res.data;
}

export async function DeleteAwardRequest(id: string) {
  const res = await axiosConfig.delete(`/user/me/awards/${id}`);
  return res.data;
}
