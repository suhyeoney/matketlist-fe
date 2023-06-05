/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: false
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
    ];
  }
}

module.exports = nextConfig
