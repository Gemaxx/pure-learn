import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5115/api/:path*", // Proxy للـ Backend
      },
    ];
  },
};

export default nextConfig;


