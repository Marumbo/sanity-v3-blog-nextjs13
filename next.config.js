/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["https://marumbopoetry.com", "cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "marumbopoetry.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};
