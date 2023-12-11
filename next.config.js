/** @type {import('next').NextConfig} */

const path = require('path');
const withVideos = require('next-videos');

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
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
        '@floats': path.resolve(__dirname, 'src/app/floats'),
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
        '@test': path.resolve(__dirname, 'src/app/test'),
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
      { // 2. 네이버 OpenAPI > Profile specific
        source: '/profile/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
      { // 3. 구글 OpenAPI
        source: '/google/:path*',
        destination: 'https://maps.googleapis.com/:path*',
      },
      { // 4. 로컬 백엔드API
        source: '/backend/:path*',
        destination: 'http://localhost:8080/:path*',
      },
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
      { // 2. 네이버 OpenAPI > Profile specific
        source: '/profile/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
      { // 3. 구글 OpenAPI
        source: '/google/:path*',
        destination: 'https://maps.googleapis.com/:path*',
      },
      { // 4. 로컬 백엔드API
        source: '/backend/:path*',
        destination: 'http://localhost:8080/:path*',
      },
    ];
  }
});


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "heyjee",
    project: "matket-list",
    authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
