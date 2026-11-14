/* Datos generales del sitio: nombre, frase del inicio y enlaces. */

export const site = {
  name: 'Franco Raguza',
  firstName: 'Franco',
  lastName: 'Raguza',
  monogram: 'FR',
  role: 'Desarrollador web',
  /** Frase de presentación del inicio (máx. ~22 palabras). */
  tagline: 'Estudiante de desarrollo web. Creativo en el frontend y sólido en el backend.',
  githubUser: 'francoismaelraguza',
  repoUrl: 'https://github.com/francoismaelraguza/PortafolioWeb',
  links: {
    github: 'https://github.com/francoismaelraguza',
    linkedin: 'https://www.linkedin.com/in/franco-ismael-raguza-79b1a6397/',
    email: 'francoismaelraguza@gmail.com',
  },
} as const;

export const navigation = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
] as const;
