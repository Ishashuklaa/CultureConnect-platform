import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  base: 'https://culture-connect-platform-8hbg.vercel.app',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
