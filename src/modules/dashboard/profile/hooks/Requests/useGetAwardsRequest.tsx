import axiosConfig from "@/services/axiosConfig";
import { AwardsResponse, CertificatesResponse } from "../../lib/Profile";

export async function GetAwardsRequest(): Promise<AwardsResponse> {
  const res = await axiosConfig.get<{ data: AwardsResponse }>(
    "/user/me/awards",
  );
  return res.data.data;
}
export async function GetCertificatesRequest(): Promise<CertificatesResponse> {
  const res = await axiosConfig.get<{ data: CertificatesResponse }>(
    "/user/me/certificates",
  );

  return res.data.data;
}
