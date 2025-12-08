// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // можно через domains:
    domains: ['rkcdn.ru'],

    // или более гибко через remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'rkcdn.ru',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
