import base from "./base.11ty.js";
import { esc, fechaEs, fechaIso } from "./lib.js";

export default function (data) {
  const { title, description, content, date, faq } = data;

  // Schema JSON-LD para FAQ
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

  // Bloque visible de FAQ
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

  // Envoltorio con contenedor centrado explícito
  const articuloContent = `
  ${faqSchemaScript}
  <div class="wrap content-area" style="max-width: 46rem; margin-inline: auto; padding: 2rem 1rem;">
    <article class="entry">
      <header class="articulo-header" style="margin-bottom: 2rem; border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h1>${esc(title)}</h1>
        ${description ? `<p class="articulo-lead" style="font-size: 1.2rem; color: var(--ink-soft);">${esc(description)}</p>` : ""}
        ${date ? `<time datetime="${fechaIso(date)}" style="font-size: 0.95rem; color: var(--ink-soft);">${fechaEs(date)}</time>` : ""}
      </header>
      <div class="articulo-contenido">
        ${content}
      </div>
      ${faqHTML}
    </article>
  </div>
  `;

  return base({
    ...data,
    content: articuloContent
  });
}
