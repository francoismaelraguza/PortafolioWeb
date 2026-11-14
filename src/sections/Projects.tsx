import { useState } from 'react';
import { projectImage, projects, type Project } from '../data/projects';
import { stagger } from '../lib/reveal';
import s from './Projects.module.css';

function Picture({ project, className }: { project: Project; className?: string }) {
  if (!project.image) return null;
  return (
    <img
      className={className}
      src={projectImage(project.image, 1280)}
      srcSet={`${projectImage(project.image, 640)} 640w, ${projectImage(project.image, 1280)} 1280w`}
      sizes="(min-width: 900px) 40vw, 100vw"
      width={1280}
      height={960}
      alt={project.imageAlt}
      loading="lazy"
      decoding="async"
    />
  );
}

const percent = new Intl.NumberFormat('es', { style: 'percent' });

function Languages({ project }: { project: Project }) {
  if (!project.languages.length) return null;
  return (
    <ul className={s.languages} aria-label="Lenguajes">
      {project.languages.map((language) => (
        <li key={language.name}>
          {language.name}
          {language.share > 0 && (
            <span className={s.share}> {percent.format(language.share / 100)}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Projects() {
  const [activeId, setActiveId] = useState(projects[0]?.id);
  const active = projects.find((project) => project.id === activeId) ?? projects[0];

  // Sin proyectos la sección sigue existiendo: la cabecera y el inicio enlazan con ella.
  if (!active) {
    return (
      <section
        id="proyectos"
        className={s.projects}
        data-chapter="bg"
        data-shape="grid"
        aria-labelledby="projects-title"
      >
        <header className={s.head}>
          <h2 id="projects-title" className={s.title}>
            Proyectos
          </h2>
          <p className={s.note}>Todavía no hay proyectos publicados. Volvé pronto.</p>
        </header>
      </section>
    );
  }

  return (
    <section
      id="proyectos"
      className={s.projects}
      data-chapter="bg"
      data-shape="grid"
      data-reveal-group
      aria-labelledby="projects-title"
    >
      <header className={s.head} data-reveal>
        <h2 id="projects-title" className={s.title}>
          Proyectos
        </h2>
        <p className={s.note}>Trabajos con el código abierto en GitHub.</p>
      </header>

      <ul className={s.list}>
        {projects.map((project, index) => (
          <li
            key={project.id}
            className={s.item}
            data-active={project.id === active.id}
            data-reveal
            style={stagger(index + 1)}
          >
            <Picture project={project} className={s.inlinePicture} />
            <a
              className={s.row}
              href={project.url ?? undefined}
              target="_blank"
              rel="noreferrer"
              onPointerEnter={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
            >
              <h3 className={`${s.name} display`} translate="no">
                {project.title}
              </h3>
              <span className={s.meta}>
                {project.kind}
                {project.year && <>, {project.year}</>}
              </span>
              <span className="sr-only"> (código en GitHub, se abre en una pestaña nueva)</span>
            </a>
            {/* En móvil se ve; en escritorio lo muestra el panel fijo y aquí queda para lectores de pantalla. */}
            <div className={s.inlineDetail}>
              <p>{project.description}</p>
              <Languages project={project} />
            </div>
          </li>
        ))}
      </ul>

      {/* Panel fijo de escritorio: duplica lo que ya está en la lista, por eso se oculta a los lectores. */}
      <div className={s.preview} aria-hidden="true" data-reveal="settle" style={stagger(2)}>
        <div className={s.frame}>
          {projects.map((project) => (
            <Picture
              key={project.id}
              project={project}
              className={`${s.framePicture} ${project.id === active.id ? s.frameActive : ''}`}
            />
          ))}
        </div>
        <p className={s.previewText}>{active.description}</p>
        <Languages project={active} />
      </div>
    </section>
  );
}
