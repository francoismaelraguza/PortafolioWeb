import { Button } from '../components/Button';
import { site } from '../content/site';
import { stagger } from '../lib/reveal';
import s from './Hero.module.css';

export function Hero() {
  return (
    <section
      id="inicio"
      className={s.hero}
      data-chapter="bg"
      data-shape="fr"
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className={`${s.name} display`} translate="no">
        <span className={`${s.first} ${s.enter}`} data-hero-line>
          {site.firstName}
        </span>{' '}
        <span className={`${s.last} ${s.enter}`} style={stagger(1)} data-hero-line>
          {site.lastName}
        </span>
      </h1>
      <div className={`${s.intro} ${s.enter}`} style={stagger(3)} data-hero-intro>
        <p className={s.tagline}>{site.tagline}</p>
        <div className={s.actions}>
          <Button href="#proyectos">Ver proyectos</Button>
          <a className={s.secondary} href="#contacto">
            Escribime
          </a>
        </div>
      </div>
    </section>
  );
}
