/*
 * Textos de la presentación: quién soy, qué me distingue, misión y visión.
 */

export type Mark = 'accent' | 'light' | 'soft';

/** Un tramo de texto; `mark` lo resalta con un color de la paleta. */
export interface Segment {
  text: string;
  mark?: Mark;
  /** El nombre propio va en negrita, sin resaltar. */
  strong?: boolean;
}

/*
 * Quién soy. Los espacios y la puntuación van siempre en los tramos sin
 * resaltar, para que el color no se extienda a un espacio o a un punto.
 */
export const whoIAm: Segment[] = [
  { text: 'Me llamo ' },
  { text: 'Franco I. Raguza', strong: true },
  { text: ' y soy estudiante de 2.º de ' },
  { text: 'Desarrollo de Aplicaciones Web', mark: 'light' },
  { text: '. Empecé programando un saludo en ' },
  { text: 'Java', mark: 'soft' },
  { text: '; hoy por hoy construyo ' },
  { text: 'páginas', mark: 'accent' },
  { text: ' totalmente funcionales, proyectos documentados y todo versionado en ' },
  { text: 'GitHub', mark: 'light' },
  { text: '. Integro el uso de herramientas de ' },
  { text: 'IA', mark: 'soft' },
  { text: ' tanto en mis proyectos como en el aprendizaje. Este ' },
  { text: 'portafolio', mark: 'accent' },
  {
    text: ' es el cúmulo de mi experiencia y conocimientos, mi libreta de viaje: aquí está lo que construyo, lo que aprendo y lo que voy a hacer. Si buscabas a alguien movido por la curiosidad, motivado por aprender y determinado a innovar,',
  },
];

/** Frase final de «Quién soy»: enlaza con el contacto. */
export const whoIAmClosing = '¿por qué no hablamos?';

/** Qué me distingue: título de 2–4 palabras y una frase. */
export const distinctions = [
  {
    title: 'Termino lo que empiezo',
    text: 'Cada práctica acaba en un repositorio que se puede clonar, ejecutar y leer.',
  },
  {
    title: 'Leo antes de escribir',
    text: 'Dedico tiempo a entender la documentación y el código ajeno antes de tocar una línea.',
  },
  {
    title: 'Cliente y servidor',
    text: 'Me muevo entre HTML, CSS y JavaScript en el navegador y Java en el servidor.',
  },
  {
    title: 'Pregunto sin miedo',
    text: 'Prefiero una duda resuelta a tiempo que un error escondido una semana.',
  },
  {
    title: 'Cuido el detalle',
    text: 'Nombres claros, commits pequeños y una interfaz que no necesita manual.',
  },
] as const;

/** Misión y visión: 20–30 palabras cada una. */
export const mission = {
  title: 'Misión',
  text: 'Desarrollar aplicaciones y páginas web que integren creatividad, funcionalidad y accesibilidad, con un código limpio, legible y estructurado.',
};

export const vision = {
  title: 'Visión',
  text: 'Trabajar como desarrollador full stack dentro de un equipo del cual aprender. Construir soluciones que destaquen por ser funcionales.',
};
