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
        rewrite: (path) => path.replace(/^\/tt247/, ''),
      },
    },
  },
})