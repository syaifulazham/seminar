import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1] || req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY as string);
    return NextResponse.next(); // Continue to the requested page
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all /admin routes
};
