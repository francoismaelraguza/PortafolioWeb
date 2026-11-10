import { mission, vision } from '../content/about';
import { stagger } from '../lib/reveal';
import s from './Mission.module.css';

export function Mission() {
  return (
    <section
      id="mision-vision"
      className={s.mission}
      data-chapter="bg"
      data-shape="pair"
      data-reveal-group
      aria-label="Misión y visión"
    >
      {[mission, vision].map((item, index) => (
        <article key={item.title} className={s.block}>
          <h2 className={`${s.title} display`} data-reveal style={stagger(index * 3)}>
            {item.title}
          </h2>
          <p className={s.text} data-reveal style={stagger(index * 3 + 1)}>
            {item.text}
          </p>
        </article>
      ))}
    </section>
  );
}
