/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:["cdn.shopify.com","tailwindui.com","cdn-icons-png.flaticon.com","images.pexels.com","firebasestorage.googleapis.com"]
  },
  compress:true,
}

module.exports = withBundleAnalyzer(nextConfig,{
  useFileSystemPublicRoutes: false,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return config;
  }
})
