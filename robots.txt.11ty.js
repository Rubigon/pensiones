export default class {
  data() {
    return { permalink: "/robots.txt", eleventyExcludeFromCollections: true };
  }
  render(data) {
    return `User-agent: *\nAllow: /\nDisallow: /buscar/\n\nSitemap: ${data.site.url.replace(/\/$/, "")}/sitemap.xml\n`;
  }
}
