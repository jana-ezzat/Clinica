import axiosConfig from "@/services/axiosConfig";
import { UserProfile } from "../../lib/Profile";

export async function GetProfileData(): Promise<UserProfile> {
  const res = await axiosConfig.get<{ data: UserProfile }>("/user/me");
  return res.data.data;
}
