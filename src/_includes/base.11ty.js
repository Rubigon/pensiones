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

  const enlaces = [{ url: "/", nombre: "Inicio" }]
    .concat(cats.map((c) => ({ url: `/${c.slug}/`, nombre: c.nombre })))
    .concat([{ url: "/guias/", nombre: "Todas las guías" }])
    .concat(hayCalculadora ? [{ url: "/calculadora-edad-jubilacion/", nombre: "Calculadora" }] : [])
    .concat(info.filter((p) => p.url === "/sobre-el-proyecto/").map((p) => ({ url: p.url, nombre: "Sobre el proyecto" })));
  const nav = enlaces
    .map((e) => `<li><a href="${e.url}"${page.url === e.url ? ' aria-current="page"' : ""}>${esc(e.nombre)}</a></li>`)
    .join("");
  const pie = info.map((p) => `<li><a href="${p.url}">${esc(p.data.title)}</a></li>`).join("");
  const scripts = (data.scripts || []).map((s) => `<script src="${s}" defer></script>`).join("\n");

  const schemaJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": site.nombre,
    "url": site.url,
    "description": descripcion,
    "inLanguage": "es-ES"
  });

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<link rel="canonical" href="${esc(canonical)}">
${data.noindex ? '<meta name="robots" content="noindex">' : ""}

<!-- Favicon oficial para la pestaña y Google Search -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
<link rel="apple-touch-icon" href="/favicon.png">

<link rel="stylesheet" href="/css/style.css">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7130325054342047" crossorigin="anonymous"></script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FLXCGHPV5Y"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FLXCGHPV5Y');
</script>

<!-- SEO Schema Markup -->
<script type="application/ld+json">
${schemaJSON}
</script>
</head>
<body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<div class="notice-bar"><div class="wrap">Web informativa independiente. No es un sitio oficial ni representa a la Seguridad Social ni a ninguna administración pública.</div></div>
<header class="site-header">
  <div class="wrap top-row">
    <p class="site-title">
      <a href="/" style="display: inline-flex; align-items: center; gap: 8px;">
        <img src="/favicon.png" alt="Pensión Clara Logo" class="site-logo" width="36" height="36">
        <span>${esc(site.nombre)}</span>
      </a>
    </p>
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
