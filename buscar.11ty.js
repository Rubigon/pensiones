import { buscador, migas } from "./_includes/lib.js";

export default class {
  data() {
    return {
      layout: "base.11ty.js",
      title: "Buscar",
      permalink: "/buscar/",
      noindex: true,
      eleventyExcludeFromCollections: true,
      scripts: ["/js/buscador.js"],
    };
  }
  render() {
    return `<div class="wrap content-area">
${migas([{ nombre: "Inicio", url: "/" }, { nombre: "Buscar" }])}
<h1>Resultados de búsqueda</h1>
${buscador()}
<ul class="results" id="resultados" aria-live="polite"></ul>
<noscript><p>La búsqueda necesita JavaScript. Mientras tanto, usa las categorías del menú.</p></noscript>
</div>`;
  }
}
