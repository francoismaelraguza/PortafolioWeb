import { site } from '../content/site';

const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY: string | undefined = import.meta.env.VITE_WEB3FORMS_KEY;

/** Sin access key (p. ej. un clon del repo) el formulario funciona en modo demostración. */
export const isDemoMode = !ACCESS_KEY;

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Campo trampa: una persona lo deja vacío; un bot lo rellena. */
  botcheck: string;
}

export type SendResult = { ok: true } | { ok: false; reason: 'network' | 'rejected' };

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Envía el mensaje al correo del propietario a través de Web3Forms. */
export async function sendMessage(message: ContactMessage): Promise<SendResult> {
  // A un bot se le dice que todo ha ido bien, pero no se envía nada.
  if (message.botcheck || isDemoMode) {
    await wait(700);
    return { ok: true };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Mensaje de ${message.name} desde el portafolio`,
        from_name: `Portafolio de ${site.name}`,
        name: message.name,
        email: message.email,
        message: message.message,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const result: { success?: boolean } = await response.json().catch(() => ({}));
    return response.ok && result.success ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
