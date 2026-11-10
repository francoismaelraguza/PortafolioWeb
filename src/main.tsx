import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/anton/400.css';
import '@fontsource-variable/work-sans/wght.css';
// Variante B (solo para comparar; se elimina al elegir variante)
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/600.css';
import './styles/global.css';
import { App } from './App';

// Variante B con ?v=b (solo para comparar; se elimina al elegir variante)
if (new URLSearchParams(window.location.search).get('v') === 'b') {
  document.documentElement.dataset.variant = 'b';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
