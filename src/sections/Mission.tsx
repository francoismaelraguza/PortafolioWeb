import { mission, vision } from '../content/about';
import s from './Mission.module.css';

export function Mission() {
  return (
    <section
      id="mision-vision"
      className={s.mission}
      data-header-ink="light"
      aria-label="Misión y visión"
    >
      {[mission, vision].map((item) => (
        <article key={item.title} className={s.block}>
          <h2 className={`${s.title} display`}>{item.title}</h2>
          <p className={s.text}>{item.text}</p>
        </article>
      ))}
    </section>
  );
}
