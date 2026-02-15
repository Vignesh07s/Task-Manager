import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// --- Public Routes (Login/Register) ---
const publicOnlyPaths = ['/login', '/register'];

// --- Protected Routes (Require Login) ---
const protectedPaths = ['/my-tasks'];

// --- Helper to get JWT Secret ---
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return new TextEncoder().encode(secret);
};

export async function proxy(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  let isLoggedIn = false;

  // --- Verify token ---
  if (token) {
    try {
      await jwtVerify(token, await getJwtSecret());
      isLoggedIn = true;
    } catch (err) {
      isLoggedIn = false;
    }
  }

  // --- Redirect logged-out users trying to access protected pages ---
  if (!isLoggedIn && protectedPaths.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // --- Redirect logged-in users trying to access public pages ---
  if (isLoggedIn && publicOnlyPaths.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/my-tasks';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// --- Matcher ---
export const config = {
  matcher: ['/login', '/register', '/my-tasks'],
};
