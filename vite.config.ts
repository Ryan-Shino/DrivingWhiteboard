import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // <--- THIS LINE IS MANDATORY
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  }
})