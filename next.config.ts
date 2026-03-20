import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.minio.runeforge.tech',
      },
    ],
    qualities: [75, 85, 100],
  },

  async rewrites() {
    if (isDev) {
      return [
        {
          source: '/core/v1/:path*',
          destination: 'https://api.cims.mjolnir.crmax.id/core/v1/:path*',
        },
        {
          source: '/core/v2/:path*',
          destination: 'https://api.cims.mjolnir.crmax.id/core/v2/:path*',
        },
        {
          source: '/core-report/:path*',
          destination: 'https://api.cims.mjolnir.crmax.id/core-report/:path*',
        },
        {
          source: '/core-document/:path*',
          destination: 'https://api.cims.mjolnir.crmax.id/core-document/:path*',
        },
        {
          source: '/core-analytics/v1/:path*',
          destination:
            'https://api.cims.mjolnir.crmax.id/core-analytics/v1/:path*',
        },
      ]
    }
    return []
  },
}

export default nextConfig
