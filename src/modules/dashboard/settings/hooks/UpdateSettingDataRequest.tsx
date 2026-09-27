import axiosConfig from "@/services/axiosConfig";
import { ClinicSettingsForm } from "../lib/SettingData";

export async function UpdateSettingData(payload: Partial<ClinicSettingsForm>) {
  const res = await axiosConfig.put("settings", payload);
  return res.data;
}
