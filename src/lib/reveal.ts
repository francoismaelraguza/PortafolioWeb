import { useEffect, type CSSProperties } from 'react';

/** Posición de un elemento dentro del escalonado de su grupo (variable CSS --i). */
export function stagger(index: number): CSSProperties {
  return { '--i': index } as CSSProperties;
}

/**
 * Marca cada grupo `data-reveal-group` con `data-revealed` la primera vez que
 * entra en pantalla; el CSS de global.css hace el resto.
 */
export function useReveals(): void {
  useEffect(() => {
    const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // También se revela lo que ya quedó por encima (al llegar con un ancla, por ejemplo).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            (entry.target as HTMLElement).dataset.revealed = '';
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    groups.forEach((group) => observer.observe(group));
    return () => observer.disconnect();
  }, []);
}
