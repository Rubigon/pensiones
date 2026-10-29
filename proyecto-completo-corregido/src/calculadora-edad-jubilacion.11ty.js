import { migas } from "./_includes/lib.js";

// Calculadora publicada: reglas contrastadas con la Seguridad Social el 24-10-2026 (ver src/js/calculadora.js).
export default class {
  data() {
    return {
      layout: "base.11ty.js",
      title: "Calculadora de edad de jubilación",
      description: "Estimación orientativa de tu edad ordinaria de jubilación según tu fecha de nacimiento y los años cotizados.",
      permalink: "/calculadora-edad-jubilacion/",
      scripts: ["/js/calculadora.js"],
    };
  }
  render() {
    return `<div class="wrap content-area">
${migas([{ nombre: "Inicio", url: "/" }, { nombre: "Calculadora de edad de jubilación" }])}
<article class="entry">
<h1>Calculadora de edad de jubilación</h1>
<p>Indica tu fecha de nacimiento y el tiempo que tendrás cotizado cuando te jubiles. La herramienta aplica solo la regla general de la edad ordinaria.</p>
<form class="calc" id="pc-calc" novalidate>
  <p><strong>Calculadora orientativa.</strong> No es una resolución oficial.</p>
  <label for="pc-nac">Fecha de nacimiento</label>
  <input type="date" id="pc-nac" required>
  <label id="pc-cot-label">Tiempo cotizado que tendrás al jubilarte</label>
  <div class="row" role="group" aria-labelledby="pc-cot-label">
    <div><label for="pc-anios">Años</label><input type="number" id="pc-anios" min="0" max="60" inputmode="numeric" required></div>
    <div><label for="pc-meses">Meses</label><input type="number" id="pc-meses" min="0" max="11" value="0" inputmode="numeric"></div>
  </div>
  <button type="submit" class="btn">Calcular</button>
  <div class="calc-result" id="pc-result" role="status" aria-live="polite" hidden></div>
  <p class="meta" id="pc-nota"></p>
</form>
<p class="disclaimer">Los datos que escribes se procesan en tu navegador y no se envían a ningún servidor. Para tu caso concreto, usa el simulador oficial de la Seguridad Social.</p>
</article>
</div>`;
  }
}
