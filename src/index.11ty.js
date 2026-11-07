export const data = {
  layout: "base.11ty.js",
  title: "Inicio"
};

export default function(data) {
  const guias = data.collections.guias || [];

  return `
    <section class="hero-search">
      <h2>Información clara sobre pensiones y prestaciones</h2>
      <p>Guías actualizadas sobre la Seguridad Social, requisitos y trámites paso a paso.</p>
    </section>

    <section class="categorias-destacadas">
      <h3>Categorías principales</h3>
      <div class="grid-cards">
        <a href="/categoria/jubilacion/" class="card-categoria">
          <h4>Jubilación</h4>
          <p>Edad, años cotizados y cálculo de la pensión.</p>
        </a>
        <a href="/categoria/incapacidad/" class="card-categoria">
          <h4>Incapacidad</h4>
          <p>Permanente, temporal y requisitos de cotización.</p>
        </a>
        <a href="/categoria/supervivencia/" class="card-categoria">
          <h4>Viudedad y Orfandad</h4>
          <p>Pensiones de supervivencia y requisitos.</p>
        </a>
        <a href="/categoria/prestaciones/" class="card-categoria">
          <h4>Ingreso Mínimo Vital</h4>
          <p>Requisitos, cuantías y solicitudes.</p>
        </a>
      </div>
    </section>

    <section class="guias-recientes">
      <h3>Últimas guías publicadas</h3>
      <div class="grid-cards">
        ${guias.slice(0, 6).map(guia => `
          <a href="${guia.url}" class="card-guia">
            <h4>${guia.data?.title || 'Leer guía'}</h4>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}