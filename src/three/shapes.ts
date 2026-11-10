import type { Monogram } from './sampleMonogram';

/**
 * Las formas que toma el cuerpo de partículas, una por capítulo.
 * Cada sección elige la suya con `data-shape`.
 */
export const SHAPES = ['fr', 'field', 'pair', 'grid', 'point'] as const;
export type ShapeName = (typeof SHAPES)[number];

/** Opacidad de las partículas en cada forma: baja donde hay texto encima. */
const SHAPE_OPACITY: Record<ShapeName, number> = {
  fr: 1,
  field: 0.38,
  pair: 0.65,
  grid: 0.45,
  point: 1,
};

/** En móvil el texto ocupa todo el ancho: los dos cuerpos se atenúan para no estorbar la lectura. */
const COMPACT_OPACITY: Partial<Record<ShapeName, number>> = { pair: 0.3, field: 0.32 };

export function shapeOpacity(name: ShapeName, compact: boolean): number {
  return (compact ? COMPACT_OPACITY[name] : undefined) ?? SHAPE_OPACITY[name];
}

export interface ShapeInput {
  count: number;
  /** Ancho y alto visibles en unidades de mundo, a la distancia del origen. */
  width: number;
  height: number;
  /** Composición de móvil. */
  compact: boolean;
  monogram: Monogram;
  /** Dónde cabe el monograma en el inicio: centro y altura de las letras, en unidades de mundo. */
  monogramPlace: { centerX: number; centerY: number; size: number };
}

/** Aleatorio con semilla: las formas salen idénticas en cada redimensionado. */
function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function monogramShape({ count, monogram, monogramPlace }: ShapeInput) {
  const out = new Float32Array(count * 3);
  const random = seeded(11);
  // El hueco libre del inicio se mide en el DOM (heroSpace.ts): al lado del nombre o debajo.
  const { centerX, centerY, size } = monogramPlace;
  const total = monogram.points.length / 2;

  for (let i = 0; i < count; i++) {
    const pick = Math.floor(random() * total) * 2;
    out[i * 3] = centerX + monogram.points[pick] * size + (random() - 0.5) * size * 0.012;
    out[i * 3 + 1] = centerY + monogram.points[pick + 1] * size + (random() - 0.5) * size * 0.012;
    out[i * 3 + 2] = (random() - 0.5) * 0.3;
  }
  return out;
}

function fieldShape({ count, width, height }: ShapeInput) {
  const out = new Float32Array(count * 3);
  const random = seeded(23);
  for (let i = 0; i < count; i++) {
    const depth = random();
    // Cuanto más lejos, más ancho hay que repartir para llenar la pantalla.
    const spread = 1.15 + depth * 0.9;
    out[i * 3] = (random() - 0.5) * width * spread;
    out[i * 3 + 1] = (random() - 0.5) * height * spread;
    out[i * 3 + 2] = 1.5 - depth * 9;
  }
  return out;
}

function pairShape({ count, width, height, compact }: ShapeInput) {
  const out = new Float32Array(count * 3);
  const random = seeded(37);
  const radius = height * 0.15;
  // Dos cuerpos en los huecos que dejan los textos de misión y visión.
  const centers = compact
    ? [
        [width * 0.46, height * 0.3],
        [-width * 0.46, -height * 0.32],
      ]
    : [
        [width * 0.27, height * 0.24],
        [-width * 0.27, -height * 0.26],
      ];

  for (let i = 0; i < count; i++) {
    const [cx, cy] = centers[i % 2];
    // Punto uniforme sobre la superficie de una esfera.
    const u = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const ring = Math.sqrt(1 - u * u);
    out[i * 3] = cx + Math.cos(angle) * ring * radius;
    out[i * 3 + 1] = cy + u * radius;
    out[i * 3 + 2] = Math.sin(angle) * ring * radius;
  }
  return out;
}

function gridShape({ count, width, height }: ShapeInput) {
  const out = new Float32Array(count * 3);
  const columns = Math.ceil(Math.sqrt(count * 2.4));
  const rows = Math.ceil(count / columns);
  // Un suelo de puntos que se aleja hacia el horizonte, con un relieve suave.
  for (let i = 0; i < count; i++) {
    const column = i % columns;
    const row = Math.floor(i / columns);
    const x = (column / (columns - 1) - 0.5) * width * 2.6;
    const z = 4 - (row / Math.max(1, rows - 1)) * 26;
    out[i * 3] = x;
    out[i * 3 + 1] = -height * 0.36 + Math.sin(x * 0.7) * Math.cos(z * 0.45) * 0.22;
    out[i * 3 + 2] = z;
  }
  return out;
}

function pointShape({ count, height, compact }: ShapeInput) {
  const out = new Float32Array(count * 3);
  const random = seeded(53);
  const radius = height * (compact ? 0.07 : 0.1);
  for (let i = 0; i < count; i++) {
    const u = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const ring = Math.sqrt(1 - u * u);
    const r = radius * Math.cbrt(random());
    out[i * 3] = Math.cos(angle) * ring * r;
    out[i * 3 + 1] = height * 0.04 + u * r;
    out[i * 3 + 2] = Math.sin(angle) * ring * r;
  }
  return out;
}

const BUILDERS: Record<ShapeName, (input: ShapeInput) => Float32Array> = {
  fr: monogramShape,
  field: fieldShape,
  pair: pairShape,
  grid: gridShape,
  point: pointShape,
};

/** Posiciones de todas las formas, en el orden de `SHAPES`. */
export function buildShapes(input: ShapeInput): Float32Array[] {
  return SHAPES.map((name) => BUILDERS[name](input));
}

/** Cuatro aleatorios por partícula: fase, velocidad, tamaño y tinte. */
export function buildSeeds(count: number): Float32Array {
  const out = new Float32Array(count * 4);
  const random = seeded(71);
  for (let i = 0; i < out.length; i++) out[i] = random();
  return out;
}
