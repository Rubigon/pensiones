import { esc } from "./lib.js";

export default function (data) {
  const { site, page } = data;
  const titulo = data.title ? `${data.title} | ${site.nombre}` : (site.tituloInicio || `${site.nombre}: ${site.eslogan}`);
  const descripcion = data.description || site.descripcion;
  const canonical = site.url.replace(/\/$/, "") + page.url;
  const cats = data.collections.categoriasConGuias || [];
  const todas = data.collections.all || [];
  const hayCalculadora = todas.some((p) => p.url === "/calculadora-edad-jubilacion/");
  const info = data.collections.info || [];

  const enlaces = [{ url: "/", nombre: "Inicio" }]
    .concat(cats.map((c) => ({ url: `/${c.slug}/`, nombre: c.nombre })))
    .concat([{ url: "/guias/", nombre: "Todas las guías" }])
    .concat(hayCalculadora ? [{ url: "/calculadora-edad-jubilacion/", nombre: "Calculadora" }] : [])
    .concat(info.filter((p) => p.url === "/sobre-el-proyecto/").map((p) => ({ url: p.url, nombre: "Sobre el proyecto" })));
  const nav = enlaces
    .map((e) => `<li><a href="${e.url}"${page.url === e.url ? ' aria-current="page"' : ""}>${esc(e.nombre)}</a></li>`)
    .join("");
  const pie = info.map((p) => `<li><a href="${p.url}">${esc(p.data.title)}</a></li>`).join("");
  const partes = site.nombre.trim().split(" ");
  const ultima = partes.length > 1 ? partes.pop() : "";
  const marca = `<a class="brand" href="/" aria-label="${esc(site.nombre)}, ir al inicio">
      <img class="brand-icon" src="/img/logo-circular.png" width="48" height="48" alt="">
      <span class="brand-name">${esc(partes.join(" "))}${ultima ? ` <span class="brand-accent">${esc(ultima)}</span>` : ""}</span></a>`;
  const jsonld = page.url === "/"
    ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: site.nombre, url: site.url.replace(/\/$/, "") + "/", inLanguage: "es" })}</script>`
    : "";
  const imagen = site.url.replace(/\/$/, "") + "/img/og-image.png";
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
<meta name="theme-color" content="#1b6b45">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/img/icono.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${esc(site.nombre)}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(imagen)}">
<meta name="twitter:card" content="summary_large_image">
${jsonld}
<link rel="stylesheet" href="/css/style.css">
</head>
<body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<div class="notice-bar"><div class="wrap">Web informativa independiente. No es un sitio oficial ni representa a la Seguridad Social ni a ninguna administración pública.</div></div>
<header class="site-header">
  <div class="wrap top-row">
    <p class="site-title">${marca}</p>
    <form role="search" method="get" class="header-search" action="/buscar/">
      <label class="sr-only" for="hq">Buscar en la web</label>
      <input type="search" id="hq" name="q" placeholder="Buscar: viudedad, vida laboral…">
      <button type="submit">Buscar</button>
    </form>
  </div>
  <nav class="main-nav" aria-label="Menú principal"><div class="wrap"><ul>${nav}</ul></div></nav>
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
