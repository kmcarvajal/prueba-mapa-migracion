# No volver — Mapa migratorio

Prueba técnica para implementar un especial interactivo con una apertura, un mapa basado en scroll y una nota final.

## Tecnologías

- HTML5 semántico
- CSS3 responsive
- JavaScript vanilla
- SVG cargado dinámicamente mediante `<object>` para las líneas y `<img>` para las capas visuales.
- Sin frameworks de frontend.

## Cómo Visualizar, ejecutar

Demo publicada para visualización:
https://kmcarvajal.github.io/prueba-mapa-migracion/

Repositorio para descargar del proyecto:
https://github.com/kmcarvajal/prueba-mapa-migracion

Los SVG del mapa se cargan como recursos externos. Para evitar bloqueos del navegador por rutas locales, se recomienda abrir el proyecto con un servidor local desde la carpeta raíz del proyecto:

```bash
python -m http.server 5500
```

Luego abrir en el navegador:

```txt
http://localhost:5500
```

También puede usarse la extensión **Live Server** de VS Code.

## Estructura

```txt
.
├── index.html
├── css/
│   ├── styles.css
│   └── xd-reference.css
├── js/
│   └── main.js
├── assets/
│   ├── img/
│   │   └── hero-no-volver.jpg
│   └── svg/
│       └── SVGs Prueba/
│           ├── 0-MAPA-BASE.svg
│           ├── raton-scroll.svg
│           └── Mapas-Desktop/
│               ├── 1- POR DONDE SE VAN/
│               ├── 2- POR DONDE REGRESAN/
│               ├── 3- REMESAS/
│               ├── 4- EGRESOS REMESAS/
│               ├── 5- CANCILLERIA/
│               └── 6- TESTIMONIOS/
└── docs/
    ├── bitacora.md
    └── adobe-xd-export.css
```

## Implementación

El mapa usa un contenedor `sticky` que permanece fijo mientras el usuario hace scroll. JavaScript calcula el progreso del scroll, activa cada etapa y anima las rutas SVG manipulando `strokeDasharray` y `strokeDashoffset` dentro de los SVG cargados con `<object>`.

La experiencia sigue esta secuencia por cada grupo de capas:

1. El mapa base permanece visible.
2. Entra la capa de líneas o marcadores iniciales.
3. Aparece el recuadro informativo de la etapa.
4. Aparecen datos, círculos, elementos complementarios por opacidad.
5. Al avanzar el scroll se cambia a la siguiente etapa.

## Documentación incluida

- `docs/bitacora.md`: proceso, decisiones técnicas, dificultades y mejoras propuestas.
- `docs/adobe-xd-export.css`: copia del CSS exportado desde Adobe XD.

