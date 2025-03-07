import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable HMR logging
    hmr: {
      overlay: true,
    },
    // Show server address in console
    host: true,
  },
  // Better error overlay
  clearScreen: false,
  // Log level configuration
  logLevel: process.env.NODE_ENV === 'development' ? 'info' : 'warn',
  // Enable detailed build logging
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react'],
          'chart-vendor': ['recharts'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'utils': ['lodash', 'decimal.js'],
        },
      },
    },
    // Avoid console output in production
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'i18next', 'lodash'],
    exclude: [],
  },
});