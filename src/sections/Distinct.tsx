import { distinctions } from '../content/about';
import s from './Distinct.module.css';

export function Distinct() {
  return (
    <section
      id="que-me-distingue"
      className={s.distinct}
      data-field="2"
      data-header-ink="dark"
      aria-labelledby="distinct-title"
    >
      <h2 id="distinct-title" className={s.title}>
        Qué me distingue
      </h2>
      <ul className={s.list}>
        {distinctions.map((item) => (
          <li key={item.title} className={s.row}>
            <h3 className={`${s.line} display`}>{item.title}</h3>
            <p className={s.text}>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
