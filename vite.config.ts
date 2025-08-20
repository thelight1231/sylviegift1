import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base is set for proper asset loading
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false, // Disable sourcemaps for production
    minify: 'terser', // Use terser for better minification
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
  },
  server: {
    port: 3000,
    open: true
  }
});
