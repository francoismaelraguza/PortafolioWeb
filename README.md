# PortafolioWeb

Portfolio personal de Franco Raguza: una página con presentación, proyectos de GitHub y contacto, sobre una escena de partículas en Three.js que cambia de forma al hacer scroll.

**Sitio:** https://francoismaelraguza.github.io/PortafolioWeb/

## Tecnologías

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [three.js](https://threejs.org) con [React Three Fiber](https://r3f.docs.pmnd.rs)
- CSS Modules con design tokens (`src/styles/tokens.css`)
- [Web3Forms](https://web3forms.com) para el formulario de contacto
- GitHub Actions + GitHub Pages para el despliegue

## Puesta en marcha

Desarrollado y desplegado con Node 24.

```bash
npm install
```

```bash
npm run dev
```

El sitio queda en `http://localhost:5173/PortafolioWeb/`.

Para que el formulario envíe mensajes en local, copia `.env.example` como `.env.local` y pon tu access key de Web3Forms. Sin ella funciona en modo demostración.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Trae los datos de los proyectos, comprueba tipos y compila en `dist/` |
| `npm run preview` | Sirve `dist/` en `http://localhost:4173/PortafolioWeb/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sin emitir |
| `npm run fetch-projects` | Regenera los datos de los proyectos desde la API de GitHub |
| `npm run format` | Prettier |

## Dónde está cada cosa

| Quiero… | Archivo |
| --- | --- |
| Cambiar un texto | `src/content/*.ts` |
| Añadir o quitar un proyecto | `projects.config.json` y `public/projects/` |
| Cambiar colores, tipografía o espaciado | `src/styles/tokens.css` |
| Tocar una sección | `src/sections/` |
| Tocar la escena 3D | `src/three/` |

## Documentación

- [Manual de diseño](docs/manual-de-diseno.md): color, tipografía, componentes, movimiento y lenguaje 3D.
- [Mantenimiento](docs/mantenimiento.md): tareas habituales, despliegue, dependencias y pendientes.
