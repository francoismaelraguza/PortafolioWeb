import { Button } from '../components/Button';
import { site } from '../content/site';
import s from './Hero.module.css';

export function Hero() {
  return (
    <section id="inicio" className={s.hero} data-header-ink="light" aria-labelledby="hero-title">
      <h1 id="hero-title" className={`${s.name} display`}>
        <span className={s.first}>{site.firstName}</span>{' '}
        <span className={s.last}>{site.lastName}</span>
      </h1>
      <div className={s.intro}>
        <p className={s.tagline}>{site.tagline}</p>
        <div className={s.actions}>
          <Button href="#proyectos">Ver proyectos</Button>
          <a className={s.secondary} href="#contacto">
            Escríbeme
          </a>
        </div>
      </div>
    </section>
  );
}
