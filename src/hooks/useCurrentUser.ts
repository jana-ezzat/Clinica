"use client";
import { useEffect, useState } from "react";
import tokenService from "@/services/tokenService";
import { decodeToken } from "@/lib/utils";

type CurrentUser = ReturnType<typeof decodeToken>;

const useCurrentUser = (): CurrentUser => {
  const [user, setUser] = useState<CurrentUser>(null);

  useEffect(() => {
    const token = tokenService.get();
    setUser(token ? decodeToken(token) : null);
  }, []);

  return user;
};

export default useCurrentUser;
