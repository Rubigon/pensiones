export default {
  layout: "pagina.11ty.js",
  tags: ["info"],
  eleventyComputed: { permalink: (d) => `/${d.page.fileSlug}/` },
};
