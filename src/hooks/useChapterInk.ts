import { useEffect, useState } from 'react';

export type Ink = 'light' | 'dark';

/**
 * Devuelve la tinta que debe usar la cabecera fija según el capítulo que pasa
 * por debajo: 'light' sobre fondo oscuro, 'dark' sobre un campo claro.
 * Cada capítulo declara la suya con `data-header-ink`.
 */
export function useChapterInk(headerLine = 36): Ink {
  const [ink, setInk] = useState<Ink>('light');

  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-header-ink]'));
    if (!chapters.length) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      for (const chapter of chapters) {
        const { top, bottom } = chapter.getBoundingClientRect();
        if (top <= headerLine && bottom > headerLine) {
          setInk(chapter.dataset.headerInk === 'dark' ? 'dark' : 'light');
          return;
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [headerLine]);

  return ink;
}
