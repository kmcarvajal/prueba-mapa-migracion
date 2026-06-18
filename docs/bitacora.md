# Bitácora del proyecto

## Objetivo

Implementar un especial interactivo que muestre el proceso migratorio de colombianos al exterior mediante un mapa animado basado en scroll. La experiencia inicia con una apertura visual, continúa con el mapa por capas y termina con una nota de texto.

## Revisión de recursos

Se revisaron los archivos entregados:

- `Prueba Desarrollador.pdf`: documento con el caso, condiciones y entregables.
- `Irse_mapa-Prueba.ai`: archivo fuente del mapa en Adobe Illustrator.
- `SVGs Prueba.zip`: recursos SVG separados por capas.
- `Visualización.mp4`: referencia de comportamiento esperado del mapa.
- `Capturas Adobe xd.zip`: capturas de la apertura, mapa y cierre de nota.

## Decisiones técnicas

### 1. HTML, CSS y JavaScript vanilla

La prueba indica que no se evaluará directamente sobre frameworks como React, Angular, Next o Vue. Por eso se construyó una versión estática con HTML, CSS y JavaScript puro.

### 2. Carga diferenciada de SVG

Las líneas del mapa deben animarse desde el país de origen hasta el destino. Si las capas de líneas se insertan como `<img>`, no es posible manipular directamente sus trazos internos. Por eso las capas de líneas se cargan mediante `<object>`, lo que permite acceder al documento SVG y animar sus elementos `<path>` sin mezclar estilos entre archivos. Las demás capas visuales se cargan como imágenes SVG normales.

### 3. Animación por `strokeDasharray` y `strokeDashoffset`

Cada ruta del SVG se inicializa con su longitud total. Durante el scroll, JavaScript modifica el `strokeDashoffset` para simular que la línea se dibuja progresivamente.

### 4. Aparición de círculos, datos y recuadros por opacidad

Después de que las líneas alcanzan una parte avanzada de la animación, los elementos complementarios aparecen con transición de opacidad, respetando la indicación de que los círculos deben aparecer después de la línea.

### 5. Uso de SVG originales

Por solicitud de mantener fidelidad con el material entregado, se usan los SVG originales de `SVGs Prueba.zip`, sin remover metadatos ni ejecutar procesos de optimización sobre los archivos activos. La carpeta se conserva como `assets/svg/SVGs Prueba/` y se respeta el orden actualizado de carpetas y archivos: mapa base `0-MAPA-BASE.svg`, y luego grupos del 1 al 6 con capas numeradas.

### 6. Integración del CSS exportado desde Adobe XD

Se agregó el archivo `Prueba Desarrollador.css` como referencia visual del proyecto. Para conservar trazabilidad se dejó una copia exacta en `docs/adobe-xd-export.css`. Además, se creó `css/xd-reference.css`, donde se normalizaron los tokens para uso en navegador y se conectaron con `styles.css` mediante variables semánticas. Este archivo se carga antes de `styles.css` desde `index.html`.

A partir de esta integración se ajustaron los colores principales, el fondo, el encabezado, los textos de la nota, los intertítulos y la familia tipográfica principal para acercarlos a los estilos definidos en Adobe XD.

## Dificultades encontradas

- El diseño original viene como referencia en Adobe XD y video, pero no se cuenta con una especificación exacta de medidas, tiempos o breakpoints. Se ajustó la interfaz con base en las capturas y el video.
- Algunos textos dentro de los SVG están convertidos a trazos, por lo que se priorizó la fidelidad visual sobre la edición textual interna.
- La capa de testimonios se implementó como visualización progresiva de los SVG suministrados. Una mejora futura sería abrir lightboxes reales por marcador, si esa interacción se requiere.

## Mejoras propuestas

- Agregar interacción real en la sección de testimonios.
- Incorporar controles de teclado para avanzar o retroceder entre capas.
- Añadir versión mobile con assets específicos si el diseño original los contempla.
- Implementar una carga diferida por etapa si se necesita mejorar el tiempo inicial de carga conservando los SVG originales.
- Reemplazar la apertura temporal por el asset original final en caso de recibirlo separado del archivo de diseño.

## Estado final

La entrega contiene una implementación funcional del flujo requerido: apertura, mapa con scroll, animación de líneas, aparición de capas SVG por opacidad y cierre con nota de texto. También se retiró el recuadro informativo construido sobre el mapa para que durante esa sección solo se visualicen los SVG suministrados. El código queda organizado y documentado para revisión técnica.

## Ajuste posterior a revisión visual

Se actualizó la implementación para usar la nueva carpeta `SVGs Prueba.zip`, donde el mapa base se llama `0-MAPA-BASE.svg` y las capas están agrupadas del 1 al 6. También se eliminó el recuadro informativo superpuesto que había sido construido con HTML/CSS, porque no hacía parte de los SVG de diseño. Durante el recorrido del mapa, la interfaz muestra únicamente el SVG base y las capas SVG del material suministrado.

## Ajuste de secuencia y posición de recuadros

Se ajustó la lógica del mapa para que cada grupo respete el orden visual indicado por diseño: mapa base permanente, capa 1 de líneas, capa 2 de recuadro informativo y capa 3 de datos. Los recuadros informativos se animan verticalmente desde la parte inferior hacia la parte superior, simulando el comportamiento observado en el video de referencia.

También se corrigió el caso de la sección de testimonios, donde el archivo `2-TESTIMONIOS-REC.svg` tiene un tamaño propio diferente al lienzo general de 1920 x 1020. Para evitar que se escalara al centro del mapa, se ubicó como panel flotante en el costado izquierdo sin modificar el SVG original.

## Ajuste de cierre solicitado
- Se dejó el desplazamiento vertical únicamente para las capas #2 de cada carpeta, que corresponden a los recuadros informativos.
- Las capas #3 quedan fijas en su posición original y solo aparecen por opacidad.
- Se retiró el `vector-effect: non-scaling-stroke` que estaba alterando visualmente el grosor de las líneas respecto al SVG original.
- Se ajustó la animación de trazos para respetar el sentido Colombia → destino cuando el trazo original viene dibujado en sentido contrario.
- El indicador de scroll queda fijo, sin sacudida o animación, y se oculta después de los dos primeros tramos del mapa.


## Ajuste final de dirección y transición
- Las capas de líneas de las carpetas 2 y 3 se configuraron para dibujarse desde el exterior hacia Colombia.
- La capa 2 de Testimonios entra desde abajo y se detiene; no continúa saliendo por la parte superior.
- Se amplió el recorrido de scroll del mapa y se extendió la interpolación de los recuadros para suavizar su movimiento.

## Corrección final de líneas
- Se restauró la carga de las capas de líneas mediante `<object>` para aislar los estilos internos de cada SVG.
- Esto evita que las clases genéricas exportadas desde Illustrator (`.cls-1`, `.cls-2`, etc.) se pisen entre capas y mezclen colores o trazos.
- Se conservan los ajustes de dirección para las carpetas 2 y 3, y se mantiene la animación por `stroke-dasharray` / `stroke-dashoffset` dentro del documento SVG cargado.

## Limpieza final de contenido sobrante
- Se retiró el bloque HTML adicional de descripción del mapa (`step-caption`) y el auxiliar de scroll textual para que la sección del mapa solo muestre los SVG y el indicador de desplazamiento original.
- Se restauró el texto completo de la nota final.
- Se ajustó la nota final para conservar una barra vertical interna de lectura, como en la referencia de Adobe XD.
