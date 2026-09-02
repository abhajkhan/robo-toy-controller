import type { NextConfig } from "next";

const nextConfig: NextConfig = {
// Configures external image domains for the <Image /> component
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
};

export default nextConfig;
