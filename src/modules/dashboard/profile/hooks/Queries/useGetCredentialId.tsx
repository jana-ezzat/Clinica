"use client";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { CredentialData, CredentialType } from "../../lib/UpdataData";
import { GetCredentialById } from "../Requests/GetCredentialById";

export function useGetCredentialId(type: CredentialType, id: string) {
  return useApiQuery<CredentialData>({
    queryKey: ["credential", type, id],

    queryFn: () => GetCredentialById(type, id),

    options: { enabled: Boolean(type && id) },
  });
}
