import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export const tokenService = {
  get(): string | null {
    return Cookies.get(TOKEN_KEY) || null;
  },

  set(token: string): void {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  clear(): void {
    Cookies.remove(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.get();
  },
};

export default tokenService;
