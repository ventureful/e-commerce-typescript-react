/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dummyimage.com", "m.media-amazon.com", "cdn.shopify.com"],
  },
};

module.exports = nextConfig;
