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

  // rewrites() : 3rd party API CORS 에러 해소를 위한 프록시 설정
  async rewrites() {
    return [
      // { // 1. 네이버 OpenAPI
      //   source: '/:path*',
      //   destination: 'https://openapi.naver.com/:path*',
      // },
      { // 2. 구글 OpenAPI
        source: '/:path*',
        destination: 'https://maps.googleapis.com/:path*',
      }
    ];
  }
}

module.exports = nextConfig
