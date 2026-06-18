# Uso de activos originales

## Decisión

El proyecto utiliza directamente los archivos SVG suministrados en `SVGs Prueba.zip`, conservando nombres, carpetas y contenido original.

No se removieron metadatos de Illustrator ni se ejecutó optimización sobre los SVG activos del proyecto. La carpeta funcional queda en:

```txt
assets/svg/SVGs Prueba/
```

## Mapa base

El fondo principal del mapa se carga desde:

```txt
assets/svg/SVGs Prueba/Mapas-Desktop/0-MAPA-BASE.svg
```

## Orden de capas

Las carpetas del 1 al 6 se leen en el orden entregado. Para las carpetas del 1 al 5, el archivo `1-...-LIN.svg` se usa para la animación de líneas, y los archivos `2-...` y `3-...` aparecen por opacidad. Para testimonios se respeta el orden `1`, `2`, `3` definido en la carpeta actualizada.

## Recuadro informativo retirado

Se eliminó el recuadro de texto construido en HTML/CSS durante la etapa de mapa. La visualización del mapa queda compuesta únicamente por el SVG base y las capas SVG suministradas.
