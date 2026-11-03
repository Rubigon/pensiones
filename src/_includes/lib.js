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
  return `<form role="search" method="get" class="search-form" action="/buscar/" style="position: relative; max-width: 550px; margin: 0 auto;">
  <label class="sr-only" for="q">Buscar en la web</label>
  <div style="position: relative; display: flex; align-items: center; width: 100%;">
    <input type="search" id="q" name="q" placeholder="Ej.: pensión de viudedad, vida laboral, IMV…" value="${esc(valor)}" autocomplete="off" style="width: 100%; padding-right: 2.5rem;">
    <button type="button" id="clear-search-btn" style="display: none; position: absolute; right: 5rem; background: transparent; border: none; font-size: 1.2rem; color: #64748b; cursor: pointer; padding: 0 0.5rem;" aria-label="Limpiar campo">&times;</button>
    <button type="submit">Buscar</button>
  </div>
  
  <div id="search-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 6px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); z-index: 100; max-height: 320px; overflow-y: auto; text-align: left;"></div>
</form>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("q");
    const clearBtn = document.getElementById("clear-search-btn");
    const dropdown = document.getElementById("search-dropdown");
    if (!input || !dropdown) return;

    let indexData = [];
    fetch("/search.json")
      .then(res => res.json())
      .then(data => { indexData = data; })
      .catch(() => {});

    input.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (clearBtn) clearBtn.style.display = q.length > 0 ? "block" : "none";

      if (q.length < 2) {
        dropdown.style.display = "none";
        return;
      }

      const matches = indexData.filter(item => 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q))
      ).slice(0, 5);

      if (matches.length > 0) {
        dropdown.innerHTML = matches.map(item => \`
          <a href="\${item.url}" style="display: block; padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: #1e293b;">
            <strong style="display: block; color: #0f172a; font-size: 0.95rem; margin-bottom: 2px;">\${item.title}</strong>
            <span style="font-size: 0.825rem; color: #64748b; display: block; line-height: 1.3;">\${item.description ? item.description.substring(0, 75) + '...' : ''}</span>
          </a>
        \`).join("");
      } else {
        dropdown.innerHTML = \`<div style="padding: 0.85rem 1rem; color: #64748b; font-size: 0.9rem;">No encontramos guías para "\${esc(q)}".</div>\`;
      }
      dropdown.style.display = "block";
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        clearBtn.style.display = "none";
        dropdown.style.display = "none";
        input.focus();
      });
    }

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !dropdown.contains(
