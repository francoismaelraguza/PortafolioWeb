import { navigation, site } from '../content/site';
import { stagger } from '../lib/reveal';
import s from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  // Si el correo no cabe en la columna, se parte justo después de la arroba.
  const [emailUser, emailDomain] = site.links.email.split('@');

  return (
    <footer className={s.footer} data-chapter="bg" data-shape="point" data-reveal-group>
      <div className={s.columns} data-reveal>
        <div>
          <h2 className={s.heading}>{site.name}</h2>
          <p className={s.note}>{site.role}</p>
        </div>
        <nav aria-label="Pie de página">
          <h2 className={s.heading}>Secciones</h2>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a className={s.link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className={s.heading}>Redes</h2>
          <ul>
            <li>
              <a className={s.link} href={site.links.github} rel="noreferrer" target="_blank">
                GitHub<span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
            <li>
              <a className={s.link} href={site.links.linkedin} rel="noreferrer" target="_blank">
                LinkedIn<span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={s.heading}>Contacto</h2>
          <ul>
            <li>
              <a className={s.link} href={`mailto:${site.links.email}`} translate="no">
                <span>
                  {emailUser}@<wbr />
                  {emailDomain}
                </span>
              </a>
            </li>
            <li>
              <a className={s.link} href={site.repoUrl} rel="noreferrer" target="_blank">
                Código de este sitio<span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={s.close} data-reveal style={stagger(2)}>
        <svg className={s.wordmark} viewBox="0 0 1000 172" role="img" aria-label={site.name}>
          <text
            x="0"
            y="168"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className={`${s.wordmarkText} display`}
          >
            {site.name}
          </text>
        </svg>
        <p className={s.legal}>
          © {year} {site.name}. Hecho con React y Three.js.
        </p>
      </div>
    </footer>
  );
}
