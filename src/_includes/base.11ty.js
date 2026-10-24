import { esc } from "./lib.js";

export default function (data) {
  const { site, page } = data;
  const titulo = data.title ? `${data.title} | ${site.nombre}` : `${site.nombre}: ${site.eslogan}`;
  const descripcion = data.description || site.descripcion;
  const canonical = site.url.replace(/\/$/, "") + page.url;
  const cats = data.collections.categoriasConGuias || [];
  const todas = data.collections.all || [];
  const hayCalculadora = todas.some((p) => p.url === "/calculadora-edad-jubilacion/");
  const info = data.collections.info || [];

  const nav = cats
    .map((c) => `<li><a href="/${c.slug}/"${page.url === `/${c.slug}/` ? ' aria-current="page"' : ""}>${esc(c.nombre)}</a></li>`)
    .join("") + (hayCalculadora ? `<li><a href="/calculadora-edad-jubilacion/">Calculadora</a></li>` : "");
  const pie = info.map((p) => `<li><a href="${p.url}">${esc(p.data.title)}</a></li>`).join("");
  const scripts = (data.scripts || []).map((s) => `<script src="${s}" defer></script>`).join("\n");

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<link rel="canonical" href="${esc(canonical)}">
${data.noindex ? '<meta name="robots" content="noindex">' : ""}
<link rel="stylesheet" href="/css/style.css">
</head>
<body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<div class="notice-bar"><div class="wrap">Web informativa independiente. No es un sitio oficial ni representa a la Seguridad Social ni a ninguna administración pública.</div></div>
<header class="site-header">
  <div class="wrap">
    <p class="site-title"><a href="/">${esc(site.nombre)}</a></p>
    <nav class="main-nav" aria-label="Menú principal"><ul>${nav}</ul></nav>
  </div>
</header>
<main id="contenido">
${data.content}
</main>
<footer class="site-footer">
  <div class="wrap">
    <strong>${esc(site.nombre)}</strong>
    <nav aria-label="Información legal y del proyecto"><ul>${pie}</ul></nav>
    <p class="independence">Proyecto independiente de carácter informativo. No representa a la Seguridad Social, al INSS, al IMSERSO ni a ninguna otra administración pública, y no tramita solicitudes. Para cualquier gestión, acude a las sedes oficiales. La información puede cambiar: comprueba siempre la fuente oficial.</p>
    <p>© ${new Date().getFullYear()} ${esc(site.nombre)}</p>
  </div>
</footer>
${scripts}
</body>
</html>`;
}
