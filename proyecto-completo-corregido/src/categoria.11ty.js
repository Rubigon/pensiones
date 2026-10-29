import { esc, badgeRevision, migas } from "./_includes/lib.js";

export default class {
  data() {
    return {
      layout: "base.11ty.js",
      pagination: { data: "collections.categoriasConGuias", size: 1, alias: "cat" },
      permalink: (d) => `/${d.cat.slug}/`,
      eleventyComputed: {
        title: (d) => d.cat.nombre,
        description: (d) => d.cat.descripcion,
      },
    };
  }
  render(data) {
    const { cat } = data;
    const guias = [...cat.guias].sort((a, b) => b.date - a.date);
    return `<div class="wrap content-area">
${migas([{ nombre: "Inicio", url: "/" }, { nombre: cat.nombre }])}
<h1>${esc(cat.nombre)}</h1>
<p class="lead">${esc(cat.descripcion)}</p>
<ul class="post-list">${guias
      .map((g) => `<li><a class="title" href="${g.url}">${esc(g.data.title)}</a>${badgeRevision(g.data.revisado)}<p>${esc(g.data.description || "")}</p></li>`)
      .join("")}</ul>
</div>`;
  }
}
