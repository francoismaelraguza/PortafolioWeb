# PortafolioWeb

Portfolio personal de Franco Raguza: una sola página en español con presentación, proyectos de GitHub y contacto, y una escena Three.js que reacciona al scroll. Se publica en GitHub Pages (`https://francoismaelraguza.github.io/PortafolioWeb/`).

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `http://localhost:5173/PortafolioWeb/` |
| `npm run build` | `fetch-projects` (prebuild) + typecheck + build de producción en `dist/` |
| `npm run preview` | Sirve `dist/` en `http://localhost:4173/PortafolioWeb/` |
| `npm run lint` / `npm run typecheck` | ESLint / `tsc --noEmit` |
| `npm run fetch-projects` | Regenera `src/data/projects.generated.json` desde la API de GitHub |
| `npm run format` | Prettier |

## Estructura

- `src/styles/tokens.css` — design tokens; **fuente de verdad** del manual (`docs/manual-de-diseno.md`).
- `src/content/*.ts` — todos los textos. Lo marcado `PLACEHOLDER` es provisional.
- `src/sections/` — una sección por archivo (`.tsx` + `.module.css`). `src/components/` — piezas compartidas.
- `src/three/` — escena React Three Fiber. `src/hooks/`, `src/lib/` — utilidades.
- `projects.config.json` + `scripts/fetch-projects.mjs` — lista de repos y script que trae sus datos al compilar.
- `.taste-skill/` — hoja de dirección de arte e inspecciones (ignorado por git).

## Convenciones

- Stack: Vite + React + TypeScript, CSS Modules, GSAP, three / @react-three/fiber / drei. No añadir frameworks CSS.
- Ningún componente usa un color, tamaño o espaciado que no sea un token de `tokens.css`.
- Rutas de `public/` desde JS/TS: siempre `import.meta.env.BASE_URL + 'ruta'`, nunca `/ruta` (el sitio vive en `/PortafolioWeb/`).
- Textos en español, primera persona. Sin datos personales inventados: lo que falte va como `PLACEHOLDER`.
- Commits locales por hito en la rama de trabajo. **Push y PR solo con permiso explícito.**

## Diseño: skills obligatorias

- `design-taste-frontend` antes de tocar UI: la dirección repartida está en `.taste-skill/direction.json` (reimprimir con `draw.mjs --show`). Pasar `lint.mjs` e `inspect.mjs` y mirar las capturas tras cada sección.
- `web-design-guidelines` como auditoría al cerrar cada sección y antes de desplegar.
- Reglas de la casa que mandan sobre cualquier idea previa: sin monoespaciada, sin degradados, sin sombras ni brillos, sin líneas finas, sin etiquetas pequeñas sobre los títulos, sin numeración 01/02/03, titulares de dos líneas como máximo, esquinas rectas, una sola forma de botón.

## Retos y lecciones

Registro vivo. **Releer antes de empezar cada fase.** Cada entrada: qué pasó → causa → solución → regla.

1. **`npm pkg set clave=valor --json` falla con "is not valid JSON".**
   Causa: con `--json` cada valor debe ser JSON válido (`type=module` no lo es).
   Regla: usar `--json` solo para booleanos/números/objetos; las cadenas, sin la bandera.

2. **`node -e "require('/c/Users/…')"` no encuentra el módulo en Git Bash.**
   Causa: Node en Windows no entiende las rutas `/c/…` de MSYS dentro del código.
   Regla: dentro de código Node usar `C:/…` o rutas relativas al `cwd`; las rutas `/c/…` solo sirven como argumentos de shell.

3. **`IntersectionObserver` lanzó "rootMargin must be specified in pixels or percent".**
   Causa: el `rootMargin` se calculaba con `window.innerHeight`, que vale 0 cuando el panel del navegador está oculto, y salía un valor inválido (`--37px`).
   Solución: `useChapterInk` mide con `getBoundingClientRect` en un listener de scroll con `requestAnimationFrame`.
   Regla: no construir `rootMargin` (ni ningún cálculo de layout) a partir de `innerHeight`/`innerWidth` sin contemplar que valgan 0.

4. **Las capturas del panel del navegador integrado dan timeout si la ventana no está visible.**
   Regla: para mirar el render usar `inspect.mjs` de la skill de diseño (Chrome sin cabeza, guarda capturas en `.taste-skill/inspect/`) y el panel solo para leer DOM, consola y red.

5. **El plan inicial chocaba con las reglas de la skill de diseño** (tipografía mono para detalles, bloom/brillo en el 3D, tarjetas con inclinación, bordes finos).
   Solución: manda la skill; se quitó `@react-three/postprocessing`, no hay fuente mono y el 3D es de color plano.
   Regla: antes de proponer un recurso visual, comprobarlo contra la tabla de reglas de la casa.

6. **El contacto y los proyectos repartidos por la skill no cabían en el contenido real** (contacto sin formulario; índice para 20–40 proyectos).
   Solución: `--redraw section:contact=contact-clip-out-coupon` y `section:work=work-big-names-fixed-preview`.
   Regla: si un blueprint no puede contener el contenido real, cambiar de blueprint con `--alternatives`, no deformar el contenido.
