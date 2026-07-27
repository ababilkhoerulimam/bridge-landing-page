/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.BACKEND_API_URL || 'http://localhost:8000/api/v1/:path*',
      },
      {
        source: '/decision/api/v1/:path*',
        destination: process.env.DECISION_INTELLIGENCE_URL || 'http://localhost:8001/decision/api/v1/:path*',
      },
    ]
  },
}

export default nextConfig
