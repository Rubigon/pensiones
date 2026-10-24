import { esc, buscador, badgeRevision } from "./_includes/lib.js";

export default class {
  data() {
    return { layout: "base.11ty.js" };
  }
  render(data) {
    const cats = data.collections.categoriasConGuias || [];
    const guias = [...(data.collections.guias || [])].sort((a, b) => b.date - a.date);
    const destacadas = guias.slice(0, 4);
    const hayCalc = (data.collections.all || []).some((p) => p.url === "/calculadora-edad-jubilacion/");

    const temas = cats.length
      ? `<ul class="topics">${cats.map((c) => `<li><a href="/${c.slug}/"><strong>${esc(c.nombre)}</strong><span>${esc(c.descripcion)}</span></a></li>`).join("")}</ul>`
      : "";
    const dest = destacadas.length
      ? `<ul class="featured">${destacadas.map((g) => `<li><a href="${g.url}"><strong>${esc(g.data.title)}</strong><span>${esc(g.data.description || "")}</span></a></li>`).join("")}</ul>`
      : "<p>Todavía no hay guías publicadas.</p>";
    const calc = hayCalc
      ? `<div class="tool-cta"><h2>Calculadora de edad de jubilación</h2><p>Indica tu fecha de nacimiento y el tiempo cotizado y obtén una estimación orientativa, basada en el cuadro oficial de la Seguridad Social.</p><a class="btn" href="/calculadora-edad-jubilacion/">Usar la calculadora</a></div>`
      : "";
    const lista = guias.length
      ? `<ul class="post-list">${guias.slice(0, 8).map((g) => `<li><a class="title" href="${g.url}">${esc(g.data.title)}</a>${badgeRevision(g.data.revisado)}</li>`).join("")}</ul><p><a href="/guias/">Ver todas las guías</a></p>`
      : "";

    return `<section class="hero"><div class="wrap">
<h1>Resuelve tus dudas sobre pensiones y ayudas, con fuentes oficiales</h1>
<p class="lead">Guías claras sobre jubilación, pensiones y prestaciones en España. Cada una indica la fecha en que la revisamos y enlaza con la fuente oficial.</p>
${buscador()}
</div></section>
<div class="wrap">
<section class="section" aria-labelledby="empieza"><h2 id="empieza">Empieza por aquí</h2>
${dest}
</section>

${temas}
${calc}

<section class="section" aria-labelledby="que-es"><h2 id="que-es">Qué encontrarás en esta web</h2>
<div class="intro-grid">
<div><h3>Explicaciones sin jerga</h3><p>Traducimos los requisitos de las pensiones y ayudas a un lenguaje cotidiano: quién puede pedirlas, qué se exige y qué casos particulares conviene tener en cuenta.</p></div>
<div><h3>Siempre con la fuente oficial</h3><p>Cada guía enlaza con la página de la Seguridad Social, el IMSERSO u otro organismo donde se comprobó la información. Así puedes verificarla tú mismo.</p></div>
<div><h3>Fecha de revisión visible</h3><p>La normativa cambia cada año. Por eso mostramos cuándo se comparó cada guía con la fuente oficial, y la retiramos o actualizamos si deja de ser válida.</p></div>
</div>
<p>Esta web es <strong>independiente</strong>: no pertenece a ninguna administración, no tramita solicitudes y no puede decirte si tienes derecho a una prestación concreta. Su objetivo es que llegues mejor informado a la gestión oficial.</p>
</section>

<section class="section faq" aria-labelledby="faq"><h2 id="faq">Preguntas frecuentes</h2>
<details><summary>¿A qué edad me puedo jubilar en 2026?</summary><p>Con 38 años y 3 meses cotizados o más, a los 65 años. Con menos cotización, a los 66 años y 10 meses. Lo explicamos con la tabla oficial en la guía sobre la <a href="/guias/edad-de-jubilacion/">edad de jubilación</a>.</p></details>
<details><summary>¿Cuántos años hay que cotizar como mínimo para cobrar una pensión de jubilación?</summary><p>El mínimo es de 15 años, y al menos 2 de ellos deben estar dentro de los 15 años anteriores a la jubilación. Más detalles en la guía del <a href="/guias/minimo-15-anos-cotizados/">mínimo de cotización</a>.</p></details>
<details><summary>¿Cómo se cuentan los años cotizados?</summary><p>Los días cotizados se convierten en años y meses completos, con reglas específicas para excedencias, tiempo parcial o fijos discontinuos. Mira la guía sobre <a href="/guias/como-se-cuentan-los-anos-cotizados/">cómo se cuentan los años cotizados</a>.</p></details>
<details><summary>¿Se puede cobrar una pensión sin haber cotizado?</summary><p>Existe la pensión no contributiva de jubilación, con requisitos de edad, residencia y falta de ingresos. Consulta la guía de la <a href="/guias/pension-no-contributiva-jubilacion/">pensión no contributiva</a>.</p></details>
<details><summary>¿Esta web es oficial?</summary><p>No. Es un proyecto informativo independiente. Para solicitar o consultar una prestación, usa siempre las páginas oficiales de la Seguridad Social o del organismo correspondiente.</p></details>
</section>

${lista ? `<section class="section" aria-labelledby="ultimas"><h2 id="ultimas">Últimas guías</h2>${lista}</section>` : ""}
</div>`;
  }
}
