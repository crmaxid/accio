import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

interface JWTPayload {
  id: string
  name: string
  email: string
  role: string
  companyCode: string
  iat: number
  exp: number
}

const PUBLIC_ROUTES = ['/login']
const DEFAULT_TEAM = 'crmax'

const VALID_TEAM_IDS = ['crmax', 'mahakarya'] as const
type TeamId = (typeof VALID_TEAM_IDS)[number]

let cachedJwtKey: Uint8Array | null = null

const getJwtKey = (): Uint8Array => {
  if (!cachedJwtKey) {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET is not defined')
    cachedJwtKey = new TextEncoder().encode(secret)
  }
  return cachedJwtKey
}

function isValidTeamId(id: string): id is TeamId {
  return (VALID_TEAM_IDS as readonly string[]).includes(id)
}

function canAccessTeam(
  companyCode: string | undefined,
  teamId: string,
): boolean {
  if (!companyCode) return true
  if (companyCode === 'CAM' && teamId === 'mahakarya') return false
  return true
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('Authorization')?.value
  const isPublic = PUBLIC_ROUTES.includes(pathname)

  if (!token) {
    if (isPublic) return NextResponse.next()

    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const { payload } = await jwtVerify<JWTPayload>(token, getJwtKey(), {
      algorithms: ['HS256'],
    })

    if (isPublic) {
      return NextResponse.redirect(new URL(`/${DEFAULT_TEAM}`, request.url))
    }

    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${DEFAULT_TEAM}`, request.url))
    }

    const segments = pathname.split('/').filter(Boolean)
    const teamId = segments[0]

    if (teamId) {
      if (!isValidTeamId(teamId)) {
        const restOfPath = segments.slice(1).join('/')
        const redirectPath = restOfPath
          ? `/${DEFAULT_TEAM}/${restOfPath}`
          : `/${DEFAULT_TEAM}`
        return NextResponse.redirect(new URL(redirectPath, request.url))
      }

      if (!canAccessTeam(payload.companyCode, teamId)) {
        const restOfPath = segments.slice(1).join('/')
        const redirectPath = restOfPath
          ? `/${DEFAULT_TEAM}/${restOfPath}`
          : `/${DEFAULT_TEAM}`
        return NextResponse.redirect(new URL(redirectPath, request.url))
      }
    }

    const response = NextResponse.next()
    response.headers.set('x-user', JSON.stringify(payload))
    return response
  } catch {
    const response = isPublic
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('Authorization')
    return response
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/crmax',
    '/crmax/:path*',
    '/mahakarya',
    '/mahakarya/:path*',
  ],
}
