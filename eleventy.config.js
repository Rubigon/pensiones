import site from "./src/_data/site.js";

export default function (eleventyConfig) {
  // Los borradores (draft: true) se ven con "npm start" pero NO se publican con "npm run build".
  eleventyConfig.addPreprocessor("borradores", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

eleventyConfig.addPassthroughCopy({
  "src/css": "css",
  "src/js": "js",
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
