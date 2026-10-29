import { esc, badgeRevision, fuentes, migas } from "./lib.js";

export default class {
  data() {
    return { layout: "base.11ty.js" };
  }
  render(data) {
    return `<div class="wrap content-area">
${migas([{ nombre: "Inicio", url: "/" }, { nombre: data.title }])}
<article class="entry">
<h1>${esc(data.title)}</h1>
${badgeRevision(data.revisado)}
${data.content}
${fuentes(data.fuentes)}
</article>
</div>`;
  }
}
