# Mantenimiento

Guía práctica para mantener el portfolio al día. Para el porqué del diseño, ver el [manual de diseño](manual-de-diseno.md).

## Pendientes antes de dar el sitio por «real»

Busca `PLACEHOLDER` en `src/content/` para encontrarlos todos.

- [ ] **Textos de presentación** — `src/content/about.ts`: quién soy, qué me distingue, misión y visión.
- [ ] **Frase del inicio** — `src/content/site.ts` (`tagline`).
- [ ] **Correo de contacto** — `src/content/site.ts` (`links.email`, ahora `hola@example.com`).
- [ ] **LinkedIn** — `src/content/site.ts` (`links.linkedin`, ahora la portada de LinkedIn).
- [ ] **Plazo de respuesta** — `src/content/contact.ts` (`note`).
- [ ] **Descripciones de los proyectos** — `projects.config.json`: están escritas a partir de lo que hay en cada repo; revísalas.
- [ ] **Prueba real del formulario** en el sitio publicado.

## Tareas habituales

### Editar textos

Todo el texto vive en `src/content/*.ts`. Edita, guarda y haz push a `main`: el sitio se vuelve a publicar solo.

Límites que el diseño necesita: ningún título de más de dos líneas (unos 32 caracteres); «Quién soy» entre 110 y 160 palabras; misión y visión, una frase de 20–30 palabras cada una.

### Añadir un proyecto

1. Añade una entrada a `projects.config.json` (solo repos **públicos**):

   ```json
   {
     "id": "mi-proyecto",
     "repo": "francoismaelraguza/MiRepo",
     "title": "Mi proyecto",
     "kind": "JavaScript",
     "description": "Una frase que diga qué es y con qué está hecho.",
     "image": "mi-proyecto",
     "imageAlt": "Qué se ve en la captura."
   }
   ```

2. Guarda dos capturas en `public/projects/`, en WebP y proporción 4:3: `mi-proyecto.webp` (1280×960) y `mi-proyecto-640.webp` (640×480).
3. Comprueba en local con `npm run fetch-projects` y `npm run dev`.

`id` es obligatorio si dos proyectos comparten repo. `path` enlaza a una carpeta dentro del repo. Los lenguajes, el año y el enlace los trae el script de GitHub; lo que escribas en la config manda sobre lo que venga de GitHub.

### Quitar o reordenar proyectos

El orden de `projects.config.json` es el orden en pantalla; el primero aparece activo.

### Cambiar colores o tipografía

Solo en `src/styles/tokens.css`, y después actualiza el manual. Si cambias la tipografía de titulares, cambia también `FONT` en `src/three/sampleMonogram.ts` (de ahí salen las letras de partículas), las importaciones de `src/main.tsx` y los patrones de `CRITICAL_FONTS` en `vite.config.ts`.

### Actualizar la imagen para compartir y la portada de «Este portfolio»

`public/og.jpg` (1200×630) y `public/projects/este-portfolio*.webp` son capturas del inicio. Si el inicio cambia de aspecto, vuelve a hacerlas.

## Formulario de contacto

- Usa [Web3Forms](https://web3forms.com): los mensajes llegan al correo con el que se creó la access key.
- La key está en `.env.local` (local, fuera de git) y en la variable de repositorio `VITE_WEB3FORMS_KEY` (GitHub → Settings → Secrets and variables → Actions → Variables). Es pública por diseño: acaba dentro del JavaScript del sitio.
- **Sin key**, el formulario entra en modo demostración: avisa de ello y no envía nada.
- **Rotar la key:** crea una nueva en Web3Forms, cámbiala en los dos sitios y vuelve a desplegar (Actions → «Desplegar en GitHub Pages» → Run workflow).
- **Si llega spam:** el formulario ya lleva un campo trampa; el siguiente paso es activar hCaptcha en el panel de Web3Forms.

## Despliegue

- Cada push a `main` ejecuta `.github/workflows/deploy.yml`: instala, pasa ESLint, trae los datos de GitHub, comprueba tipos, compila y publica en GitHub Pages.
- **Cada lunes** se recompila solo para refrescar lenguajes y fechas de los repos.
- También se puede lanzar a mano desde la pestaña Actions.
- **Configuración que se hace una vez:** Settings → Pages → Source: *GitHub Actions*; y la variable `VITE_WEB3FORMS_KEY`.
- **Si un despliegue sale mal:** `git revert <commit>` y push; se vuelve a publicar la versión anterior.
- **Dominio propio:** añade `public/CNAME` con el dominio, cambia `BASE` a `'/'` en `vite.config.ts` y las URL absolutas de `index.html`, `public/robots.txt` y `public/sitemap.xml`.

## Dependencias

- Dependabot abre PR agrupados una vez al mes (`.github/dependabot.yml`). Antes de fusionar: que el workflow pase y un vistazo al sitio en `npm run preview`.
- `three` y `@react-three/fiber` suben juntos. Tras subirlos, comprueba el inicio, el scroll entre secciones y el botón «Pausar fondo».
- `npm audit` avisa de vulnerabilidades moderadas en herramientas de desarrollo (cadena de `typescript-eslint`). No llegan al sitio publicado; se resuelven al actualizar esas herramientas. No uses `npm audit fix --force`.
- three.js avisa en consola de que `THREE.Clock` está obsoleto: viene de dentro de `@react-three/fiber` y desaparecerá cuando lo actualicen.

## Revisión trimestral

- [ ] Lighthouse sobre el sitio publicado (objetivo ≥ 90 en rendimiento, accesibilidad y SEO).
- [ ] Enlaces: GitHub, LinkedIn, correo y los cuatro proyectos.
- [ ] Enviar un mensaje de prueba por el formulario.
- [ ] Textos y proyectos al día.
- [ ] Inspector de diseño (sección 11 del manual) sin fallos.

## Qué no se ha comprobado todavía

- El workflow de despliegue no se ha ejecutado nunca: hasta el primer push a `main` no se sabe si pasa.
- No se ha enviado ningún mensaje real por el formulario.
- No se ha pasado Lighthouse.
- La escena 3D se ha visto en Chrome sin cabeza; falta probarla en un móvil real y en Safari y Firefox.
