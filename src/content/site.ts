/*
 * Datos generales del sitio. Todo lo marcado como PLACEHOLDER hay que
 * sustituirlo por los datos reales antes de dar el sitio por terminado.
 */

export const site = {
  name: 'Franco Raguza',
  firstName: 'Franco',
  lastName: 'Raguza',
  monogram: 'FR',
  role: 'Desarrollador web',
  // PLACEHOLDER: frase de presentación del hero (máx. ~22 palabras).
  tagline:
    'Desarrollador web. Construyo interfaces claras y el código que las sostiene, de HTML y CSS a JavaScript y Java.',
  githubUser: 'francoismaelraguza',
  repoUrl: 'https://github.com/francoismaelraguza/PortafolioWeb',
  links: {
    github: 'https://github.com/francoismaelraguza',
    // PLACEHOLDER: URL real del perfil de LinkedIn.
    linkedin: 'https://www.linkedin.com/',
    // PLACEHOLDER: correo público de contacto.
    email: 'hola@example.com',
  },
} as const;

export const navigation = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
] as const;
