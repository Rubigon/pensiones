import { esc, buscador, fechaEs } from "./_includes/lib.js";

export const data = {
  layout: "base.11ty.js",
  title: "Inicio",
  permalink: "/"
};

// Iconos (SVG en línea) por categoría
const ICONOS = {
  jubilacion: '<path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="9"/>',
  pensiones: '<path d="M3 10l9-6 9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 20h18"/>',
  ayudas: '<path d="M12 21s-7-4.6-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.4-7 10-7 10z"/>',
  tramites: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'
};
const svg = (d, s = 26) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const CSS = `
.home{--accent:#f2b705}
.home-hero{background:linear-gradient(135deg,#083f50 0%,#0b5c73 100%);color:#fff;padding:3.5rem 0 3rem}
.home-hero h1{color:#fff;font-size:clamp(2rem,5vw,3.1rem);margin:0 0 .8rem;max-width:26ch;letter-spacing:-.01em}
.home-hero .lead{font-size:1.25rem;color:#d6e6eb;max-width:38rem;margin:0 0 1.8rem}
.home-hero .search-form{max-width:640px!important;margin:0!important}
.home-hero .search-form input[type=text]{min-height:3.5rem;padding:0 1.1rem;font:inherit;border:2px solid #fff;border-radius:8px;background:#fff;color:var(--ink)}
.home-hero .search-form button[type=submit]{min-height:3.5rem;margin-left:.5rem;background:var(--accent);border-color:var(--accent);color:#13262f;font-weight:700;border-radius:8px}
.home-hero .search-form button[type=submit]:hover{background:#ffd24a;border-color:#ffd24a;color:#13262f}
.home-chips{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin:1.4rem 0 0;padding:0;list-style:none}
.home-chips span.lbl{font-size:.95rem;color:#b9d3db;margin-right:.3rem}
.home-chips a{display:inline-block;padding:.35rem .85rem;border:1px solid rgba(255,255,255,.35);border-radius:999px;color:#fff;font-size:.95rem;text-decoration:none;background:rgba(255,255,255,.08)}
.home-chips a:hover{background:#fff;color:var(--primary-dark)}

.home-trust{background:#fff;border-bottom:1px solid var(--line)}
.home-trust ul{display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:.5rem 1.5rem;list-style:none;margin:0;padding:1rem 0}
.home-trust li{display:flex;align-items:center;gap:.6rem;font-size:.98rem;color:var(--ink-soft);font-weight:600}
.home-trust svg{color:var(--primary);flex:0 0 auto}

.home-sec{padding:3rem 0 0}
.home-sec h2{margin:0 0 .4rem;font-size:clamp(1.5rem,3vw,2rem)}
.home-sec .sub{margin:0 0 1.5rem;color:var(--ink-soft)}

.home-cats{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1.1rem;list-style:none;margin:0;padding:0}
.home-cats a{display:flex;flex-direction:column;gap:.5rem;height:100%;padding:1.4rem;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);text-decoration:none;transition:transform .15s,box-shadow .15s,border-color .15s}
.home-cats a:hover{transform:translateY(-2px);border-color:var(--primary);box-shadow:0 6px 18px rgba(11,92,115,.14)}
.home-cats .ico{display:grid;place-items:center;width:3rem;height:3rem;border-radius:10px;background:#e3f0f4;color:var(--primary)}
.home-cats strong{font:700 1.3rem/1.2 var(--serif);margin-top:.3rem}
.home-cats .d{font-size:1rem;color:var(--ink-soft);line-height:1.5}
.home-cats .n{margin-top:auto;padding-top:.4rem;font-weight:700;font-size:.95rem;color:var(--primary)}

.home-calc{display:grid;grid-template-columns:1fr auto;gap:1.5rem;align-items:center;margin-top:3rem;padding:1.8rem 2rem;border-radius:12px;background:var(--ok-bg);border:1px solid #b6dcc3}
.home-calc h2{margin:0 0 .3rem;font-size:1.5rem}
.home-calc p{margin:0;color:var(--ink-soft)}
.home-calc .btn{white-space:nowrap}

.home-guias{display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:1.1rem;list-style:none;margin:0;padding:0}
.home-guias a{display:flex;flex-direction:column;gap:.45rem;height:100%;padding:1.3rem;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);text-decoration:none;transition:transform .15s,box-shadow .15s,border-color .15s}
.home-guias a:hover{transform:translateY(-2px);border-color:var(--primary);box-shadow:0 6px 18px rgba(11,92,115,.14)}
.home-guias .tag{align-self:flex-start;font-size:.78rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--primary);background:#e3f0f4;border-radius:4px;padding:.15rem .55rem}
.home-guias strong{font:700 1.15rem/1.3 var(--serif)}
.home-guias a:hover strong{color:var(--primary)}
.home-guias .d{font-size:.98rem;color:var(--ink-soft);line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.home-guias time{margin-top:auto;padding-top:.4rem;font-size:.9rem;color:var(--ink-soft)}
.home-more{margin:1.6rem 0 0;text-align:center}

.home-how{margin-top:3.5rem;padding:3rem 0;background:var(--surface);border-block:1px solid var(--line)}
.home-how .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1.5rem;margin-top:1.5rem}
.home-how .step{background:#fff;border:1px solid var(--line);border-radius:10px;padding:1.4rem}
.home-how .num{display:grid;place-items:center;width:2.2rem;height:2.2rem;border-radius:50%;background:var(--primary);color:#fff;font-weight:700;margin-bottom:.6rem}
.home-how h3{margin:0 0 .4rem;font-size:1.15rem}
.home-how p{margin:0;font-size:1rem;color:var(--ink-soft)}
.home-how .more{margin:1.5rem 0 0}

.home-faq{padding:3rem 0 3.5rem}
.home-faq details{border:1px solid var(--line);border-radius:8px;padding:.2rem 1.2rem;margin:.6rem 0;background:#fff;max-width:52rem}
.home-faq summary{font-weight:600;cursor:pointer;padding:.85rem 0;min-height:44px}
.home-faq details[open] summary{color:var(--primary)}
.home-faq details p{margin:0 0 1rem;color:var(--ink-soft)}

@media (max-width:700px){
  .home-hero{padding:2.2rem 0 2rem}
  .home-hero .search-form > div{flex-wrap:wrap}
  .home-hero .search-form button[type=submit]{margin:.5rem 0 0;width:100%;justify-content:center}
  .home-calc{grid-template-columns:1fr;padding:1.4rem}
  .home-calc .btn{justify-content:center}
}
`;

export default function (data) {
  const guias = [...(data.collections.guias || [])].sort((a, b) => b.date - a.date);
  const cats = data.collections.categoriasConGuias || [];
  const hayCalculadora = (data.collections.all || []).some((p) => p.url === "/calculadora-edad-jubilacion/");
  const nombreCat = (slug) => (data.site.categorias.find((c) => c.slug === slug) || {}).nombre || "";

  // Consultas frecuentes (solo aparecen las que existen)
  const populares = [
    ["edad-de-jubilacion", "Edad de jubilación"],
    ["pension-de-viudedad", "Pensión de viudedad"],
    ["vida-laboral", "Vida laboral"],
    ["ingreso-minimo-vital", "Ingreso Mínimo Vital"],
    ["incapacidad-temporal", "Baja médica"],
    ["minimo-15-anos-cotizados", "15 años cotizados"]
  ]
    .map(([slug, label]) => {
      const g = guias.find((x) => x.fileSlug === slug);
      return g ? `<li><a href="${g.url}">${esc(label)}</a></li>` : "";
    })
    .join("");

  const tarjetasCat = cats
    .map(
      (c) => `<li><a href="/${c.slug}/">
  <span class="ico">${svg(ICONOS[c.slug] || ICONOS.tramites)}</span>
  <strong>${esc(c.nombre)}</strong>
  <span class="d">${esc(c.descripcion)}</span>
  <span class="n">${c.guias.length} ${c.guias.length === 1 ? "guía" : "guías"} →</span>
</a></li>`
    )
    .join("");

  const tarjetasGuias = guias
    .slice(0, 6)
    .map(
      (g) => `<li><a href="${g.url}">
  <span class="tag">${esc(nombreCat(g.data.categoria))}</span>
  <strong>${esc(g.data.title)}</strong>
  ${g.data.description ? `<span class="d">${esc(g.data.description)}</span>` : ""}
  <time>${fechaEs(g.date)}</time>
</a></li>`
    )
    .join("");

  const check = svg('<path d="M20 6L9 17l-5-5"/>', 22);
  const faq = [
    ["¿Es esta una web oficial de la Seguridad Social?", "No. Pensión Clara es un proyecto informativo e independiente. No representa al INSS, a la Seguridad Social ni a ninguna administración pública, y no tramita solicitudes."],
    ["¿Puedo solicitar mi pensión o prestación desde aquí?", "No. Aquí te explicamos requisitos y pasos; la solicitud se hace siempre en los canales oficiales, como la sede electrónica de la Seguridad Social, y cada guía enlaza con la fuente oficial correspondiente."],
    ["¿Cómo sé que la información está actualizada?", "Cada guía indica la fecha de su última revisión y las fuentes oficiales en las que se basa. Aun así, las normas y cuantías pueden cambiar, así que comprueba siempre la fuente oficial antes de tomar una decisión."],
    ["¿Las guías sirven como asesoramiento personalizado?", "No. Son información general. Tu caso depende de tu vida laboral, tus bases de cotización y otras circunstancias, por lo que ante cualquier duda conviene consultar con la Seguridad Social o con un profesional."]
  ];
  const faqHtml = faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
  });

  return `<style>${CSS}</style>
<div class="home">
<section class="home-hero">
  <div class="wrap">
    <h1>Información clara sobre pensiones y prestaciones</h1>
    <p class="lead">Guías actualizadas sobre la Seguridad Social: requisitos, cuantías y trámites explicados paso a paso, con fuentes oficiales.</p>
    ${buscador()}
    ${populares ? `<ul class="home-chips"><li><span class="lbl">Consultas frecuentes:</span></li>${populares}</ul>` : ""}
  </div>
</section>

<section class="home-trust" aria-label="Por qué confiar">
  <div class="wrap"><ul>
    <li>${check} Basado en fuentes oficiales</li>
    <li>${check} Fecha de revisión en cada guía</li>
    <li>${check} Lenguaje claro, sin tecnicismos</li>
    <li>${check} Proyecto independiente</li>
  </ul></div>
</section>

<div class="wrap">
  <section class="home-sec">
    <h2>Explora por temas</h2>
    <p class="sub">Encuentra rápido la información que necesitas.</p>
    <ul class="home-cats">${tarjetasCat}</ul>
  </section>

  ${
    hayCalculadora
      ? `<aside class="home-calc">
    <div>
      <h2>Calculadora de edad de jubilación</h2>
      <p>Descubre a qué edad podrías jubilarte según tu año de nacimiento y los años cotizados.</p>
    </div>
    <a class="btn" href="/calculadora-edad-jubilacion/">Calcular mi edad →</a>
  </aside>`
      : ""
  }

  <section class="home-sec">
    <h2>Últimas guías publicadas</h2>
    <p class="sub">Contenido nuevo y revisado, siempre con la fuente oficial al final.</p>
    <ul class="home-guias">${tarjetasGuias}</ul>
    <p class="home-more"><a class="btn btn-quiet" href="/guias/">Ver todas las guías</a></p>
  </section>
</div>

<section class="home-how">
  <div class="wrap">
    <h2>Cómo trabajamos</h2>
    <div class="grid">
      <div class="step"><span class="num">1</span><h3>Partimos de fuentes oficiales</h3><p>Cada guía se basa en la normativa y en las páginas de la Seguridad Social, y enlaza con ellas para que puedas comprobarlo.</p></div>
      <div class="step"><span class="num">2</span><h3>Lo explicamos en claro</h3><p>Requisitos, cuantías y plazos con ejemplos y sin jerga, para que entiendas qué te afecta y cuáles son tus opciones.</p></div>
      <div class="step"><span class="num">3</span><h3>Indicamos cuándo se revisó</h3><p>Cada guía muestra su fecha de revisión. Si algo cambia, lo actualizamos.</p></div>
    </div>
    <p class="more"><a href="/metodologia-y-fuentes/">Conoce nuestra metodología y fuentes →</a></p>
  </div>
</section>

<section class="home-faq">
  <div class="wrap">
    <h2>Preguntas frecuentes</h2>
    ${faqHtml}
  </div>
</section>
</div>
<script type="application/ld+json">${faqSchema}</script>`;
}
