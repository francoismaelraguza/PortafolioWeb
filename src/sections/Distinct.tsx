import { distinctions } from '../content/about';
import { stagger } from '../lib/reveal';
import s from './Distinct.module.css';

export function Distinct() {
  return (
    <section
      id="que-me-distingue"
      className={s.distinct}
      data-field="2"
      data-chapter="field-2"
      data-shape="field"
      data-reveal-group
      aria-labelledby="distinct-title"
    >
      <h2 id="distinct-title" className={s.title} data-reveal>
        Qué me distingue
      </h2>
      <ul className={s.list}>
        {distinctions.map((item, index) => (
          <li key={item.title} className={s.row} data-reveal style={stagger(index + 1)}>
            <h3 className={`${s.line} display`}>{item.title}</h3>
            <p className={s.text}>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
