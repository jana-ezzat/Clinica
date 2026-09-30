import axiosConfig from "@/services/axiosConfig";
import {
  CredentialData,
  CredentialResponse,
  CredentialType,
} from "../../lib/UpdataData";

export async function GetCredentialById(
  type: CredentialType,
  id: string,
): Promise<CredentialData> {
  const res = await axiosConfig.get<CredentialResponse>(
    `/user/me/${type}/${id}`,
  );

  if (type === "certificates") {
    return res.data.data.certificate!;
  }

  return res.data.data.award!;
}
