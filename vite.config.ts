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
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://thethao247.vn/',
        },
      },
    },
  },
})
