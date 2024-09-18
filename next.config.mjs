/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // This will apply the headers to all API routes (anything under /api)
          source: '/api/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
            },
            {
              key: 'Pragma',
              value: 'no-cache',
            },
            {
              key: 'Expires',
              value: '0',
            },
            {
              key: 'Surrogate-Control',
              value: 'no-store',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  