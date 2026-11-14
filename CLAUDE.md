# PortafolioWeb

Portafolio personal de Franco Raguza: una sola página en español con presentación, proyectos de GitHub y contacto, y una escena Three.js que reacciona al scroll. Se publica en GitHub Pages (`https://francoismaelraguza.github.io/PortafolioWeb/`).

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
- `src/content/*.ts` — todos los textos, ya definitivos (escritos por Franco).
- `src/sections/` — una sección por archivo (`.tsx` + `.module.css`). `src/components/` — piezas compartidas.
- `src/three/` — escena React Three Fiber. `src/hooks/`, `src/lib/` — utilidades.
- `projects.config.json` + `scripts/fetch-projects.mjs` — lista de repos y script que trae sus datos al compilar.
- `.taste-skill/` — hoja de dirección de arte e inspecciones (ignorado por git).

## Convenciones

- Stack: Vite + React + TypeScript, CSS Modules, three + @react-three/fiber. Sin GSAP ni drei: scroll y entradas con APIs nativas (`src/three/scrollStore.ts`, `src/lib/reveal.ts`). No añadir frameworks CSS ni librerías de animación sin motivo.
- Cada sección declara `data-chapter` (`bg`, `field-1`, `field-2`) para la cabecera y `data-shape` (`fr`, `field`, `pair`, `grid`, `point`) para las partículas. Las partes que entran animadas llevan `data-reveal` dentro de un `data-reveal-group`.
- Ningún componente usa un color, tamaño o espaciado que no sea un token de `tokens.css`.
- Rutas de `public/` desde JS/TS: siempre `import.meta.env.BASE_URL + 'ruta'`, nunca `/ruta` (el sitio vive en `/PortafolioWeb/`).
- Textos en español rioplatense, primera persona. Franco es argentino: lo que se dirige a quien visita el sitio va en **voseo** («escribime», «podés», «contame», «intentalo»); el voseo no es una errata y no se «corrige» a tú. Se dice «portafolio», no «portfolio». Sin datos personales inventados.
- Al corregir textos de Franco: arreglar ortografía, tildes y puntuación, pero conservar sus palabras; avisar de cualquier cambio que no sea puramente ortográfico.
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

7. **Git avisaba "LF will be replaced by CRLF" en cada archivo.**
   Causa: `core.autocrlf` de Windows sin `.gitattributes`.
   Solución: `.gitattributes` con `* text=auto eol=lf`.
   Regla: los archivos del repo van en LF; no cambiar la config global de git para arreglarlo.

8. **Los enlaces de la cabecera fija se confundían con los títulos al pasar por debajo** (aviso del usuario): la cabecera era transparente y su texto tenía el mismo color que el contenido.
   Solución: barra lisa y opaca que toma fondo y tinta del capítulo que tiene debajo (`useChapter` + `data-chapter` en cada sección).
   Regla: nada fijo sobre el scroll puede ser transparente; todo elemento `position: fixed` con texto lleva fondo opaco del capítulo. Toda sección nueva declara `data-chapter` (`bg`, `field-1` o `field-2`).

9. **ESLint (`react-hooks/immutability`) rechaza mutar en `useFrame` un material o geometría creados con `useMemo`.**
   Causa: las reglas del compilador de React tratan como inmutable todo valor devuelto por un hook.
   Solución: en `useFrame` leer el objeto montado desde un `ref` (`points.current.material.uniforms`) y mutar eso.
   Regla: en React Three Fiber, lo que cambia por fotograma se toca siempre a través de un `ref`, nunca a través de la variable de `useMemo`/`useState`.

10. **Un `sed`/`replace` global renombró más de lo debido** (`reducedMotion` → `still`) y un segundo reemplazo cayó en la primera coincidencia equivocada, dejando una variable sin definir.
    Regla: para cambios en un archivo, leerlo y usar ediciones exactas; los reemplazos globales por script solo para cadenas que no pueden repetirse, y siempre con `tsc` justo después.

11. **Un heredoc largo de Bash con comillas y acentos falló con "unexpected EOF".**
    Regla: los scripts de más de unas líneas se escriben a un archivo (en el scratchpad) y se ejecutan; nada de heredocs largos en línea.

12. **Chrome con `--headless --screenshot --virtual-time-budget` captura la página a medio animar y antes del cambio de fuente**, y mostró un solape que no existe.
    Regla: las capturas se hacen con `inspect.mjs` (acepta `--widths 1440,1280,1024,768,390`). No dar por real un fallo visto solo en una captura con tiempo virtual.

13. **El monograma de partículas pisaba el nombre en tableta** porque su posición era un porcentaje fijo de la pantalla.
    Solución: `src/three/heroSpace.ts` mide en el DOM el hueco libre (al lado del nombre o debajo de los botones) y se vuelve a medir con `ResizeObserver` y al cargar las fuentes.
    Regla: lo que el 3D deba esquivar se mide en el DOM, no se estima con porcentajes.

14. **Las partículas se veían más oscuras que el color del token.**
    Causa: un `ShaderMaterial` no convierte de espacio lineal a sRGB por sí solo.
    Solución: `#include <colorspace_fragment>` al final del fragment shader y `flat` en el `<Canvas>`.

15. **En un grid, un hijo con `position: absolute` y `grid-row: 1` se colocaba respecto a todo el contenedor.**
    Causa: para los absolutos, la línea final `auto` es el borde del contenedor.
    Regla: indicar siempre las dos líneas (`grid-row: 1 / 2`).

16. **`sharp` solo aplica el último `.resize()` encadenado**: la portada salió a 1280×800 en vez de 4:3.
    Regla: un solo `.resize({ width, height, fit })` por imagen.

17. **`lint.mjs` marca `height: 1px` de elementos ocultos como "línea fina".**
    Regla: en utilidades solo para lectores de pantalla, añadir el comentario `taste-skill-ignore` con el motivo en esa misma línea.

18. **El panel del navegador integrado, cuando está oculto, no dispara `focus`, no carga imágenes diferidas y deja el `<canvas>` en 300×150.**
    Regla: ahí solo se comprueba DOM, consola y red (los eventos se pueden lanzar a mano con `dispatchEvent`); lo visual, con el inspector.

19. **Un fondo que se mueve sin parar necesita control de pausa** (auditoría `web-design-guidelines`, WCAG 2.2.2).
    Solución: `src/lib/backdropMotion.ts` y el botón «Pausar fondo» de la cabecera.
    Regla: toda animación continua nueva respeta `still` (movimiento reducido o fondo en pausa).
