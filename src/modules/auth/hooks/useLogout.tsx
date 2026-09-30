"use client";
import { useRouter } from "next/navigation";
import tokenService from "@/services/tokenService";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    tokenService.clear();
    queryClient.clear();
    router.push("/sign-in");
  };

  return { logout };
};

export default useLogout;
