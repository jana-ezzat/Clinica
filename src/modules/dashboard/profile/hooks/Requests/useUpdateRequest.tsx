import axiosConfig from "@/services/axiosConfig";
import { UpdateData, UserProfile } from "../../lib/Profile";

export const UpdateRequest = async (data: UpdateData): Promise<UserProfile> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);

  if (data.img) {
    formData.append("img", data.img);
  }

  if (data.removeImage) {
    formData.append("removeImage", "true");
  }

  const res = await axiosConfig.patch("/user/me", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return res.data.data;
};
