// vite.config.client.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',       // Client output directory
    emptyOutDir: true,           // Only clear the client directory
    rollupOptions: {
      input: 'index.html',       // Client entry point
    },
  },
});
