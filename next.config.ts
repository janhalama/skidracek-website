import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/images/original/logo.png' },
    ];
  },
};

export default nextConfig;
