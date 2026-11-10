# Manual de diseño · Portfolio de Franco Raguza

Este documento explica **por qué** el sitio se ve como se ve. Los valores exactos viven en [`src/styles/tokens.css`](../src/styles/tokens.css): si el manual y los tokens discrepan, mandan los tokens y hay que corregir el manual.

> **Estado:** variante A («Hollín y lima») aplicada por defecto. La variante B («Noche y aciano») está disponible en `?v=b` solo para comparar; al elegir una, la otra se elimina de `tokens.css` y de `main.tsx`.

## 1. Idea

La dirección de arte se repartió con la skill `design-taste-frontend` (dirección «Solo tipografía», semilla `675141479`, guardada en `.taste-skill/direction.json`).

> En esta página, **las iniciales FR y los repositorios reales de Franco** se convierten en **un único cuerpo de partículas que se recompone en cada capítulo**: letras en el inicio, un campo abierto mientras se lee, y un punto al llegar al contacto.

El primer pantallazo es solo palabras, color y espacio. Lo único «dibujado» de todo el sitio es ese cuerpo de partículas en Three.js; lo demás es tipografía a tamaño de cartel y campos de color plano.

**Lo vivo:** el visitante puede mover el puntero (o el dedo) sobre el monograma y las partículas se apartan y vuelven a componerse.

## 2. Marca y voz

- **Nombre:** Franco Raguza. **Monograma:** FR, compuesto en la tipografía de titulares; nunca como imagen.
- **Voz:** primera persona, frases cortas y concretas, en español. Se nombra la cosa real («un repositorio que se puede clonar») en lugar del adjetivo («código de calidad»).
- **No se escribe:** «apasionado», «soluciones», «innovador», listas de tres adjetivos, signos de exclamación.
- **Botones y enlaces** dicen lo que hacen: «Ver proyectos», «Enviar mensaje». La acción principal conserva el mismo nombre en toda la página.

## 3. Color

Un fondo, una tinta, un acento. Sin grises intermedios, sin degradados, sin transparencias sobre texto.

| Token | Variante A | Variante B | Uso |
| --- | --- | --- | --- |
| `--bg` | `#0f0f0f` | `#0a0d14` | Fondo de la página (70–90 % de la superficie) |
| `--surface` | `#1a1a1a` | `#131824` | Un escalón sobre el fondo: campos de formulario, paneles |
| `--ink` | `#ffffff` | `#e9edf3` | Todo el texto de lectura y los titulares |
| `--muted` | `#8f8f8f` | `#8891a1` | Texto secundario sobre fondo oscuro (≥ 4.5:1) |
| `--accent` | `#dafa9c` | `#5a9bfc` | Botones, el apellido del inicio y los resaltados. Menos del 5 % de cada pantalla |
| `--accent-ink` | `#0f0f0f` | `#0a0d14` | Texto sobre el acento |
| `--field-1` / `--field-2` | blanco / lima | hueso / aciano | Campos: secciones que cambian todo el fondo |
| `--field-muted` | `#4d4d4d` | `#2b3342` | Texto secundario sobre campos claros |

**Capítulos.** La página se ordena por campos que se tocan con un borde duro, nunca fundidos:

1. Inicio y «Quién soy» — fondo, con las partículas detrás.
2. «Qué me distingue» — campo de acento.
3. «Misión y visión» y «Proyectos» — fondo.
4. «Contacto» — campo claro.
5. Pie — fondo.

**Reglas**

- Las superficies se separan por tono o por espacio, **nunca con una línea ni con sombra**.
- El texto de lectura va siempre en la tinta plena; el gris es solo para notas.
- Sobre un campo claro no se usa `--muted`: se usa la tinta del campo o `--field-muted`.
- El foco de teclado es un contorno de 3 px en el acento (o en la tinta del campo sobre fondos claros).

## 4. Tipografía

| Papel | Variante A | Variante B | Ajustes |
| --- | --- | --- | --- |
| Titulares (`--font-display`) | Anton 400 | Barlow Condensed 700 | Mayúsculas, interlineado 0.86, tracking −0.01em |
| Texto (`--font-text`) | Work Sans (400 / 600) | Barlow (400 / 600) | Interlineado 1.5; 1.3–1.35 en el tamaño `lead` |

Las fuentes se sirven desde el propio sitio (`@fontsource`), sin peticiones a terceros.

**Cinco tamaños, lejos unos de otros.** No hay tamaños intermedios; si dos se parecen, son el mismo.

| Token | Rango | Uso |
| --- | --- | --- |
| `--step-small` | 13–14 px | Pie, notas legales |
| `--step-body` | 17–19 px | Párrafos, formularios, botones |
| `--step-lead` | 20–26 px | Frase del inicio, la historia de «Quién soy», títulos de sección discretos |
| `--step-head` | 40–88 px | Líneas de cartel y títulos grandes |
| `--step-display` | hasta ~280 px | Solo el nombre del inicio: llena su medida (lo limita el ancho en móvil y el alto en escritorio) |

**Reglas**

- Ningún titular ocupa más de **dos líneas** en ningún ancho. Si no cabe, se quitan palabras.
- Alineación a la izquierda. Sin texto justificado ni centrado.
- Sin fuente monoespaciada, sin palabras del titular en otro estilo, sin etiquetas pequeñas en mayúsculas sobre los títulos, sin numeración 01 / 02 / 03.
- Nada por debajo de 13 px. Medida de lectura de 45–75 caracteres.
- `text-wrap: balance` en titulares y `pretty` en párrafos; comillas « » y puntuación real.

## 5. Espacio y retícula

- **Márgenes:** un único par, igual a ambos lados: `--margin` (16–44 px).
- **Retícula:** 12 columnas con `--gutter` (12–24 px). La asimetría vive dentro de la retícula, nunca en los márgenes: si un bloque se pega a la izquierda, algo lo cierra a la derecha.
- **Escala de espaciado:** múltiplos de 4 px (`--space-1` … `--space-24`).
- **Entre secciones:** `--section-gap` (88–200 px), siempre claramente mayor que cualquier hueco interior.
- **Puntos de corte:** 768 px (tableta) y 900 px (pasa a dos columnas / retícula completa). El móvil es una composición propia, no la de escritorio encogida.
- **Esquinas rectas** en todo (`--radius: 0`). Cada sección tiene una composición distinta de sus vecinas; ninguna es una rejilla de tarjetas.

## 6. Componentes

| Componente | Reposo | Hover | Pulsado | Foco | Otros |
| --- | --- | --- | --- | --- | --- |
| **Botón** (`Button`) | Relleno de acento, 52 px de alto, texto 600 | Relleno de tinta | Escala 0.97 | Contorno 3 px | Deshabilitado: relleno gris, cursor bloqueado |
| **Enlace de texto** | Tinta, subrayado | Acento | Opacidad 0.7 | Contorno | Enlaces externos avisan a lectores de pantalla |
| **Cabecera** | Sin barra: FR a la izquierda, tres enlaces a la derecha | Subrayado | Opacidad 0.7 | Contorno | Toma la tinta del capítulo que pasa por debajo (transición de 300 ms) |
| **Resaltado** (`mark`) | Fondo plano de acento, blanco o gris con tinta oscura | — | — | — | Marca los datos que busca quien lee en diagonal; máximo uno por línea en móvil |
| **Campo de formulario** | Bloque relleno de `--surface`, etiqueta visible | — | — | Contorno | Error: mensaje bajo el campo en `--error` y `aria-invalid` |
| **Índice de proyectos** | Nombres a tamaño de cartel en gris | Activo en tinta plena | — | Igual que hover | La vista previa cambia con el nombre activo |
| **Pie** | Cuatro columnas arriba; el nombre de margen a margen abajo | — | — | — | — |

Áreas táctiles de 44 px como mínimo. Un control se explica por su forma, su etiqueta y su sitio; si necesita una frase de instrucciones, se rediseña.

## 7. Movimiento

| Token | Valor | Uso |
| --- | --- | --- |
| `--dur-fast` | 150 ms | Hover, pulsado |
| `--dur-base` | 300 ms | Cambio de tinta de la cabecera |
| `--dur-slow` | 600 ms | Entradas de sección |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Todo lo que entra |

- **Gesto principal:** el color por capítulos; la cabecera cambia de tinta justo cuando el borde del campo pasa por debajo.
- **Entradas:** título, luego texto, luego imagen, escalonados 60–90 ms, subiendo 16–32 px con opacidad, una sola vez. El contenido nunca queda oculto si falla el script.
- **Scroll:** mueve la cámara y recompone las partículas; no secuestra el desplazamiento.
- Solo se animan `transform` y `opacity`.
- **`prefers-reduced-motion`:** se conserva el contenido y se elimina el recorrido; la escena 3D queda quieta.

## 8. Lenguaje 3D

- **Un solo objeto:** un cuerpo de partículas (puntos planos, sin brillo ni desenfoque) en la tinta y el acento de la paleta.
- **Formas por capítulo:** monograma FR → campo disperso → dos cúmulos (misión y visión) → rejilla tranquila tras los proyectos → un punto en el contacto.
- **Cámara:** fija; lo que cambia es la forma. El puntero aparta las partículas cercanas.
- **Sin** bloom, sin niebla de colores, sin materiales brillantes, sin modelos importados.
- **Rendimiento:** `dpr` máximo 1.75, menos partículas en móvil, render en pausa con la pestaña oculta, degradación automática si bajan los FPS.
- **Sin WebGL:** la página funciona igual; el fondo queda en color plano.

## 9. Accesibilidad

- Contraste AA: texto ≥ 4.5:1, titulares ≥ 3:1 (la tinta sobre el fondo supera 7:1).
- Todo se usa con teclado en orden de lectura; enlace «Saltar al contenido»; foco siempre visible.
- Un solo `h1` (el nombre) y un título en cada sección.
- El lienzo 3D lleva `aria-hidden` y no recibe foco.
- Etiquetas visibles en los formularios; los errores se anuncian y se asocian a su campo.
- Idioma declarado (`lang="es"`).

## 10. Decisiones que cambiaron respecto al plan inicial

| Plan inicial | Qué se hizo | Motivo |
| --- | --- | --- |
| Tipografía mono para detalles técnicos | Una sola familia de texto | Regla de la casa: la mono fuera de bloques de código es un tic de página generada |
| Bloom y materiales emisivos | Partículas de color plano | Sin brillos ni degradados; además ahorra una dependencia y GPU |
| Tarjetas de proyecto con inclinación 3D | Índice de nombres grandes con vista previa fija | Sin filas de tarjetas idénticas; cinco proyectos se leen mejor como índice |
| Contacto solo con correo en grande | Cupón con formulario | El encargo pide formulario |
| Página entera oscura | Oscura con un campo de acento y uno claro | El color por capítulos hace el trabajo que harían las imágenes |
