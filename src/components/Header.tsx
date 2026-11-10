import { navigation, site } from '../content/site';
import { useChapter } from '../hooks/useChapter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { toggleBackdropPaused, useBackdropPaused } from '../lib/backdropMotion';
import s from './Header.module.css';

interface Props {
  /** Hay escena 3D en marcha: solo entonces tiene sentido ofrecer pausarla. */
  hasBackdrop: boolean;
}

export function Header({ hasBackdrop }: Props) {
  const chapter = useChapter();
  const paused = useBackdropPaused();
  const reducedMotion = useReducedMotion();

  return (
    <header className={s.header} data-on={chapter}>
      <a
        className={`${s.mark} display`}
        href="#inicio"
        aria-label={`${site.name}, ir al inicio`}
        translate="no"
      >
        {site.monogram}
      </a>
      <div className={s.end}>
        <nav aria-label="Principal">
          <ul className={s.links}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a className={s.link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {hasBackdrop && !reducedMotion && (
          <button type="button" className={s.link} onClick={toggleBackdropPaused}>
            {paused ? 'Animar fondo' : 'Pausar fondo'}
          </button>
        )}
      </div>
    </header>
  );
}
