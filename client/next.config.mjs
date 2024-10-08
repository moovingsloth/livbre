// next.config.mjs
export default {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`, // Proxy to Backend
      },
      {
        source: '/auth/google',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, // Proxy to Backend
      },
      {
        source: '/auth/google/callback',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/callback`, // Proxy to Backend
      },
      {
        source: '/search/book',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/book`, // Proxy to Backend
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};