import generated from './projects.generated.json';

export interface ProjectLanguage {
  name: string;
  /** Porcentaje del código del repo en este lenguaje (0 si no se conoce). */
  share: number;
}

export interface Project {
  id: string;
  repo: string | null;
  title: string;
  description: string;
  kind: string;
  /** Nombre base de la imagen en public/projects/, sin extensión. */
  image: string | null;
  imageAlt: string;
  demo: string | null;
  languages: ProjectLanguage[];
  topics: string[];
  stars: number;
  year: number | null;
  updatedAt: string | null;
  url: string | null;
}

/** Generado por scripts/fetch-projects.mjs a partir de projects.config.json. */
export const projects: Project[] = generated.projects;

/** Ruta pública de la imagen de un proyecto (respeta el `base` de Vite). */
export function projectImage(name: string, width: 640 | 1280): string {
  return `${import.meta.env.BASE_URL}projects/${name}${width === 640 ? '-640' : ''}.webp`;
}
