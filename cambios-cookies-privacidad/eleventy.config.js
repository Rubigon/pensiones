import site from "./src/_data/site.js";

export default function (eleventyConfig) {
  // Los borradores (draft: true) se ven con "npm start" pero NO se publican con "npm run build".
  eleventyConfig.addPreprocessor("borradores", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  // Sustituye los marcadores de las páginas legales por los datos de src/_data/site.js
  eleventyConfig.addTransform("datos-legales", function (content) {
    const out = (this.page && this.page.outputPath) || this.outputPath || "";
    if (!String(out).endsWith(".html")) return content;
    const host = site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const hoy = new Date();
    const fecha = `${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;
    return content
      .replaceAll("[NOMBRE_Y_APELLIDOS]", site.autor)
      .replaceAll("[NIF]", site.nif)
      .replaceAll("[EMAIL_DE_CONTACTO]", site.email)
      .replaceAll("[DOMICILIO]", site.domicilio)
      .replaceAll("[DOMINIO]", host)
      .replaceAll("[NOMBRE_DEL_SITIO]", site.nombre)
      .replaceAll("[FECHA]", fecha);
  });

  // Copia explícita de assets e imágenes
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/js": "js",
    "src/css/favicon.png": "css/favicon.png",
    "src/favicon.png": "favicon.png"
  });

  // Solo se crean páginas de categoría que tengan guías publicadas (nada de páginas vacías).
  eleventyConfig.addCollection("categoriasConGuias", (api) => {
    const guias = api.getFilteredByTag("guias");
    return site.categorias
      .map((c) => ({ ...c, guias: guias.filter((g) => g.data.categoria === c.slug) }))
      .filter((c) => c.guias.length > 0);
  });

  eleventyConfig.addCollection("info", (api) =>
    api.getFilteredByTag("info").sort((a, b) => (a.data.order || 99) - (b.data.order || 99))
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
  };
}
