/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:2000/api/:path*', // 백엔드 서버 URL로 변경
        },
      ];
    },
  };
  
  export default nextConfig;