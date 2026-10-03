import axiosConfig from "@/services/axiosConfig";

export async function UpdateSettingData(formData: FormData) {
  const res = await axiosConfig.put("settings", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return res.data;
}
