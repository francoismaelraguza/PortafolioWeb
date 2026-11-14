/*
 * Mide en el DOM el hueco que deja libre el texto del inicio, para colocar ahí
 * el monograma de partículas sin pisar el nombre en ningún tamaño de pantalla.
 */

export interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const HEADER = 60;
const GAP = 32;

const area = (box: Box) => Math.max(0, box.right - box.left) * Math.max(0, box.bottom - box.top);

/** Caja libre en píxeles (con el scroll arriba del todo), o `null` si aún no hay inicio. */
export function measureHeroSpace(): Box | null {
  const lines = document.querySelectorAll<HTMLElement>('[data-hero-line]');
  const intro = document.querySelector<HTMLElement>('[data-hero-intro]');
  if (!lines.length || !intro) return null;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  if (!viewportWidth || !viewportHeight) return null;

  const scrollY = window.scrollY;
  const margin = intro.getBoundingClientRect().left;
  let textRight = intro.getBoundingClientRect().right;
  for (const line of lines) textRight = Math.max(textRight, line.getBoundingClientRect().right);
  const textBottom = intro.getBoundingClientRect().bottom + scrollY;

  // Dos candidatos: a la derecha del nombre, o debajo de la frase y los botones.
  const beside: Box = {
    left: textRight + GAP,
    top: HEADER + GAP,
    right: viewportWidth - margin,
    bottom: viewportHeight - GAP,
  };
  const below: Box = {
    left: margin,
    top: textBottom + GAP,
    right: viewportWidth - margin,
    bottom: viewportHeight - GAP / 2,
  };

  return area(beside) >= area(below) ? beside : below;
}

/** Clave estable para saber si la caja ha cambiado de verdad (redondeada a 4 px). */
export function boxKey(box: Box | null): string {
  if (!box) return '';
  return [box.left, box.top, box.right, box.bottom]
    .map((value) => Math.round(value / 4) * 4)
    .join(',');
}
