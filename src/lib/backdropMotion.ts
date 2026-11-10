import { useSyncExternalStore } from 'react';

/*
 * Preferencia "fondo en pausa". El fondo de partículas se mueve sin parar, así
 * que la persona debe poder detenerlo (WCAG 2.2.2). Se recuerda entre visitas.
 */
const STORAGE_KEY = 'fondo-en-pausa';
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

let paused = read();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleBackdropPaused(): void {
  paused = !paused;
  try {
    localStorage.setItem(STORAGE_KEY, paused ? '1' : '0');
  } catch {
    // Sin almacenamiento (modo privado): la preferencia dura lo que dure la visita.
  }
  listeners.forEach((listener) => listener());
}

export function useBackdropPaused(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => paused,
    () => false,
  );
}
