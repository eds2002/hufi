/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["cdn.shopify.com","tailwindui.com","cdn-icons-png.flaticon.com","images.pexels.com"]
  }
}

module.exports = nextConfig
