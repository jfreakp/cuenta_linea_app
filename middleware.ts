import { NextRequest, NextResponse } from 'next/server';
import { verifyJWTEdge } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Obtener token de cookie o header
    const token = request.cookies.get('auth_token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Verificar JWT
    const payload = await verifyJWTEdge(token);
    
    if (!payload) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.set({
        name: 'auth_token',
        value: '',
        maxAge: 0,
      });
      return response;
    }
  }

  // Rutas públicas de auth - redirigir si ya está autenticado
  const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    const token = request.cookies.get('auth_token')?.value;
    if (token) {
      const payload = await verifyJWTEdge(token);
      if (payload) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
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
