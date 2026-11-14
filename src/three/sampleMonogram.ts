export interface Monogram {
  /** Pares x, y normalizados: la altura de las letras mide 1 y el centro es el origen. */
  points: Float32Array;
  /** Ancho ÷ alto del texto muestreado. */
  aspect: number;
}

const FONT = '700 320px "Barlow Condensed", "Arial Narrow", Arial, sans-serif';

/**
 * Dibuja el monograma en un lienzo 2D con la tipografía de titulares y devuelve
 * los píxeles rellenos como puntos: de ahí salen las partículas del inicio.
 */
export async function sampleMonogram(text: string): Promise<Monogram> {
  // Sin la fuente cargada el lienzo dibujaría la de reserva.
  await document.fonts.load(FONT, text).catch(() => undefined);

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return { points: new Float32Array([0, 0]), aspect: 1 };

  context.font = FONT;
  const metrics = context.measureText(text);
  const ascent = Math.ceil(metrics.actualBoundingBoxAscent);
  const descent = Math.ceil(metrics.actualBoundingBoxDescent);
  const left = Math.ceil(metrics.actualBoundingBoxLeft);
  const width = Math.max(1, left + Math.ceil(metrics.actualBoundingBoxRight));
  const height = Math.max(1, ascent + descent);

  canvas.width = width;
  canvas.height = height;
  context.font = FONT;
  context.fillStyle = '#fff';
  context.fillText(text, left, ascent);

  const { data } = context.getImageData(0, 0, width, height);
  const step = 2;
  const points: number[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (data[(y * width + x) * 4 + 3] > 128) {
        points.push((x - width / 2) / height, (height / 2 - y) / height);
      }
    }
  }

  if (!points.length) return { points: new Float32Array([0, 0]), aspect: 1 };
  return { points: new Float32Array(points), aspect: width / height };
}
