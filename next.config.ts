import type { NextConfig } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set')
}

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
    return [
      {
        source: '/core/v1/:path*',
        destination: `${API_URL}/core/v1/:path*`,
      },
      {
        source: '/core/v2/:path*',
        destination: `${API_URL}/core/v2/:path*`,
      },
      {
        source: '/core-report/:path*',
        destination: `${API_URL}/core-report/:path*`,
      },
      {
        source: '/core-document/:path*',
        destination: `${API_URL}/core-document/:path*`,
      },
      {
        source: '/core-analytics/v1/:path*',
        destination: `${API_URL}/core-analytics/v1/:path*`,
      },
    ]
  },
}

export default nextConfig
