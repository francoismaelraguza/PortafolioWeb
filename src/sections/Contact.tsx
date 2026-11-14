import { ContactForm } from '../components/ContactForm';
import { contact } from '../content/contact';
import { site } from '../content/site';
import s from './Contact.module.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;

export function Contact() {
  return (
    <section
      id="contacto"
      className={s.contact}
      data-field="1"
      data-chapter="field-1"
      data-shape="point"
      data-reveal-group
      aria-labelledby="contact-title"
    >
      {/* El formulario es un cupón recortable: muescas arriba y abajo y una línea de puntos. */}
      <div className={s.coupon} data-reveal>
        <div className={s.stub}>
          <h2 id="contact-title" className={`${s.title} display`}>
            {contact.title}
          </h2>
          <div className={s.aside}>
            <p>{contact.note}</p>
            <ul className={s.links}>
              <li>
                <a className={s.link} href={`mailto:${site.links.email}`}>
                  {site.links.email}
                </a>
              </li>
              <li>
                <a className={s.link} href={site.links.github} {...external}>
                  GitHub<span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </li>
              <li>
                <a className={s.link} href={site.links.linkedin} {...external}>
                  LinkedIn<span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.body}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
