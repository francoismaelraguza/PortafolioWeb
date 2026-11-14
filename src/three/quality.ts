/* Presupuesto de rendimiento de la escena. */

export const CAMERA = { fov: 35, distance: 10 } as const;

/** Límite de densidad de píxeles: por encima de 1.75 el coste no se nota en pantalla. */
export const DPR_RANGE: [number, number] = [1, 1.75];

/** Por debajo de este ancho la composición es la de móvil. */
export const COMPACT_WIDTH = 900;

export function particleCount(viewportWidth: number): number {
  return viewportWidth < COMPACT_WIDTH ? 3600 : 9000;
}

/** Si la media de los primeros fotogramas baja de ~40 fps, la escena se aligera. */
export const DEGRADE = { sampleFrames: 90, maxFrameTime: 1 / 40 } as const;

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
