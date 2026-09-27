"use client";
import { useMemo } from "react";
import tokenService from "@/services/tokenService";
import { decodeToken } from "@/lib/utils";

const useCurrentUser = () => {
  return useMemo(() => {
    const token = tokenService.get();
    if (!token) return null;
    return decodeToken(token);
  }, []);
};

export default useCurrentUser;
