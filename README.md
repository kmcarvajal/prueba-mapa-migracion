# No volver — Mapa migratorio

Prueba técnica para implementar un especial interactivo con una apertura, un mapa basado en scroll y una nota final.

## Tecnologías

- HTML5 semántico
- CSS3 responsive
- JavaScript vanilla
- SVG cargado dinámicamente mediante `<object>` para las líneas y `<img>` para las capas visuales.
- Sin frameworks de frontend.
- Sin archivos minificados.

## Cómo ejecutar

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
    ├── secuencia-scroll.md
    ├── revision-visual-xd.md
    ├── activos-originales.md
    └── adobe-xd-export.css
```

## Implementación

El mapa usa un contenedor `sticky` que permanece fijo mientras el usuario hace scroll. JavaScript calcula el progreso del scroll, activa cada etapa y anima las rutas SVG manipulando `strokeDasharray` y `strokeDashoffset` dentro de los SVG cargados con `<object>`.

La experiencia sigue esta secuencia por cada grupo de capas:

1. El mapa base permanece visible.
2. Entra la capa de líneas o marcadores iniciales.
3. Aparece el recuadro informativo de la etapa.
4. Aparecen datos, círculos, etiquetas o elementos complementarios por opacidad.
5. Al avanzar el scroll se cambia a la siguiente etapa.

Los SVG originales se conservaron sin minificar ni optimizar para mantener la fidelidad con el diseño suministrado.

## Documentación incluida

- `docs/bitacora.md`: proceso, decisiones técnicas, dificultades, ajustes y mejoras propuestas.
- `docs/secuencia-scroll.md`: explicación de la lógica de capas y animación.
- `docs/revision-visual-xd.md`: revisión de estilos contra los tokens exportados desde Adobe XD.
- `docs/activos-originales.md`: referencia de los activos utilizados.
- `docs/adobe-xd-export.css`: copia del CSS exportado desde Adobe XD.

## Entrega en GitHub

1. Crear un repositorio en GitHub.
2. Subir todos los archivos de esta carpeta, incluyendo `assets/`, `css/`, `js/` y `docs/`.
3. Verificar que `index.html` quede en la raíz del repositorio.
4. Activar GitHub Pages desde **Settings > Pages** usando la rama `main` y la carpeta `/root`.
5. Probar la URL publicada y revisar que el mapa cargue los SVG correctamente.

## Comandos sugeridos

```bash
git init
git add .
git commit -m "Entrega prueba tecnica mapa migracion"
git branch -M main
git remote add origin https://github.com/USUARIO/prueba-mapa-migracion.git
git push -u origin main
```

Reemplazar `USUARIO` por el usuario real de GitHub y ajustar el nombre del repositorio si se usa otro.
