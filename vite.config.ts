import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://culture-connect-platform-ae65.vercel.app',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
