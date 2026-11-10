import { useEffect, useState } from 'react';

/** Fondo del capítulo: el de la página o uno de los dos campos de color. */
export type Chapter = 'bg' | 'field-1' | 'field-2';

const isChapter = (value: string | undefined): value is Chapter =>
  value === 'bg' || value === 'field-1' || value === 'field-2';

/**
 * Devuelve el capítulo que pasa por debajo de la cabecera fija, para que la
 * barra tome su fondo y su tinta. Cada capítulo se declara con `data-chapter`.
 */
export function useChapter(headerLine = 32): Chapter {
  const [chapter, setChapter] = useState<Chapter>('bg');

  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
    if (!chapters.length) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      for (const element of chapters) {
        const { top, bottom } = element.getBoundingClientRect();
        if (top <= headerLine && bottom > headerLine) {
          const value = element.dataset.chapter;
          setChapter(isChapter(value) ? value : 'bg');
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

  return chapter;
}
