export default class {
  data() {
    return { permalink: "/sitemap.xml", eleventyExcludeFromCollections: true };
  }
  render(data) {
    const base = data.site.url.replace(/\/$/, "");
    const paginas = (data.collections.all || []).filter(
      (p) => p.url && !p.data.noindex && !/\.(xml|json|txt)$/.test(p.url) && p.url !== "/404.html"
    );
    const urls = paginas.map((p) => `  <url><loc>${base}${p.url}</loc></url>`).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  }
}
