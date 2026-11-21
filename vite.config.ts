import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/tt247': {
        target: 'https://thethao247.vn',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/tt247/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {

            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('sec-fetch-site');
            proxyReq.removeHeader('sec-fetch-mode');
            proxyReq.removeHeader('sec-fetch-dest');

            proxyReq.setHeader('Referer', 'https://thethao247.vn/');
            proxyReq.setHeader(
                'User-Agent',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            );
            proxyReq.setHeader(
                'Accept',
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            );
          });
        },
      },
    },
  },
})