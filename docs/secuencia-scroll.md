# Secuencia de scroll del mapa

El mapa conserva siempre visible el archivo base `0-MAPA-BASE.svg`.

Para cada carpeta numerada del 1 al 6 se cargan las capas en este orden:

1. **Capa 1**: líneas o marcadores iniciales.
2. **Capa 2**: recuadro informativo ubicado en el costado izquierdo. Este panel entra desde abajo y sale hacia arriba durante el avance del scroll.
3. **Capa 3**: datos, etiquetas, gráficas o elementos complementarios del mapa.

Las líneas se animan con `stroke-dasharray` y `stroke-dashoffset`. Esta técnica oculta inicialmente el trazo completo y luego reduce progresivamente el desplazamiento del trazo para que parezca dibujarse desde el origen hasta el destino.

Los SVG originales suministrados se mantienen sin optimización ni edición interna. Los ajustes de posición y movimiento se aplican únicamente desde CSS y JavaScript.
