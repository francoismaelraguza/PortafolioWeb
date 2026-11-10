import { navigation, site } from '../content/site';
import { useChapterInk } from '../hooks/useChapterInk';
import s from './Header.module.css';

export function Header() {
  const ink = useChapterInk();

  return (
    <header className={s.header} data-ink={ink}>
      <a className={`${s.mark} display`} href="#inicio" aria-label={`${site.name}, ir al inicio`}>
        {site.monogram}
      </a>
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
    </header>
  );
}
