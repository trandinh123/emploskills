import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return ({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL ?? 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
      cors: false,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setupTests.ts'],
      exclude: ['**/node_modules/**'],
      coverage: {
        include: ['src/**'],
      },
    }
  })
})
