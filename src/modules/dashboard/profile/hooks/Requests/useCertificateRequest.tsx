import axiosConfig from "@/services/axiosConfig";
import { AddCredentialPayload } from "../../lib/Profile";


export async function useCertificateRequest(data: AddCredentialPayload) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("desc", data.desc);
  if (data.file) {
    formData.append("file", data.file);
  }

  const res = await axiosConfig.post("/user/me/certificates", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return res.data.data;
}
