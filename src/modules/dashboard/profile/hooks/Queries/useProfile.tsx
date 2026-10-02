import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { UserProfile } from "../../lib/Profile";
import { GetProfileData } from "../Requests/useGetProfileRequest";

export function useProfile() {
  return useApiQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: GetProfileData,
  });
}
