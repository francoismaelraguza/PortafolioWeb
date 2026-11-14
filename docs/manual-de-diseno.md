# Manual de diseño · Portfolio de Franco Raguza

Este documento explica **por qué** el sitio se ve como se ve. Los valores exactos viven en [`src/styles/tokens.css`](../src/styles/tokens.css): si el manual y los tokens discrepan, mandan los tokens y hay que corregir el manual.

## 1. Idea

La composición se repartió con la skill `design-taste-frontend` (dirección «Solo tipografía», semilla `675141479`, guardada en `.taste-skill/direction.json`). Paleta y tipografía son la **variante B**, elegida por Franco frente a la que repartió la skill («Hollín y lima», Anton / Work Sans).

> En esta página, **las iniciales FR** se convierten en **un único cuerpo de partículas que se recompone en cada capítulo**: letras en el inicio, un campo abierto mientras se lee, dos cuerpos para misión y visión, un suelo de puntos tras los proyectos y un solo punto al final.

El primer pantallazo es solo palabras, color y espacio. Lo único «dibujado» del sitio es ese cuerpo de partículas en Three.js; lo demás es tipografía a tamaño de cartel, campos de color plano y capturas reales de los proyectos.

**Lo vivo:** al mover el puntero (o el dedo) las partículas cercanas se apartan y vuelven a su sitio. En proyectos, pasar por un nombre cambia la vista previa.

## 2. Marca y voz

- **Nombre:** Franco Raguza. **Monograma:** FR, compuesto en la tipografía de titulares; nunca como imagen.
- **Voz:** primera persona, frases cortas y concretas, en español. Se nombra la cosa real («un repositorio que se puede clonar») en lugar del adjetivo («código de calidad»).
- **No se escribe:** «apasionado», «soluciones», «innovador», listas de tres adjetivos, signos de exclamación.
- **Botones y enlaces** dicen lo que hacen: «Ver proyectos», «Enviar mensaje». La acción principal conserva el mismo nombre en toda la página.
- Títulos en minúscula con mayúscula inicial («Quién soy»), como pide el español; las mayúsculas las pone la tipografía de titulares.

## 3. Color · «Noche y aciano»

Un fondo, una tinta, un acento. Sin grises intermedios, sin degradados, sin transparencias sobre texto.

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#0a0d14` | Fondo de la página |
| `--surface` | `#131824` | Un escalón sobre el fondo: campos de formulario, marco de la vista previa |
| `--ink` | `#e9edf3` | Todo el texto de lectura y los titulares |
| `--muted` | `#8891a1` | Texto secundario sobre fondo oscuro (6:1) |
| `--accent` | `#5a9bfc` | Botones, el apellido del inicio, resaltados y parte de las partículas |
| `--accent-ink` | `#0a0d14` | Texto sobre el acento |
| `--field-1` / `--field-1-ink` | `#e9edf3` / `#0a0d14` | Campo claro (contacto) |
| `--field-2` / `--field-2-ink` | `#5a9bfc` / `#0a0d14` | Campo de acento («Qué me distingue») |
| `--field-muted` | `#2b3342` | Texto secundario sobre campos claros |
| `--error` | `#ff9d8a` | Errores de formulario, siempre sobre fondo oscuro |

**Capítulos.** La página se ordena por campos que se tocan con un borde duro, nunca fundidos. Cada sección declara el suyo con `data-chapter`:

| Sección | `data-chapter` | Partículas (`data-shape`) |
| --- | --- | --- |
| Inicio | `bg` | `fr` — el monograma |
| Quién soy | `bg` | `field` — campo disperso |
| Qué me distingue | `field-2` | (tapadas por el campo) |
| Misión y visión | `bg` | `pair` — dos cuerpos |
| Proyectos | `bg` | `grid` — suelo de puntos |
| Contacto | `field-1` | (tapadas por el campo) |
| Pie | `bg` | `point` — un solo punto |

**Reglas**

- Las superficies se separan por tono o por espacio, **nunca con una línea ni con sombra**. La única línea del sitio es la perforación del cupón de contacto, de 5 px y punteada: es un elemento gráfico, no un separador.
- El texto de lectura va siempre en la tinta plena; el gris es solo para notas.
- Sobre un campo claro no se usa `--muted`: se usa la tinta del campo o `--field-muted`.
- El foco de teclado es un contorno de 3 px en el acento, o en la tinta del campo sobre fondos claros (`--focus`).

## 4. Tipografía

| Papel | Familia | Ajustes |
| --- | --- | --- |
| Titulares (`--font-display`) | Barlow Condensed 700 | Mayúsculas, interlineado 0.84, tracking −0.015em |
| Texto (`--font-text`) | Barlow 400 / 600 | Interlineado 1.5; 1.3–1.35 en el tamaño `lead` |

Las fuentes se sirven desde el propio sitio (`@fontsource`), sin peticiones a terceros, y las dos del primer pantallazo se precargan.

**Cinco tamaños, lejos unos de otros.** No hay tamaños intermedios; si dos se parecen, son el mismo.

| Token | Rango | Uso |
| --- | --- | --- |
| `--step-small` | 13–14 px | Pie, etiquetas de formulario, notas |
| `--step-body` | 17–19 px | Párrafos, formularios, botones |
| `--step-lead` | 20–26 px | Frase del inicio, «Quién soy», misión y visión, títulos de sección discretos |
| `--step-head` | 40–88 px | Líneas de cartel y nombres de proyecto |
| `--step-display` | hasta ~300 px | Solo el nombre del inicio: llena su medida (lo limita el ancho en móvil y el alto en escritorio) |

**Reglas**

- Ningún titular ocupa más de **dos líneas** en ningún ancho. Si no cabe, se quitan palabras.
- Alineación a la izquierda. Sin texto justificado ni centrado.
- Sin fuente monoespaciada, sin palabras del titular en otro estilo, sin etiquetas pequeñas en mayúsculas sobre los títulos, sin numeración 01 / 02 / 03.
- Nada por debajo de 13 px. Medida de lectura de 45–75 caracteres.
- `text-wrap: balance` en titulares y `pretty` en párrafos; comillas « » y puntuación real (`…`, espacio duro antes de `%`).
- El nombre del inicio lleva un ajuste óptico de −0.04em para alinearse con el texto de debajo.

## 5. Espacio y retícula

- **Márgenes:** un único par, igual a ambos lados: `--margin` (16–44 px).
- **Retícula:** 12 columnas con `--gutter` (12–24 px). La asimetría vive dentro de la retícula, nunca en los márgenes.
- **Escala de espaciado:** múltiplos de 4 px (`--space-1` … `--space-24`).
- **Entre secciones:** `--section-gap` (88–200 px), siempre claramente mayor que cualquier hueco interior.
- **Puntos de corte:** 480 px (la cabecera acorta «Pausar fondo»), 700 px (misión y visión en dos columnas), 768 px (texto de cabecera mayor) y 900 px (retícula completa, vista previa fija, cupón horizontal). El móvil es una composición propia, no la de escritorio encogida.
- **Esquinas rectas** en todo (`--radius: 0`). Cada sección tiene una composición distinta de sus vecinas; ninguna es una rejilla de tarjetas.

## 6. Componentes

| Componente | Reposo | Hover | Pulsado | Foco | Otros |
| --- | --- | --- | --- | --- | --- |
| **Botón** (`Button`) | Relleno de acento, 52 px de alto, texto 600 | Relleno de tinta | Escala 0.97 | Contorno 3 px | Durante el envío: relleno gris y «Enviando…» |
| **Enlace de texto** | Tinta, subrayado | Acento | Opacidad 0.7 | Contorno | Los externos avisan a lectores de pantalla de que abren pestaña |
| **Cabecera** (`Header`) | Barra lisa y **opaca**: FR a la izquierda; tres enlaces y «Pausar fondo» a la derecha | Subrayado | Opacidad 0.7 | Contorno | Toma fondo y tinta del capítulo que tiene debajo (transición de 300 ms) |
| **Resaltado** (`mark`) | Fondo plano de acento, claro o gris con tinta oscura | — | — | — | Marca los datos que busca quien lee en diagonal |
| **Campo de formulario** | Bloque relleno de `--surface` con etiqueta visible | — | — | Contorno de acento en el bloque entero | Error: contorno y mensaje en `--error`, `aria-invalid` |
| **Índice de proyectos** | Nombres a tamaño de cartel en gris | Activo en tinta plena | Acento | Igual que hover | En escritorio cambia la vista previa fija; en móvil cada proyecto lleva su imagen |
| **Cupón de contacto** | Panel oscuro sobre campo claro, con dos muescas y perforación punteada | — | — | — | Horizontal desde 900 px; vertical en móvil |
| **Pie** | Cuatro columnas arriba; el nombre de margen a margen abajo | — | — | — | — |

Áreas táctiles de 44 px como mínimo. Un control se explica por su forma, su etiqueta y su sitio; si necesita una frase de instrucciones, se rediseña.

**Nada fijo es transparente.** Todo elemento `position: fixed` con texto lleva fondo opaco, para que el contenido que pasa por detrás no se mezcle con él.

## 7. Movimiento

| Token | Valor | Uso |
| --- | --- | --- |
| `--dur-fast` | 150 ms | Hover, pulsado |
| `--dur-base` | 300 ms | Cambio de color de la cabecera |
| `--dur-slow` | 600 ms | Opacidad de las entradas |
| `--dur-reveal` | 900 ms | Recorrido de las entradas |
| `--stagger` | 80 ms | Escalonado entre partes de una sección |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Estados |
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Todo lo que entra |

- **Gesto principal:** el color por capítulos; la cabecera cambia de fondo y tinta justo cuando el borde del campo pasa por debajo.
- **Carga:** nombre, apellido y frase suben escalonados en ~1 s, solo con CSS.
- **Entradas:** las partes de cada sección (`data-reveal`) aparecen en orden de lectura cuando la sección (`data-reveal-group`) entra en pantalla, una sola vez. Las listas entran fila a fila; la vista previa se asienta desde una escala de 1.04. Sin script, nada se oculta.
- **Scroll:** recompone las partículas; no secuestra el desplazamiento.
- Solo se animan `transform` y `opacity` (y el color en los estados).
- **`prefers-reduced-motion`:** se conserva el contenido y se elimina el recorrido; la escena 3D queda quieta y solo cambia de forma al cambiar de capítulo.
- **Pausa:** «Pausar fondo» detiene la animación continua de las partículas (WCAG 2.2.2) y la preferencia se recuerda.

## 8. Lenguaje 3D

- **Un solo objeto:** un cuerpo de partículas (discos planos, sin brillo ni desenfoque) en la tinta y el acento de la paleta, leídos de los tokens CSS.
- **Formas por capítulo:** ver la tabla de la sección 3. La mezcla entre dos formas ocurre mientras la frontera entre secciones cruza el centro de la pantalla.
- **Colocación del monograma:** se mide en el DOM el hueco que deja libre el texto del inicio (a la derecha del nombre o debajo de los botones) y el monograma se ajusta a él, así no pisa el nombre en ningún tamaño de pantalla.
- **Opacidad:** plena en el inicio y el pie; atenuada donde hay texto encima, y más aún en móvil.
- **Cámara:** fija; lo que cambia es la forma. El puntero aparta las partículas cercanas.
- **Sin** bloom, sin niebla de colores, sin materiales brillantes, sin modelos importados.
- **Rendimiento:** `dpr` máximo 1.75; 9000 partículas en escritorio y 3600 por debajo de 900 px; si los primeros fotogramas van a menos de ~40 fps, baja a `dpr` 1 y dibuja la mitad. three.js se carga en diferido, después del texto.
- **Sin WebGL:** la página funciona igual; el fondo queda en color plano y no se ofrece el botón de pausa.

## 9. Accesibilidad

- Contraste AA: texto ≥ 4.5:1, titulares ≥ 3:1 (la tinta sobre el fondo supera 15:1).
- Todo se usa con teclado en orden de lectura; enlace «Saltar al contenido»; foco siempre visible; la cabecera fija no tapa el destino de los enlaces (`scroll-padding-top`).
- Un solo `h1` (el nombre) y un título en cada sección.
- El lienzo 3D lleva `aria-hidden` y no recibe foco ni eventos.
- Formulario: etiquetas visibles, `autocomplete`, errores junto a su campo y asociados con `aria-describedby`, foco al primer error, resultado anunciado en una región viva, aviso antes de salir con texto sin enviar.
- Imágenes con `alt`, `width` y `height`; las de los proyectos se cargan en diferido.
- Idioma declarado (`lang="es"`); nombres propios con `translate="no"`.

## 10. Decisiones que cambiaron respecto al plan inicial

| Plan inicial | Qué se hizo | Motivo |
| --- | --- | --- |
| Tipografía mono para detalles técnicos | Una sola familia de texto | Regla de la skill: la mono fuera de bloques de código es un tic de página generada |
| Bloom y materiales emisivos | Partículas de color plano | Sin brillos ni degradados; además ahorra una dependencia y GPU |
| GSAP + ScrollTrigger | `IntersectionObserver`, CSS y el bucle de R3F | El scroll solo necesita una mezcla entre formas y entradas de una vez: sobra la librería |
| drei (`PerformanceMonitor`) | Degradación propia en `ParticleBody` | Veinte líneas frente a una dependencia más |
| Tarjetas de proyecto con inclinación 3D | Índice de nombres grandes con vista previa fija | Sin filas de tarjetas idénticas; cuatro proyectos se leen mejor como índice |
| Contacto solo con correo en grande | Cupón con formulario | El encargo pide formulario |
| Cabecera transparente en las esquinas | Barra opaca con el color del capítulo | Los enlaces se confundían con los títulos al pasar por debajo |
| Página entera oscura | Oscura con un campo de acento y uno claro | El color por capítulos hace el trabajo que harían las imágenes |

## 11. Cómo comprobar un cambio de diseño

1. `npm run build` y `npm run preview`.
2. `node <skill>/scripts/lint.mjs src index.html` → 0 FAIL.
3. `node <skill>/scripts/inspect.mjs http://localhost:4173/PortafolioWeb/ --widths 1440,1280,1024,768,390` → 0 FAIL, y **mirar** las capturas de `.taste-skill/inspect/`.
4. Avisos que se aceptan y por qué: `no-footage` (la imagen en movimiento es la escena 3D), `font-not-dealt` (variante B elegida a propósito) y `blank-gap` en el pie (ese hueco lo ocupa el punto de partículas, que el inspector no ve).
