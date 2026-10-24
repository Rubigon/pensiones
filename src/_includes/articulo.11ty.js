import { esc, fechaEs, badgeRevision, fuentes, migas } from "./lib.js";

export default class {
  data() {
    return { layout: "base.11ty.js" };
  }
  render(data) {
    const { site, page } = data;
    const cat = site.categorias.find((c) => c.slug === data.categoria);
    const relacionadas = (data.collections.guias || [])
      .filter((g) => g.data.categoria === data.categoria && g.url !== page.url)
      .slice(0, 4);
    const rel = relacionadas.length
      ? `<h2>Guías relacionadas</h2><ul>${relacionadas.map((g) => `<li><a href="${g.url}">${esc(g.data.title)}</a></li>`).join("")}</ul>`
      : "";
    return `<div class="wrap content-area">
${migas([{ nombre: "Inicio", url: "/" }, ...(cat ? [{ nombre: cat.nombre, url: `/${cat.slug}/` }] : []), { nombre: data.title }])}
<article class="entry">
<h1>${esc(data.title)}</h1>
<p class="meta">Publicado el ${fechaEs(data.date)} · Autor: ${esc(site.autor)}</p>
${badgeRevision(data.revisado)}
${data.content}
${fuentes(data.fuentes)}
<p class="disclaimer">Esta guía es informativa e independiente y no sustituye la resolución de la administración. Comprueba siempre los datos y requisitos en la fuente oficial antes de decidir o tramitar nada.</p>
${rel}
</article>
</div>`;
  }
}
