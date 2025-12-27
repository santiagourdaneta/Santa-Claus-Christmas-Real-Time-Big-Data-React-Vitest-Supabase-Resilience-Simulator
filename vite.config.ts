import { defineConfig } from 'vitest/config' 
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/e2e/**'], 
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true }
    }
  },
  server: {
    watch: {
      usePolling: true, // Esto obliga a Vite a revisar cambios manualmente
    },
    hmr: {
      overlay: true, // Muestra los errores directamente en la pantalla
    }
  }
})