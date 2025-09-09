/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable scroll restoration to always start at top
  experimental: {
    scrollRestoration: false,
  },
  // Configure image domains
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
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
