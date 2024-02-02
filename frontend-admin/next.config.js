/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ENV: process.env.ENV,
  },
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://admin.cockoil.com/__/auth/:path*`,
      },
    ];
  },
};
module.exports = nextConfig;
