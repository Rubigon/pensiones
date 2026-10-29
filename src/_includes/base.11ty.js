import { esc } from "./lib.js";

export default function (data) {
  const { site, page } = data;
  const titulo = data.title ? `${data.title} | ${site.nombre}` : `${site.nombre}: ${site.eslogan}`; const descripcion = data.description \vert{}\vert{} site.descripcion; const canonical = site.url.replace(/\/$/, "") + page.url; const cats = data.collections.categoriasConGuias \vert{}\vert{} []; const todas = data.collections.all \vert{}\vert{} []; const hayCalculadora = todas.some((p) => p.url === "/calculadora-edad-jubilacion/"); const info = data.collections.info \vert{}\vert{} [];  const enlaces = [{ url: "/", nombre: "Inicio" }] .concat(cats.map((c) => ({ url: `/${c.slug}/`, nombre: c.nombre })))
    .concat([{ url: "/guias/", nombre: "Todas las guías" }])
    .concat(hayCalculadora ? [{ url: "/calculadora-edad-jubilacion/", nombre: "Calculadora" }] : [])
    .concat(info.filter((p) => p.url === "/sobre-el-proyecto/").map((p) => ({ url: p.url, nombre: "Sobre el proyecto" })));
  
  const nav = enlaces
    .map((e) => `<li><a href="${e.url}"${page.url === e.url ? ' aria-current="page"' : ""}>${esc(e.nombre)}</a></li>`)
    .join("");

  // Enlaces legales del pie de página
  const pieEnlacesBase = info.map((p) => `<li><a href="${p.url}">${esc(p.data.title)}</a></li>`).join("");
  const pieEnlacesLegales = `
    <li><a href="/legal/aviso-legal/">Aviso Legal</a></li>
    <li><a href="/legal/politica-de-privacidad/">Política de Privacidad</a></li>
    <li><a href="/legal/politica-de-cookies/">Política de Cookies</a></li>
  `;
  const pie = pieEnlacesBase + pieEnlacesLegales;

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
<link rel="icon" type="image/png" sizes="32x32" href="/css/favicon.png">
<link rel="apple-touch-icon" href="/css/favicon.png">

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

<!-- Banner CMP de Cookies para AdSense / RGPD -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cookie_consent')) {
      const banner = document.createElement('div');
      banner.id = 'cookie-banner';
      banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#13262f;color:#fff;padding:1rem;z-index:9999;text-align:center;font-size:0.95rem;box-shadow:0 -2px 10px rgba(0,0,0,0.2);';
      banner.innerHTML = \`
        <div style="max-width:1120px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
          <p style="margin:0;text-align:left;flex:1 1 20rem;">Utilizamos cookies propias y de terceros (Google AdSense) para analizar el tráfico y personalizar anuncios. Al navegar por la web aceptas su uso. Consulta nuestra <a href="/legal/politica-de-cookies/" style="color:#fff;text-decoration:underline;">Política de Cookies</a>.</p>
          <div style="display:flex;gap:0.5rem;">
            <button id="accept-cookies" style="background:#0b5c73;color:#fff;border:none;padding:0.5rem 1rem;border-radius:4px;cursor:pointer;font-weight:bold;">Aceptar todas</button>
          </div>
        </div>
      \`;
      document.body.appendChild(banner);
      document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem('cookie_consent', 'accepted');
        banner.remove();
      });
    }
  });
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
        <img src="/css/favicon.png" alt="Pensión Clara Logo" class="site-logo" width="36" height="36">
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
    <p>© ${new Date().getFullYear()}${
