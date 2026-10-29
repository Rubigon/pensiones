# Web de pensiones, jubilación y ayudas (España) — versión JavaScript

Sitio estático generado con **Eleventy** (Node.js). Las plantillas, los datos y la configuración son archivos `.js`; el contenido de las guías se escribe en Markdown. El resultado es HTML rápido, bueno para SEO y fácil de alojar.

**Nombre de trabajo: "Pensión Clara"** (provisional, se cambia en `src/_data/site.js` o con la variable `SITE_NAME`).

## Requisitos
Node.js 18 o superior (https://nodejs.org). En Windows funciona igual desde PowerShell.

## Probar en tu ordenador
```
npm install
npm start        # abre http://localhost:8080 (aquí SÍ se ven los borradores)
```

## Estructura
- `eleventy.config.js` — configuración (en JavaScript).
- `src/_data/site.js` — nombre, dominio, autor y categorías.
- `src/_includes/*.11ty.js` — plantillas en JavaScript (base, artículo, página) y utilidades (`lib.js`).
- `src/*.11ty.js` — portada, categorías, búsqueda, 404, sitemap.xml, robots.txt y calculadora.
- `src/guias/` — **tus guías en Markdown** (copia `content/plantillas/articulo.md`).
- `src/legal/` — páginas legales y del proyecto (BORRADORES con marcadores por rellenar).
- `src/js/` — JavaScript del navegador (buscador y calculadora).
- `scripts/check.js` — comprobación previa a publicar.
- `docs/` — plan editorial, plan de 90 días, checklist de AdSense, fuentes oficiales, plantilla de palabras clave.

## Cómo funcionan los borradores (importante)
Todo lo que tiene `draft: true` se ve con `npm start` pero **no se publica** con `npm run build`. Por eso:
- Las 7 páginas legales y la guía de vida laboral vienen como borrador. Rellena los marcadores (`[NOMBRE_Y_APELLIDOS]`, `[NIF]`, `[DOMICILIO]`, `[EMAIL_DE_CONTACTO]`, `[DOMINIO]`, `[FECHA]`) y borra la línea `draft: true` de cada una para publicarla.
- Las categorías del menú solo aparecen cuando tienen al menos una guía publicada (no hay páginas vacías).
- `npm run check` falla si queda algún marcador `[ENTRE_CORCHETES]` sin rellenar en el sitio generado, y avisa si sigues con el dominio provisional.

## Publicar una guía
1. Copia `content/plantillas/articulo.md` a `src/guias/mi-guia.md` y rellénala.
2. Verifica cada cifra con la fuente oficial. Pon `revisado:` con la fecha real **solo** si lo hiciste ese día.
3. Quita `draft: true`, ejecuta `npm run build` y `npm run check`.

## Antes de publicar nada
- Pon tu **dominio real** (`SITE_URL`) y tu nombre de autor (`SITE_AUTHOR`).
- Calculadora: contrastada con el cuadro oficial de la Seguridad Social el 24-10-2026 (revísala cuando cambie la normativa).
- Sigue `docs/adsense-checklist.md`. No hay anuncios ni banner de cookies incluidos: hará falta un sistema de consentimiento antes de activar publicidad o analítica.

## Subir a GitHub
```
git init
git add .
git commit -m "Paquete inicial"
git branch -M main
git remote add origin <URL-de-tu-repositorio>
git push -u origin main
```
El flujo `.github/workflows/build.yml` construye y comprueba el sitio en cada subida. Para que `check` conozca tu dominio, crea en GitHub la variable de repositorio `SITE_URL` (Settings → Secrets and variables → Actions → Variables).

## Alojarlo
Cualquier alojamiento de sitios estáticos sirve. Como ya usas Cloudflare, una opción natural es **Cloudflare Pages** conectado a este repositorio, con comando de build `npm run build` y carpeta de salida `_site`; define allí `SITE_URL`, `SITE_AUTHOR` y la versión de Node. Comprueba en su documentación los ajustes actuales. Dominio y alojamiento los contratas tú: no se ha comprado nada.

## Estado real
Probado: construcción con Eleventy 3.1.7, generación de portada, categorías, guía, búsqueda, sitemap y robots; omisión de borradores; y que `check` detecta marcadores sin rellenar.
No probado: despliegue real, velocidad, accesibilidad con lector de pantalla, ni el buscador en un navegador real.
