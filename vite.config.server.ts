// vite.config.server.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/entry-server.jsx', // Server entry point for SSR
    outDir: 'dist/server',       // Server output directory
    emptyOutDir: true,           // Clear only the server directory
    rollupOptions: {
      input: 'src/entry-server.jsx', // Server entry file
    },
  },
  ssr: {
    noExternal: ['react', 'react-dom'],
  },
});
