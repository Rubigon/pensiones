import { migas, fuentes } from "./_includes/lib.js";

export default class {
  data() {
    return {
      layout: "base.11ty.js",
      title: "Calculadora de Edad de Jubilación 2026: Estimación Oficial",
      description: "Calcula tu edad de jubilación ordinaria en España según tu año de nacimiento y los años cotizados a la Seguridad Social.",
      permalink: "/calculadora-edad-jubilacion/index.html"
    };
  }

  render(data) {
    const fuentesOficiales = [
      { titulo: "Seguridad Social: Edad y requisitos de jubilación ordinaria", url: "https://www.seg-social.es" }
    ];

    return `
<div class="wrap">
  ${migas([{ nombre: "Inicio", url: "/" }, { nombre: "Calculadora de Edad de Jubilación" }])}

  <header class="page-header">
    <h1>Calculadora de Edad de Jubilación en España</h1>
    <p class="lead">Indica tu año de nacimiento y tu tiempo cotizado estimado para comprobar a qué edad te podrás jubilar según el cuadro legal oficial.</p>
  </header>

  <section class="calc-box" style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 2rem; border-radius: 12px; margin-bottom: 2.5rem;">
    <form id="jubilacion-form" onsubmit="return false;" style="display: grid; gap: 1.5rem; max-width: 600px;">
      <div>
        <label for="anio-nac" style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #1e293b;">Año de nacimiento</label>
        <input type="number" id="anio-nac" min="1950" max="2010" value="1965" style="width: 100%; padding: 0.75rem; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 1rem;">
      </div>

      <div>
        <label for="anos-cot" style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #1e293b;">Años previstos o acumulados de cotización</label>
        <input type="number" id="anos-cot" min="0" max="60" value="38" style="width: 100%; padding: 0.75rem; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 1rem;">
      </div>

      <button type="button" id="calc-btn" class="btn" style="background: #0f172a; color: #ffffff; padding: 0.85rem 1.5rem; border: none; border-radius: 6px; font-size: 1rem; font-weight: 600; cursor: pointer;">Calcular mi Edad de Jubilación</button>
    </form>

    <div id="result-card" style="display: none; margin-top: 2rem; padding: 1.5rem; background: #ffffff; border-left: 5px solid #2563eb; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <h2 style="margin-top: 0; font-size: 1.25rem; color: #0f172a;">Resultado Estimado</h2>
      <p id="res-edad" style="font-size: 1.5rem; font-weight: 700; color: #2563eb; margin: 0.5rem 0;"></p>
      <p id="res-anio" style="font-size: 1.1rem; color: #334155; margin-bottom: 0.5rem;"></p>
      <p id="res-desc" style="font-size: 0.95rem; color: #64748b; line-height: 1.5; margin: 0;"></p>
    </div>
  </section>

  ${fuentes(fuentesOficiales)}
</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("calc-btn");
    var resultCard = document.getElementById("result-card");
    var resEdad = document.getElementById("res-edad");
    var resAnio = document.getElementById("res-anio");
    var resDesc = document.getElementById("res-desc");

    if (!btn) return;

    btn.addEventListener("click", function() {
      var anioNac = parseInt(document.getElementById("anio-nac").value) || 1965;
      var cotiz = parseInt(document.getElementById("anos-cot").value) || 0;

      var edadLegal = "66 años y 10 meses";
      var exencionAnos = 38.5;

      if (cotiz >= exencionAnos) {
        edadLegal = "65 años";
      }

      var edadAniosNumerico = (cotiz >= exencionAnos) ? 65 : 66.83;
      var anioEst = Math.floor(anioNac + edadAniosNumerico);

      resEdad.textContent = "Edad ordinaria de retiro: " + edadLegal;
      resAnio.textContent = "Año estimado de jubilación: " + anioEst;
      
      if (cotiz >= exencionAnos) {
        resDesc.textContent = "Cumples el requisito de cotización prolongada (38 años y 6 meses o más), por lo que puedes acceder a la jubilación con el 100% a los 65 años.";
      } else {
        resDesc.textContent = "Al disponer de menos de 38 años y 6 meses cotizados, la normativa exige alcanzar la edad ordinaria completa de 66 años y 10 meses.";
      }

      resultCard.style.display = "block";
    });
  });
</script>
`;
  }
}
