import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist/server',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/entry-server.jsx',
    },
  },
  ssr: {
    noExternal: ['react', 'react-dom'],
  },
});
