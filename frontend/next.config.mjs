/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Avoid blocking production deployments on Vercel over lint warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Strict TypeScript checks remain active
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    // Suppress Webpack filesystem packfile caching warnings on Windows
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

export default nextConfig;
