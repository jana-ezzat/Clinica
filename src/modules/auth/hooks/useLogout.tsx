"use client";
import { useRouter } from "next/navigation";
import tokenService from "@/services/tokenService";

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    tokenService.clear();
    router.push("/sign-in");
  };

  return { logout };
};

export default useLogout;
