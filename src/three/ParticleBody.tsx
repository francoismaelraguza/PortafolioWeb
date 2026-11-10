import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { boxKey, measureHeroSpace } from './heroSpace';
import { CAMERA, COMPACT_WIDTH, DEGRADE, particleCount } from './quality';
import type { Monogram } from './sampleMonogram';
import { measureAnchors, readWeights } from './scrollStore';
import { buildSeeds, buildShapes, shapeOpacity, SHAPES } from './shapes';

const vertexShader = /* glsl */ `
  attribute vec3 aShape0;
  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute vec3 aShape3;
  attribute vec3 aShape4;
  attribute vec4 aSeed; // fase, velocidad, tamaño, tinte

  uniform float uWeights[5];
  uniform float uTime;
  uniform float uDrift;
  uniform float uTravel;
  uniform vec2 uPointer;
  uniform float uPointerForce;
  uniform float uPointerRadius;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uOpacity;

  varying float vTint;
  varying float vAlpha;

  void main() {
    vec3 position =
      aShape0 * uWeights[0] + aShape1 * uWeights[1] + aShape2 * uWeights[2] +
      aShape3 * uWeights[3] + aShape4 * uWeights[4];

    // De una forma a otra, cada partícula toma su propio arco en profundidad.
    position.z += (aSeed.x - 0.5) * uTravel * 2.4;
    position.xy += (aSeed.yz - 0.5) * uTravel * 0.8;

    // Deriva en reposo.
    float phase = aSeed.x * 6.2831853;
    float speed = 0.35 + aSeed.y * 0.5;
    position.xy += vec2(sin(uTime * speed + phase), cos(uTime * speed * 0.8 + phase * 2.0)) * uDrift;

    // El puntero aparta las partículas cercanas.
    vec2 away = position.xy - uPointer;
    float distanceToPointer = length(away);
    float push = smoothstep(uPointerRadius, 0.0, distanceToPointer) * uPointerForce;
    position.xy += (away / max(distanceToPointer, 0.0001)) * push;

    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uSize * mix(0.7, 1.5, aSeed.z) * uPixelRatio * (${CAMERA.distance.toFixed(1)} / -viewPosition.z);

    vTint = aSeed.w;
    // Lo lejano se apaga para que el suelo de puntos se pierda en el horizonte.
    vAlpha = uOpacity * smoothstep(-30.0, -13.0, viewPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;

  varying float vTint;
  varying float vAlpha;

  void main() {
    // Disco plano: sin halo ni desenfoque, solo un borde suavizado.
    float radius = length(gl_PointCoord - 0.5);
    float disc = 1.0 - smoothstep(0.4, 0.5, radius);
    if (disc <= 0.0) discard;
    vec3 color = mix(uInk, uAccent, step(0.62, vTint));
    gl_FragColor = vec4(color, disc * vAlpha);
    // Los colores de los tokens son sRGB: sin esto se verían más oscuros.
    #include <colorspace_fragment>
  }
`;

function tokenColor(name: string, fallback: string): THREE.Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(value || fallback);
}

interface Props {
  monogram: Monogram;
  /** Sin animación continua: movimiento reducido o fondo en pausa. */
  still: boolean;
}

export function ParticleBody({ monogram, still }: Props) {
  const { viewport, size, gl, invalidate } = useThree();
  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);

  const compact = size.width < COMPACT_WIDTH;
  const count = particleCount(size.width);

  // Redondear evita reconstruir la geometría por cambios de medio píxel.
  const width = Math.round(viewport.width * 100) / 100;
  const height = Math.round(viewport.height * 100) / 100;

  // Hueco libre del inicio, medido en el DOM. Se guarda como clave de texto para
  // que solo cambie (y reconstruya la geometría) cuando la caja cambia de verdad.
  const [heroSpace, setHeroSpace] = useState(() => boxKey(measureHeroSpace()));

  const monogramPlace = useMemo(() => {
    const [left, top, right, bottom] = heroSpace ? heroSpace.split(',').map(Number) : [];
    if (right === undefined || !size.width || !size.height) {
      return { centerX: width * 0.28, centerY: 0, size: height * 0.4 };
    }
    const unit = width / size.width; // píxeles → unidades de mundo
    const boxWidth = Math.max(0, right - left) * unit;
    const boxHeight = Math.max(0, bottom - top) * unit;
    return {
      centerX: ((left + right) / 2 / size.width - 0.5) * width,
      centerY: (0.5 - (top + bottom) / 2 / size.height) * height,
      size: Math.min(boxHeight * 0.82, (boxWidth * 0.88) / monogram.aspect, height * 0.5),
    };
  }, [heroSpace, width, height, size.width, size.height, monogram.aspect]);

  const geometry = useMemo(() => {
    const shapes = buildShapes({ count, width, height, compact, monogram, monogramPlace });
    const buffer = new THREE.BufferGeometry();
    // three.js exige un atributo "position"; la posición real se calcula en el shader.
    buffer.setAttribute('position', new THREE.BufferAttribute(shapes[0], 3));
    shapes.forEach((shape, index) => {
      buffer.setAttribute(`aShape${index}`, new THREE.BufferAttribute(shape, 3));
    });
    buffer.setAttribute('aSeed', new THREE.BufferAttribute(buildSeeds(count), 4));
    // Las partículas se mueven en el shader: el recorte por caja no sirve.
    buffer.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1000);
    return buffer;
  }, [count, width, height, compact, monogram, monogramPlace]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          uWeights: { value: new Float32Array([1, 0, 0, 0, 0]) },
          uTime: { value: 0 },
          uDrift: { value: 0 },
          uTravel: { value: 0 },
          uPointer: { value: new THREE.Vector2(999, 999) },
          uPointerForce: { value: 0 },
          uPointerRadius: { value: 1.1 },
          uSize: { value: 2.6 },
          uPixelRatio: { value: 1 },
          uOpacity: { value: 1 },
          uInk: { value: tokenColor('--ink', '#e9edf3') },
          uAccent: { value: tokenColor('--accent', '#5a9bfc') },
        },
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  // Estado que cambia en cada fotograma: fuera de React para no provocar renders.
  const motion = useRef({
    target: new Float32Array(SHAPES.length),
    pointer: new THREE.Vector2(999, 999),
    pointerActive: 0,
    frames: 0,
    elapsed: 0,
    degraded: false,
  });

  // Dónde está cada capítulo: se vuelve a medir cuando cambia el alto del documento.
  useEffect(() => {
    const measure = () => {
      measureAnchors();
      setHeroSpace(boxKey(measureHeroSpace()));
      invalidate();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    // El ancho del nombre cambia cuando su tipografía sustituye a la de reserva:
    // se observan las propias líneas y, por si acaso, los eventos de carga de fuentes.
    document
      .querySelectorAll('[data-hero-line], [data-hero-intro]')
      .forEach((element) => observer.observe(element));
    document.fonts.ready.then(measure);
    document.fonts.addEventListener('loadingdone', measure);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener('loadingdone', measure);
    };
  }, [invalidate]);

  // En modo quieto solo se dibuja cuando cambia el scroll (y una vez al entrar en él).
  useEffect(() => {
    if (!still) return;
    invalidate();
    const onScroll = () => invalidate();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [still, invalidate]);

  // El lienzo no recibe eventos (está detrás del contenido): se escucha la ventana.
  useEffect(() => {
    if (still) return;
    const state = motion.current;

    const onMove = (event: PointerEvent) => {
      state.pointer.set(
        (event.clientX / window.innerWidth - 0.5) * viewport.width,
        (0.5 - event.clientY / window.innerHeight) * viewport.height,
      );
      state.pointerActive = 1;
    };
    const onLeave = () => {
      state.pointerActive = 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    window.addEventListener('pointerup', onLeave, { passive: true });
    window.addEventListener('pointercancel', onLeave, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      window.removeEventListener('pointerup', onLeave);
      window.removeEventListener('pointercancel', onLeave);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [still, viewport.width, viewport.height]);

  useFrame((_, delta) => {
    // Los uniforms se leen del objeto montado (ref): lo creado con useMemo no se muta.
    const mesh = points.current;
    if (!mesh) return;
    const state = motion.current;
    const uniforms = mesh.material.uniforms;
    const weights = uniforms.uWeights.value as Float32Array;

    readWeights(state.target, still);

    // Amortiguación independiente de los fps.
    const ease = still ? 1 : 1 - Math.exp(-delta * 5);
    let peak = 0;
    let opacity = 0;
    for (let i = 0; i < weights.length; i++) {
      weights[i] += (state.target[i] - weights[i]) * ease;
      peak = Math.max(peak, weights[i]);
      opacity += weights[i] * shapeOpacity(SHAPES[i], compact);
    }

    uniforms.uOpacity.value = opacity;
    uniforms.uTravel.value = still ? 0 : (1 - peak) * 2;
    uniforms.uPixelRatio.value = gl.getPixelRatio();

    if (still) {
      uniforms.uDrift.value = 0;
      uniforms.uPointerForce.value = 0;
      return;
    }

    uniforms.uTime.value += delta;
    uniforms.uDrift.value = 0.035;
    (uniforms.uPointer.value as THREE.Vector2).lerp(state.pointer, 1 - Math.exp(-delta * 10));
    uniforms.uPointerForce.value +=
      (state.pointerActive * 0.55 - uniforms.uPointerForce.value) * (1 - Math.exp(-delta * 4));

    // Si el equipo no llega, se baja la densidad de píxeles y se dibuja la mitad.
    if (!state.degraded && state.frames < DEGRADE.sampleFrames) {
      state.frames += 1;
      state.elapsed += delta;
      if (state.frames === DEGRADE.sampleFrames) {
        if (state.elapsed / state.frames > DEGRADE.maxFrameTime) {
          state.degraded = true;
          gl.setPixelRatio(1);
          mesh.geometry.setDrawRange(0, Math.floor(count / 2));
        }
      }
    }
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
