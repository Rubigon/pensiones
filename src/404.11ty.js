import { buscador } from "./_includes/lib.js";

export default class {
  data() {
    return { layout: "base.11ty.js", title: "Página no encontrada", permalink: "/404.html", noindex: true, eleventyExcludeFromCollections: true };
  }
  render() {
    return `<div class="wrap content-area">
<h1>No encontramos esa página</h1>
<p>Puede que el enlace haya cambiado. Prueba a buscar el tema que necesitas:</p>
${buscador()}
<p><a href="/">Volver al inicio</a></p>
</div>`;
  }
}
