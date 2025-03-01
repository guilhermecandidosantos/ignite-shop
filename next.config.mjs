/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        pathname: '/**',
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  
};

export default nextConfig;
