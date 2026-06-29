import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const AuthRouts = ['/sign-in', '/sign-up'];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/public-lessons') return NextResponse.next();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthRoutes = AuthRouts.some((route) => pathname.startsWith(route));

  if (isAuthRoutes) {
    if (session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/pricing',
    '/pricing/:path*',
    '/profile',
    '/public-lessons/:path*',
  ],
};
