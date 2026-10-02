import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("auth_token"));
  }, []);
  return {
    isAuthenticated,
  };
};
