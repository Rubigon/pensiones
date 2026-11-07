import { esc, fechaEs } from "./_includes/lib.js";

export const data = {
  layout: "base.11ty.js",
  title: "Inicio",
  permalink: "/"
};

export default function (data) {
  const guias = [...(data.collections.guias || [])].sort((a, b) => b.date - a.date);
  const cats = data.collections.categoriasConGuias || [];
  const hayCalculadora = (data.collections.all || []).some((p) => p.url === "/calculadora-edad-jubilacion/");
  const nombreCat = (slug) => (data.site.categorias.find((c) => c.slug === slug) || {}).nombre || "";

  const tarjetasCat = cats
    .map(
      (c) => `<li><a href="/${c.slug}/" class="card-categoria">
  <strong>${esc(c.nombre)}</strong>
  <span>${esc(c.descripcion)}</span>
  <em>${c.guias.length} ${c.guias.length === 1 ? "guía" : "guías"} →</em>
</a></li>`
    )
    .join("");

  const tarjetasGuias = guias
    .slice(0, 6)
    .map(
      (g) => `<li><a href="${g.url}" class="card-guia">
  <span class="tag">${esc(nombreCat(g.data.categoria))}</span>
  <strong>${esc(g.data.title)}</strong>
  ${g.data.description ? `<span class="desc">${esc(g.data.description)}</span>` : ""}
  <time class="meta">${fechaEs(g.date)}</time>
</a></li>`
    )
    .join("");

  return `<section class="hero">
  <div class="wrap">
    <h1>Información clara sobre pensiones y prestaciones</h1>
    <p class="lead">Guías actualizadas sobre la Seguridad Social, requisitos y trámites paso a paso.</p>
  </div>
</section>

<div class="wrap">
  <section class="section">
    <h2 class="group-title">Categorías principales</h2>
    <ul class="grid-cards grid-cats">${tarjetasCat}</ul>
  </section>

  ${
    hayCalculadora
      ? `<aside class="tool-cta">
    <h2>Calculadora de edad de jubilación</h2>
    <p>Comprueba a qué edad podrías jubilarte según tu año de nacimiento y los años cotizados.</p>
    <a class="btn" href="/calculadora-edad-jubilacion/">Usar la calculadora</a>
  </aside>`
      : ""
  }

  <section class="section">
    <h2 class="group-title">Últimas guías publicadas</h2>
    <ul class="grid-cards">${tarjetasGuias}</ul>
    <p><a class="btn btn-quiet" href="/guias/">Ver todas las guías</a></p>
  </section>
</div>`;
}
