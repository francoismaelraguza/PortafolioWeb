/*
 * Textos de la presentación: quién soy, qué me distingue, misión y visión.
 *
 * PLACEHOLDER: todo este archivo es texto provisional, escrito para que el
 * diseño se vea con longitudes reales. Sustitúyelo por tus propias palabras.
 */

export type Mark = 'accent' | 'light' | 'soft';

/** Un tramo de texto; `mark` lo resalta con un color de la paleta. */
export interface Segment {
  text: string;
  mark?: Mark;
  /** El nombre propio va en negrita, sin resaltar. */
  strong?: boolean;
}

// PLACEHOLDER — Quién soy (110–160 palabras, 5–7 resaltados).
export const whoIAm: Segment[] = [
  { text: 'Soy ' },
  { text: 'Franco Raguza', strong: true },
  { text: ', desarrollador web en formación. Estudio ' },
  { text: 'Desarrollo de Aplicaciones Web', mark: 'light' },
  { text: ', y paso los días entre ' },
  { text: 'Java', mark: 'soft' },
  { text: ' en el servidor y ' },
  { text: 'JavaScript', mark: 'accent' },
  {
    text: ' en el navegador. Empecé programando una agenda por consola y un banco de mentira; hoy maqueto páginas con ',
  },
  { text: 'Flexbox y Grid', mark: 'light' },
  { text: ', documento mis clases con Javadoc y lo versiono todo en ' },
  { text: 'GitHub', mark: 'soft' },
  {
    text: '. Me gusta entender por qué funciona algo antes de darlo por terminado, y prefiero una interfaz sencilla que se explique sola a una llena de adornos. Este portfolio es mi cuaderno de trabajo: aquí dejo lo que construyo, lo que aprendo y lo que todavía me queda por pulir. Si buscas a alguien con ganas de aprender y de terminar lo que empieza,',
  },
];

// PLACEHOLDER — Frase final de "Quién soy": enlaza con el contacto.
export const whoIAmClosing = 'hablemos.';

// PLACEHOLDER — Qué me distingue (título de 2–4 palabras + una frase).
export const distinctions = [
  {
    title: 'Termino lo que empiezo',
    text: 'Cada práctica acaba en un repositorio que se puede clonar, ejecutar y leer.',
  },
  {
    title: 'Leo antes de escribir',
    text: 'Dedico tiempo a la documentación y al código ajeno antes de tocar una línea.',
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

// PLACEHOLDER — Misión y visión (una frase de 20–30 palabras cada una).
export const mission = {
  title: 'Misión',
  text: 'Construir páginas y aplicaciones web que cualquiera pueda usar sin esfuerzo, con un código que otra persona pueda leer, entender y mantener.',
};

export const vision = {
  title: 'Visión',
  text: 'Crecer como desarrollador full stack dentro de un equipo del que aprender, y que mi trabajo se reconozca por lo bien que funciona.',
};
