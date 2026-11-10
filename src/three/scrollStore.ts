import { SHAPES, type ShapeName } from './shapes';

interface Anchor {
  top: number;
  bottom: number;
  shape: number;
}

/** Tramo de la pantalla (en alturas de ventana) durante el que una forma se convierte en la siguiente. */
const BLEND = 0.7;

let anchors: Anchor[] = [];

const smoothstep = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

/** Lee del DOM dónde empieza y acaba cada capítulo. Llamar al montar y al cambiar el layout. */
export function measureAnchors(): void {
  const scrollY = window.scrollY;
  anchors = Array.from(document.querySelectorAll<HTMLElement>('[data-shape]')).map((element) => {
    const rect = element.getBoundingClientRect();
    const index = SHAPES.indexOf(element.dataset.shape as ShapeName);
    return {
      top: rect.top + scrollY,
      bottom: rect.bottom + scrollY,
      shape: index < 0 ? 0 : index,
    };
  });
}

/**
 * Escribe en `out` cuánto pesa cada forma para la posición de scroll actual.
 * Cada forma se mantiene mientras su capítulo ocupa el centro de la pantalla y
 * se mezcla con la vecina cuando la frontera entre ambos cruza ese centro.
 * Con `snap`, el cambio es instantáneo (movimiento reducido).
 */
export function readWeights(out: Float32Array, snap: boolean): void {
  out.fill(0);
  if (!anchors.length) {
    out[0] = 1;
    return;
  }

  const viewport = window.innerHeight || 1;
  const center = window.scrollY + viewport / 2;

  let index = anchors.findIndex((anchor) => center >= anchor.top && center < anchor.bottom);
  if (index < 0) index = center < anchors[0].top ? 0 : anchors.length - 1;

  const current = anchors[index];
  const half = (viewport * BLEND) / 2;
  const next = anchors[index + 1];
  const previous = anchors[index - 1];

  let other: Anchor | undefined;
  let mix = 0;

  if (next && center > current.bottom - half) {
    other = next;
    mix = (center - (current.bottom - half)) / (half * 2);
  } else if (previous && center < current.top + half) {
    other = previous;
    mix = (current.top + half - center) / (half * 2);
  }

  if (!other || other.shape === current.shape) {
    out[current.shape] = 1;
    return;
  }

  const amount = snap ? Math.round(mix) : smoothstep(mix);
  out[current.shape] += 1 - amount;
  out[other.shape] += amount;
}
