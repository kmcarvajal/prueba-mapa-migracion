# Revisión visual contra CSS exportado desde Adobe XD

## Hallazgos principales

| Elemento | Estado antes del ajuste | Ajuste realizado |
| --- | --- | --- |
| Paleta base | El proyecto ya coincidía parcialmente con `#ED1C24` y `#2F89AE`, pero usaba fondos más oscuros no presentes en el export. | Se conectaron los fondos y textos a `#1A2125`, `#222C31`, `#3F6F8A`, `#74A0B1`, `#92A6AD` y `#E6E6E6`. |
| Tipografía | La versión inicial combinaba `source-code-pro` y `proxima-nova`. | Se migró la familia principal a `Meta Pro`, cargada con el enlace Typekit entregado. |
| Estilos de nota | El cierre de nota tenía tamaños y colores aproximados. | Se aplicaron las clases equivalentes a `titulo-nota`, `sumario-nota`, `texto-nota` e `intertitulo`. |
| Encabezado y UI | El encabezado usaba un azul grisáceo propio. | Se alineó al token `#222C31` y a texto `#E6E6E6`. |
| Panel del mapa | El panel lateral usaba un color translúcido propio. | Se ajustó a una mezcla translúcida basada en `#3F6F8A` y borde `#74A0B1`. |

## Normalización técnica

El CSS exportado por Adobe XD incluía algunos valores que son útiles como referencia, pero no ideales para navegador: por ejemplo, `font-weight: 300px` y `font-weight: medium`. En `css/xd-reference.css` se normalizaron a `300` y `500` respectivamente.

## Archivos modificados

- `index.html`: se agregó `css/xd-reference.css` antes de `css/styles.css` y se añadieron clases visuales a la nota.
- `css/xd-reference.css`: nuevo archivo con tokens visuales normalizados.
- `css/styles.css`: actualización de variables, tipografías, colores de fondo, texto, encabezado, panel del mapa y nota final.
- `docs/adobe-xd-export.css`: copia exacta del CSS recibido.
- `docs/bitacora.md`: registro de la decisión técnica.
