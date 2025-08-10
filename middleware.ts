import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Generate a unique nonce for each request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Content Security Policy (CSP) headers with nonce
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'nonce-${nonce}' 
      https://www.google.com/recaptcha/ 
      https://www.gstatic.com/recaptcha/ 
      https://vercel.live 
      https://va.vercel-scripts.com;
    style-src 'self' 'nonce-${nonce}' 
      https://fonts.googleapis.com;
    font-src 'self' 
      https://fonts.gstatic.com;
    img-src 'self' 
      data: 
      blob: 
      https://i.scdn.co 
      https://github.com 
      https://avatars.githubusercontent.com;
    connect-src 'self' 
      https://api.spotify.com 
      https://accounts.spotify.com 
      https://www.google.com/recaptcha/ 
      https://vercel.live 
      https://vitals.vercel-insights.com;
    frame-src 'self' 
      https://www.google.com/recaptcha/;
    worker-src 'self' 
      blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // Set the nonce in a custom header so we can access it in our app
  response.headers.set('X-Nonce', nonce);

  // Additional security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
