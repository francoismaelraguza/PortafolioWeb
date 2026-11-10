import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages sirve el sitio en /PortafolioWeb/. Con dominio propio, cambiar a '/'.
export default defineConfig({
  base: '/PortafolioWeb/',
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
});
