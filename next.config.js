/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable scroll restoration to always start at top
  experimental: {
    scrollRestoration: false,
  },
  // Configure image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // Enable source maps for better debugging
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'cheap-module-source-map'
    }
    return config
  },
}

module.exports = nextConfig
