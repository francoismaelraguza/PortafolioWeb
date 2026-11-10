/* Textos de la sección de contacto y del formulario. */

export const contact = {
  title: 'Escríbeme un mensaje',
  // PLACEHOLDER: ajusta el plazo de respuesta a lo que de verdad puedas cumplir.
  note: 'Leo todos los mensajes y respondo en un par de días. Si lo prefieres, también puedes escribirme por aquí:',
  submit: 'Enviar mensaje',
  sending: 'Enviando…',
  demoNotice: 'Modo demostración: el formulario no está conectado y el mensaje no se envía.',
  success: {
    title: 'Mensaje enviado',
    text: 'Gracias por escribir. Te responderé al correo que has indicado.',
    again: 'Enviar otro mensaje',
  },
  failure: {
    network:
      'No se ha podido enviar: parece que no hay conexión. Tu mensaje sigue aquí; inténtalo de nuevo en un momento.',
    rejected:
      'El servicio de envío ha rechazado el mensaje. Tu texto sigue aquí; inténtalo de nuevo o escríbeme directamente por correo.',
  },
  fields: {
    name: {
      label: 'Nombre',
      placeholder: 'Ada Lovelace…',
      error: 'Escribe tu nombre.',
    },
    email: {
      label: 'Correo electrónico',
      placeholder: 'ada@ejemplo.com…',
      error: 'Escribe un correo válido, como nombre@dominio.com.',
    },
    message: {
      label: 'Mensaje',
      placeholder: 'Cuéntame qué necesitas…',
      error: 'Cuéntame un poco más: al menos 10 caracteres.',
    },
  },
} as const;
