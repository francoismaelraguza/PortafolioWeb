import { whoIAm, whoIAmClosing } from '../content/about';
import s from './About.module.css';

export function About() {
  return (
    <section
      id="sobre-mi"
      className={s.about}
      data-header-ink="light"
      aria-labelledby="about-title"
    >
      <h2 id="about-title" className={s.title}>
        Quién soy
      </h2>
      <p className={s.story}>
        {whoIAm.map((segment, index) => {
          if (segment.strong) return <strong key={index}>{segment.text}</strong>;
          if (segment.mark) {
            return (
              <mark key={index} className={s.mark} data-mark={segment.mark}>
                {segment.text}
              </mark>
            );
          }
          return segment.text;
        })}{' '}
        <a className={s.closing} href="#contacto">
          {whoIAmClosing}
        </a>
      </p>
    </section>
  );
}
