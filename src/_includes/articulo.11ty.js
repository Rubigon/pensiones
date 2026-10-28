import { esc, formatDate } from "./lib.js";

export default function (data) {
  const { title, description, content, date, faq, page, site } = data;
  const canonical = site.url.replace(/\/$/, "") + page.url;

  // Generar Schema de FAQ en formato JSON-LD si existen preguntas en el frontmatter
  let faqSchemaScript = "";
  if (faq && Array.isArray(faq) && faq.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map((item) => ({
        "@type": "Question",
        "name": item.pregunta,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.respuesta
        }
      }))
    };
    faqSchemaScript = `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`;
  }

  // Generar bloque HTML visible para las preguntas frecuentes al final del artículo
  let faqHTML = "";
  if (faq && Array.isArray(faq) && faq.length > 0) {
    const items = faq
      .map(
        (item) => `
        <details class="faq-item">
          <summary><strong>${esc(item.pregunta)}</strong></summary>
          <p>${esc(item.respuesta)}</p>
        </details>`
      )
      .join("");
    faqHTML = `
      <section class="faq-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Preguntas Frecuentes</h2>
        ${items}
      </section>`;
  }

  return `
  ${faqSchemaScript}
  <article class="articulo-wrap">
    <header class="articulo-header">
      <h1>${esc(title)}</h1>
      ${description ? `<p class="articulo-lead">${esc(description)}</p>` : ""}
      ${date ? `<time datetime="${date}">${formatDate(date)}</time>` : ""}
    </header>
    <div class="articulo-contenido">
      ${content}
    </div>
    ${faqHTML}
  </article>
  `;
}
