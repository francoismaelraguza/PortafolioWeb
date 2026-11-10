import { whoIAm, whoIAmClosing } from '../content/about';
import { stagger } from '../lib/reveal';
import s from './About.module.css';

export function About() {
  return (
    <section
      id="sobre-mi"
      className={s.about}
      data-chapter="bg"
      data-shape="field"
      data-reveal-group
      aria-labelledby="about-title"
    >
      <h2 id="about-title" className={s.title} data-reveal>
        Quién soy
      </h2>
      <p className={s.story} data-reveal style={stagger(1)}>
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
