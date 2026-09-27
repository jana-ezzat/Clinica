import axiosConfig from "@/services/axiosConfig";
import { ClinicSettingsResponse } from "../lib/SettingData";

export async function GetSettingData() {
  const res = await axiosConfig.get<ClinicSettingsResponse>("settings");
  console.log("API Response:", res.data);
  return res.data.data;
}
