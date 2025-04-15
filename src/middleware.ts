import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/chat', '/auth/login', '/auth/register'],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("x-access-token")?.value;
  const path = request.nextUrl.pathname;

  // If trying to access protected routes without a token
  if (!token && path === '/chat') {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and trying to access auth pages
  if (token && (path === '/auth/login' || path === '/auth/register')) {
    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
