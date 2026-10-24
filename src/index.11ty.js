import { esc, buscador, badgeRevision } from "./_includes/lib.js";

export default class {
  data() {
    return { layout: "base.11ty.js", eleventyExcludeFromCollections: false };
  }
  render(data) {
    const cats = data.collections.categoriasConGuias || [];
    const guias = [...(data.collections.guias || [])].sort((a, b) => b.date - a.date).slice(0, 8);
    const temas = cats.length
      ? `<ul class="topics">${cats.map((c) => `<li><a href="/${c.slug}/"><strong>${esc(c.nombre)}</strong><span>${esc(c.descripcion)}</span></a></li>`).join("")}</ul>`
      : "";
    const calc = (data.collections.all || []).some((p) => p.url === "/calculadora-edad-jubilacion/")
      ? `<div class="tool-cta"><h2>Calculadora de edad de jubilación</h2><p>Una estimación orientativa según tu fecha de nacimiento y los años cotizados.</p><a class="btn" href="/calculadora-edad-jubilacion/">Usar la calculadora</a></div>`
      : "";
    const lista = guias.length
      ? `<ul class="post-list">${guias.map((g) => `<li><a class="title" href="${g.url}">${esc(g.data.title)}</a>${badgeRevision(g.data.revisado)}</li>`).join("")}</ul>`
      : "<p>Todavía no hay guías publicadas.</p>";
    return `<section class="hero"><div class="wrap">
<h1>Resuelve tus dudas sobre pensiones y ayudas, con fuentes oficiales</h1>
<p class="lead">Guías claras sobre jubilación, pensiones y prestaciones en España, con la fecha en que se revisó cada una.</p>
${buscador()}
</div></section>
<div class="wrap">
${temas}
${calc}
<section class="section" aria-labelledby="ultimas"><h2 id="ultimas">Últimas guías</h2>${lista}</section>
</div>`;
  }
}
