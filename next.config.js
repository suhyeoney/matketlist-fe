/** @type {import('next').NextConfig} */

const path = require('path');
const withVideos = require('next-videos');

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.(mov|mp4)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    });

    config.resolve = {
      alias: {
        '@animations': path.resolve(__dirname, 'src/app/animations'),
        '@api': path.resolve(__dirname, 'src/app/api'),
        '@assets': path.resolve(__dirname, 'src/app/assets'),
        '@dataTypes': path.resolve(__dirname, 'src/app/dataTypes'),
        '@hashtags': path.resolve(__dirname, 'src/app/hashtags'),
        '@hooks': path.resolve(__dirname, 'src/app/hooks'),
        '@main': path.resolve(__dirname, 'src/app/main'),
        '@modals': path.resolve(__dirname, 'src/app/modals'),
        '@services': path.resolve(__dirname, 'src/app/services'),
        '@signIn': path.resolve(__dirname, 'src/app/signIn'),
        '@sliders': path.resolve(__dirname, 'src/app/sliders'),
        '@spinners': path.resolve(__dirname, 'src/app/spinners'),
        '@store': path.resolve(__dirname, 'src/app/store'),
        '@tables': path.resolve(__dirname, 'src/app/tables'),
        '@utils': path.resolve(__dirname, 'src/app/utils'),
      },
      ...config.resolve
    };
    return config;
  },

  // rewrites() : 3rd party API CORS 에러 해소를 위한 프록시 설정
  rewrites: async () => {
    return [
      { // 1. 네이버 OpenAPI
        source: '/naver/:path*',
        destination: 'https://nid.naver.com/:path*',
      },
      { // 2. 구글 OpenAPI
        source: '/google/:path*',
        destination: 'https://maps.googleapis.com/:path*',
      }
    ];
  }
}

module.exports = nextConfig;
module.exports = withVideos({
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/signIn',
        permanent: false
      }
    ]
  },
  rewrites: async () => {
    return [
      { // 1. 네이버 OpenAPI
        source: '/naver/:path*',
        destination: 'https://nid.naver.com/:path*',
      },
      { // 2. 구글 OpenAPI
        source: '/google/:path*',
        destination: 'https://maps.googleapis.com/:path*',
      }
    ];
  }
});
