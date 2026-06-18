# Bitácora del proyecto

## Objetivo

Implementar un especial interactivo que muestre el proceso migratorio de colombianos al exterior mediante un mapa animado basado en scroll. La experiencia inicia con una apertura visual, continúa con el mapa por capas y termina con una nota de texto.

## Revisión de recursos

Se revisaron los archivos entregados:

- `Prueba Desarrollador.pdf`: documento con el caso, condiciones y entregables.
- `Irse_mapa-Prueba.ai`: archivo fuente del mapa en Adobe Illustrator.
- `SVGs Prueba.zip`: recursos SVG separados por capas.
- `Visualización.mp4`: referencia de comportamiento esperado del mapa.
- `Visualización Adobe xd`: archivo fuente de pertura, mapa y cierre de nota.

## Decisiones técnicas

### 1. HTML, CSS y JavaScript vanilla

La prueba indica que no se evaluará directamente sobre frameworks como React, Angular, Next o Vue. Por eso se construyó una versión estática con HTML, CSS y JavaScript.

### 2. Carga diferenciada de SVG

Las líneas del mapa deben animarse desde el país de origen hasta el destino. Si las capas de líneas se insertan como `<img>`, no es posible manipular directamente sus trazos internos. Por eso las capas de líneas se cargan mediante `<object>`, lo que permite acceder al documento SVG y animar sus elementos `<path>` sin mezclar estilos entre archivos. Las demás capas visuales se cargan como imágenes SVG normales.

### 3. Animación por `strokeDasharray` y `strokeDashoffset`

Cada ruta del SVG se inicializa con su longitud total. Durante el scroll, JavaScript modifica el `strokeDashoffset` para simular que la línea se dibuja progresivamente.

### 4. Aparición de círculos, datos y recuadros por opacidad

Después de que las líneas alcanzan una parte avanzada de la animación, los elementos complementarios aparecen con transición de opacidad, respetando la indicación de que los círculos deben aparecer después de la línea.

### 5. Uso de SVG

Se usan los SVG de `SVGs Prueba.zip`. La carpeta se conserva como `assets/svg/SVGs Prueba/` y se respeta el orden actualizado de carpetas y archivos: mapa base `0-MAPA-BASE.svg`, y luego grupos del 1 al 6 con capas numeradas.

### 6. Integración del CSS exportado desde Adobe XD

Se agregó el archivo `Prueba Desarrollador.css` como referencia visual del proyecto. Para conservar trazabilidad se dejó una copia exacta en `docs/adobe-xd-export.css`. Además, se creó `css/xd-reference.css`, donde se normalizaron los tokens para uso en navegador y se conectaron con `styles.css` mediante variables semánticas. Este archivo se carga antes de `styles.css` desde `index.html`.

A partir de esta integración se ajustaron los colores principales, el fondo, el encabezado, los textos de la nota, los intertítulos y la familia tipográfica principal para acercarlos a los estilos definidos en Adobe XD.

## Dificultades encontradas

- Se ajustó la interfaz con base en las capturas y el video.

## Mejoras propuestas

- Añadir versión mobile con assets específicos si el diseño original los contempla.

## Estado final

La entrega contiene una implementación funcional del flujo requerido: apertura, mapa con scroll, animación de líneas, aparición de capas SVG por opacidad y cierre con nota de texto. El código queda organizado y documentado para revisión técnica.


# Uso de activos originales

## Decisión

El proyecto utiliza directamente los archivos SVG suministrados en `SVGs Prueba.zip`, conservando nombres, carpetas y contenido original.

La carpeta funcional queda en:

```txt
assets/svg/SVGs Prueba/
```

## Mapa base

El fondo principal del mapa se carga desde:

```txt
assets/svg/SVGs Prueba/Mapas-Desktop/0-MAPA-BASE.svg
```

## Orden de capas

Las carpetas del 1 al 6 se leen en el orden entregado. Para las carpetas del 1 al 5, el archivo `1-...-LIN.svg` se usa para la animación de líneas, y los archivos `2-...` y `3-...` aparecen por opacidad.


## Secuencia de scroll del mapa

El mapa conserva siempre visible el archivo base `0-MAPA-BASE.svg`.

Para cada carpeta numerada del 1 al 6 se cargan las capas en este orden:

1. **Capa 1**: líneas o marcadores iniciales.
2. **Capa 2**: recuadro informativo ubicado en el costado izquierdo. Este panel entra desde abajo y sale hacia arriba durante el avance del scroll.
3. **Capa 3**: datos, etiquetas, elementos complementarios del mapa.

Las líneas se animan con `stroke-dasharray` y `stroke-dashoffset`. Esta técnica oculta inicialmente el trazo completo y luego reduce progresivamente el desplazamiento del trazo para que parezca dibujarse desde el origen hasta el destino.

Los ajustes de posición y movimiento se aplican únicamente desde CSS y JavaScript.
