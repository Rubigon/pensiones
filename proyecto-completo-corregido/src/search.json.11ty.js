export default class {
  data() {
    return { permalink: "/search.json", eleventyExcludeFromCollections: true };
  }
  render(data) {
    const items = (data.collections.guias || []).map((g) => ({
      t: g.data.title,
      d: g.data.description || "",
      c: (data.site.categorias.find((c) => c.slug === g.data.categoria) || {}).nombre || "",
      u: g.url,
    }));
    return JSON.stringify(items);
  }
}
