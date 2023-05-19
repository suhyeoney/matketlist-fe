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
  }
}

module.exports = nextConfig
