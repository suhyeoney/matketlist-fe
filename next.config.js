/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  webpack(config, { webpack }) {
    config.resolve = {
      alias: {
        '@api': path.resolve(__dirname, 'src/app/api'),
        '@assets': path.resolve(__dirname, 'src/app/assets'),
        '@dataTypes': path.resolve(__dirname, 'src/app/dataTypes'),
        '@features': path.resolve(__dirname, 'src/app/features'),
        '@hooks': path.resolve(__dirname, 'src/app/hooks'),
        '@main': path.resolve(__dirname, 'src/app/main'),
        '@modals': path.resolve(__dirname, 'src/app/modals'),
        '@services': path.resolve(__dirname, 'src/app/services'),
        '@spinners': path.resolve(__dirname, 'src/app/spinners'),
        '@store': path.resolve(__dirname, 'src/app/store'),
        '@tables': path.resolve(__dirname, 'src/app/tables'),
        '@utils': path.resolve(__dirname, 'src/app/utils'),
      },
      ...config.resolve
    };
    return config;
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
