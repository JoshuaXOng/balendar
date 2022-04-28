import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        target: 'https://rammus.tech/',
        changeOrigin: true,
        secure: true,      
        ws: true,
      }
    }
  }
})
