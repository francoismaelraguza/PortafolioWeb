import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/600.css';
import './styles/global.css';
import { App } from './App';

// Las entradas solo ocultan contenido si el script está en marcha para mostrarlo.
document.documentElement.classList.add('reveal-ready');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
