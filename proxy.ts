import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TODO: populate when auth is implemented
const PUBLIC_ROUTES: string[] = ['/login', '/register', '/forgot-password']
const PROTECTED_ROUTES: string[] = ['/']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // TODO: replace with real token/session check
  // const token = request.cookies.get('token')?.value
  // const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r))
  // if (!isPublicRoute && !token) {
  //   const loginUrl = new URL('/login', request.url)
  //   loginUrl.searchParams.set('from', pathname)
  //   return NextResponse.redirect(loginUrl)
  // }
  // if (isPublicRoute && token) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  void pathname
  void PUBLIC_ROUTES
  void PROTECTED_ROUTES

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
