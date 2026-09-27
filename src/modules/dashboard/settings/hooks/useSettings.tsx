"use client";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { ClinicSettingsResponse } from "../lib/SettingData";
import { GetSettingData } from "./useGetDataRequest";

export function useSettings() {
  return useApiQuery<ClinicSettingsResponse["data"]>({
    queryKey: ["clinic-settings"],
    queryFn: GetSettingData,
  });
}
