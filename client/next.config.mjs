/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:2000/api/:path*', // Proxy to Backend
      },
      {
        source: '/auth/google',
        destination: 'http://localhost:2000/auth/google', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;