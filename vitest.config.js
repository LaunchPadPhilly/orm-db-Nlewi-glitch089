import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      include: /.*\.[jt]sx?$/,  // allow react plugin on .js too
    }),
  ],

  // Force Vite/Rollup import-analysis to parse .js as JSX
  esbuild: {
    loader: 'jsx',
    include: /.*\.jsx?$/,
    exclude: [],              // <-- important, fixes "Expression expected" for many cases
    jsx: 'automatic',
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  test: {
    environment: 'jsdom',
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    globals: true,
    setupFiles: './tests/setup.jsx',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
