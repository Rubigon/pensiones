import base from "./base.11ty.js";
import { esc, fechaEs, fechaIso } from "./lib.js";

export default function (data) {
  const { title, description, content, date, faq } = data;

  // 1. Generar Schema JSON-LD de FAQ
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

  // 2. Generar bloque HTML de FAQ
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

  // 3. Contenido completo del artículo
  const articuloContent = `
  ${faqSchemaScript}
  <article class="articulo-wrap">
    <header class="articulo-header">
      <h1>${esc(title)}</h1>
      ${description ? `<p class="articulo-lead">${esc(description)}</p>` : ""}
      ${date ? `<time datetime="${fechaIso(date)}">${fechaEs(date)}</time>` : ""}
    </header>
    <div class="articulo-contenido">
      ${content}
    </div>
    ${faqHTML}
  </article>
  `;

  // 4. Envolver en la plantilla base completa con CSS, Header y Footer
  return base({
    ...data,
    content: articuloContent
  });
}
