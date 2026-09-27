import { NextRequest, NextResponse } from "next/server";

const TOKEN_COOKIE = "auth_token";

const ADMIN_ONLY_SEGMENTS = ["doctors", "settings"];

interface DecodedToken {
  id: string;
  role: string;
  [key: string]: unknown;
}

function decodeTokenEdge(token: string): DecodedToken | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboardRoute && token) {
    const decoded = decodeTokenEdge(token);

    if (!decoded) {
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.delete(TOKEN_COOKIE);
      return response;
    }

    const isAdminOnlyRoute = ADMIN_ONLY_SEGMENTS.some((segment) =>
      pathname.startsWith(`/dashboard/${segment}`),
    );

    if (isAdminOnlyRoute && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
