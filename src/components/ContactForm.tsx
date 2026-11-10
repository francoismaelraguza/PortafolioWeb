import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from 'react';
import { contact } from '../content/contact';
import { isDemoMode, sendMessage } from '../lib/sendMessage';
import { Button } from './Button';
import s from './ContactForm.module.css';

type FieldName = 'name' | 'email' | 'message';
type Errors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'network' | 'rejected';

const FIELD_ORDER: FieldName[] = ['name', 'email', 'message'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: FieldName, value: string): string | undefined {
  const text = value.trim();
  if (name === 'name' && !text) return contact.fields.name.error;
  if (name === 'email' && !EMAIL_PATTERN.test(text)) return contact.fields.email.error;
  if (name === 'message' && text.length < 10) return contact.fields.message.error;
  return undefined;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const done = useRef<HTMLDivElement>(null);

  // Con texto sin enviar, el navegador avisa antes de cerrar o recargar la pestaña.
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  // Al confirmar el envío, el foco pasa al mensaje para que se anuncie.
  useEffect(() => {
    if (status === 'sent') done.current?.focus();
  }, [status]);

  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName;
    // Solo se corrige al salir un campo que ya tenía error o que se ha rellenado.
    if (!errors[name] && !event.target.value) return;
    setErrors((current) => ({ ...current, [name]: validate(name, event.target.value) }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? '');

    const found: Errors = {};
    for (const name of FIELD_ORDER) found[name] = validate(name, value(name));
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    const result = await sendMessage({
      name: value('name').trim(),
      email: value('email').trim(),
      message: value('message').trim(),
      botcheck: value('botcheck'),
    });
    if (result.ok) setDirty(false);
    setStatus(result.ok ? 'sent' : result.reason);
  };

  if (status === 'sent') {
    return (
      <div ref={done} className={s.done} tabIndex={-1} role="status">
        <h3 className={`${s.doneTitle} display`}>{contact.success.title}</h3>
        <p>{contact.success.text}</p>
        <Button onClick={() => setStatus('idle')}>{contact.success.again}</Button>
      </div>
    );
  }

  const sending = status === 'sending';
  const failure = status === 'network' || status === 'rejected' ? contact.failure[status] : null;

  return (
    <form
      className={s.form}
      onSubmit={onSubmit}
      onInput={(event) =>
        setDirty(
          FIELD_ORDER.some((name) =>
            String(new FormData(event.currentTarget).get(name) ?? '').trim(),
          ),
        )
      }
      noValidate
    >
      {FIELD_ORDER.map((name) => {
        const field = contact.fields[name];
        const error = errors[name];
        const shared = {
          id: `contact-${name}`,
          name,
          className: s.input,
          placeholder: field.placeholder,
          required: true,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? `contact-${name}-error` : undefined,
          onBlur,
        };

        return (
          <div key={name} className={s.field} data-invalid={error ? true : undefined}>
            <label className={s.label} htmlFor={shared.id}>
              {field.label}
            </label>
            {name === 'message' ? (
              <textarea {...shared} rows={5} autoComplete="off" />
            ) : (
              <input
                {...shared}
                type={name === 'email' ? 'email' : 'text'}
                autoComplete={name === 'email' ? 'email' : 'name'}
                spellCheck={name === 'email' ? false : undefined}
                autoCapitalize={name === 'email' ? 'none' : undefined}
              />
            )}
            {error && (
              <p id={`contact-${name}-error`} className={s.error}>
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Campo trampa para bots: fuera de la vista, del foco y de los lectores de pantalla. */}
      <input
        className={s.trap}
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Button type="submit" block aria-disabled={sending || undefined}>
        {sending ? contact.sending : contact.submit}
      </Button>

      <div aria-live="polite">
        {failure && (
          <p className={s.error} role="alert">
            {failure}
          </p>
        )}
        {isDemoMode && <p className={s.demo}>{contact.demoNotice}</p>}
      </div>
    </form>
  );
}
