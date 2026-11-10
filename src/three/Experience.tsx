import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { site } from '../content/site';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useBackdropPaused } from '../lib/backdropMotion';
import { ParticleBody } from './ParticleBody';
import { CAMERA, DPR_RANGE } from './quality';
import { sampleMonogram, type Monogram } from './sampleMonogram';

/** La escena completa: un único cuerpo de partículas detrás del contenido. */
export default function Experience() {
  const reducedMotion = useReducedMotion();
  const paused = useBackdropPaused();
  // Quieta: sin deriva ni puntero, y solo se redibuja cuando cambia el scroll.
  const still = reducedMotion || paused;
  const [monogram, setMonogram] = useState<Monogram | null>(null);

  useEffect(() => {
    let cancelled = false;
    sampleMonogram(site.monogram).then((result) => {
      if (!cancelled) setMonogram(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!monogram) return null;

  return (
    <Canvas
      camera={{ fov: CAMERA.fov, position: [0, 0, CAMERA.distance], near: 0.1, far: 60 }}
      dpr={DPR_RANGE}
      flat
      frameloop={still ? 'demand' : 'always'}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      // El lienzo es decorativo y queda detrás: ni eventos de R3F ni foco.
      events={undefined}
      tabIndex={-1}
    >
      <ParticleBody monogram={monogram} still={still} />
    </Canvas>
  );
}
