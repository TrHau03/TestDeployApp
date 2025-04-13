import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/auth/:path*", "/"],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("x-access-token")?.value;

  const path = request.nextUrl.pathname;

  const isAuthPage = path === "/auth/signin" || path === "/auth/signup";

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
