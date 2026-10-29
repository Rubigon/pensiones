import { esc, badgeRevision, migas } from "./_includes/lib.js";

export default class {
  data() {
    return {
      layout: "base.11ty.js",
      title: "Todas las guías",
      description: "Guías independientes sobre jubilación, pensiones y ayudas en España, con fuentes oficiales y fecha de revisión.",
      permalink: "/guias/",
    };
  }
  render(data) {
    const guias = data.collections.guias || [];
    const grupos = data.site.categorias
      .map((c) => ({ c, items: guias.filter((g) => g.data.categoria === c.slug).sort((a, b) => b.date - a.date) }))
      .filter((g) => g.items.length);
    const cuerpo = grupos.length
      ? grupos
          .map(
            (g) => `<h2 class="group-title"><a href="/${g.c.slug}/">${esc(g.c.nombre)}</a></h2>
<ul class="post-list">${g.items
              .map((p) => `<li><a class="title" href="${p.url}">${esc(p.data.title)}</a>${badgeRevision(p.data.revisado)}<p>${esc(p.data.description || "")}</p></li>`)
              .join("")}</ul>`
          )
          .join("")
      : "<p>Todavía no hay guías publicadas.</p>";
    return `<div class="wrap content-area">
${migas([{ nombre: "Inicio", url: "/" }, { nombre: "Todas las guías" }])}
<h1>Todas las guías</h1>
<p class="lead">Cada guía indica la fecha de revisión y enlaza con la fuente oficial. Si una información cambia, la actualizamos.</p>
${cuerpo}
</div>`;
  }
}
