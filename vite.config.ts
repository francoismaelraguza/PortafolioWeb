import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const BASE = '/PortafolioWeb/';

/** Las dos fuentes que pinta el primer pantallazo: titular y texto, subconjunto latino. */
const CRITICAL_FONTS = [
  /barlow-condensed-latin-700-normal-[\w-]+\.woff2$/,
  /barlow-latin-400-normal-[\w-]+\.woff2$/,
];

/**
 * Añade <link rel="preload"> para las fuentes críticas en el HTML de producción,
 * para que el nombre del inicio no espere a que se descargue y analice el CSS.
 */
function preloadCriticalFonts(): Plugin {
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, context) {
        const files = Object.keys(context.bundle ?? {});
        return files
          .filter((file) => CRITICAL_FONTS.some((pattern) => pattern.test(file)))
          .map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: BASE + file,
              crossorigin: '',
            },
            injectTo: 'head' as const,
          }));
      },
    },
  };
}

// GitHub Pages sirve el sitio en /PortafolioWeb/. Con dominio propio, cambiar BASE a '/'.
export default defineConfig({
  base: BASE,
  plugins: [react(), preloadCriticalFonts()],
  // Una sola copia de React aunque Vite reoptimice dependencias en caliente.
  resolve: { dedupe: ['react', 'react-dom'] },
  optimizeDeps: { include: ['react', 'react-dom', 'three', '@react-three/fiber'] },
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  // three.js entero pesa ~900 kB (≈250 kB con gzip) y va en su propio trozo, cargado en diferido.
  build: { chunkSizeWarningLimit: 1000 },
});
