// Utilidades compartidas por las plantillas.
export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function toDate(v) {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d) ? null : d;
}
export function fechaEs(v) {
  const d = toDate(v);
  return d ? d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "";
}
export function fechaIso(v) {
  const d = toDate(v);
  return d ? d.toISOString().slice(0, 10) : "";
}

export function badgeRevision(v) {
  const f = fechaEs(v);
  return f ? `<p class="meta"><span class="review-badge">Revisado el ${f}</span></p>` : "";
}

export function buscador(valor = "") {
  return `<form role="search" method="get" class="search-form" action="/buscar/">
  <label class="sr-only" for="q">Buscar en la web</label>
  <input type="search" id="q" name="q" placeholder="Ej.: pensión de viudedad, vida laboral…" value="${esc(valor)}">
  <button type="submit">Buscar</button>
</form>`;
}

export function migas(items) {
  const li = items
    .map((i) => `<li>${i.url ? `<a href="${i.url}">${esc(i.nombre)}</a>` : esc(i.nombre)}</li>`)
    .join("");
  return `<nav class="breadcrumbs" aria-label="Migas de pan"><ol>${li}</ol></nav>`;
}

export function fuentes(lista) {
  if (!Array.isArray(lista) || !lista.length) return "";
  const items = lista
    .map((f) => (f.url ? `<li><a href="${esc(f.url)}" rel="noopener">${esc(f.titulo)}</a></li>` : `<li>${esc(f.titulo)}</li>`))
    .join("");
  return `<aside class="sources"><h2>Fuentes oficiales</h2><ul>${items}</ul></aside>`;
}
