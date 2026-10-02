import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { AwardsResponse, CertificatesResponse } from "../../lib/Profile";
import {
  GetAwardsRequest,
  GetCertificatesRequest,
} from "../Requests/useGetAwardsRequest";

export function useGetAward() {
  return useApiQuery<AwardsResponse>({
    queryKey: ["Awards"],
    queryFn: GetAwardsRequest,
  });
}

export function useGetCertificate() {
  return useApiQuery<CertificatesResponse>({
    queryKey: ["Certificate"],
    queryFn: GetCertificatesRequest,
  });
}
