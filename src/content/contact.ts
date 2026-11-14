/*
 * Textos de la sección de contacto y del formulario.
 * Todo lo que se dirige a quien visita el sitio va en voseo (escribime, podés, contame).
 */

export const contact = {
  title: 'Escribime un mensaje',
  note: 'Leo todos los mensajes y responderé en un plazo máximo de 2 días. Si lo preferís, también podés escribirme por aquí:',
  submit: 'Enviar mensaje',
  sending: 'Enviando…',
  demoNotice: 'Modo demostración: el formulario no está conectado y el mensaje no se envía.',
  success: {
    title: 'Mensaje enviado',
    text: 'Gracias por escribir. Responderé al correo que indicaste.',
    again: 'Enviar otro mensaje',
  },
  failure: {
    network:
      'No se pudo enviar: parece que no hay conexión. Tu mensaje sigue aquí; intentalo de nuevo en un momento.',
    rejected:
      'El servicio de envío rechazó el mensaje. Tu texto sigue aquí; intentalo de nuevo o escribime directamente por correo.',
  },
  fields: {
    name: {
      label: 'Nombre',
      placeholder: 'Pepe Aguilar…',
      error: 'Escribí tu nombre.',
    },
    email: {
      label: 'Correo electrónico',
      placeholder: 'pepe@ejemplo.com…',
      error: 'Escribí un correo válido, como nombre@dominio.com.',
    },
    message: {
      label: 'Mensaje',
      placeholder: 'Contame qué necesitás…',
      error: 'Contame un poco más: al menos 10 caracteres.',
    },
  },
} as const;
