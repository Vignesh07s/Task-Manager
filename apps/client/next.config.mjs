/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://task-manager-server-of9j.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
