
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// Fix: added import for fileURLToPath to define __dirname in ESM environment
import { fileURLToPath } from 'url';

// Fix: define __dirname for ES modules environment
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Fix: __dirname is now correctly defined above
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
