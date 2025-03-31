import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:'./',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://47.109.128.124:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/ws': {
        target: 'ws://47.109.128.124:8080',
        changeOrigin: true,
      }
    }
  }
})
