import axiosConfig from "@/services/axiosConfig";
import {
  EditCredentialResponse,
  EditCredentialValues,
} from "../../lib/EditModal";

export const EditCertificateRequest = async (
  data: EditCredentialValues,
  id: string,
): Promise<EditCredentialResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("desc", data.desc);
  if (data.file) {
    formData.append("file", data.file);
  }

  if (data.removeFile) {
    formData.append("removeFile", "true");
  }

  const res = await axiosConfig.patch(`/user/me/certificates/${id}`, formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return res.data.date;
};
