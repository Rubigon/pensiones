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
  return `<form role="search" method="get" class="search-form" action="/buscar/" autocomplete="off" style="position: relative; max-width: 550px; margin: 0 auto;">
  <label class="sr-only" for="q">Buscar en la web</label>
  <div style="position: relative; display: flex; align-items: center; width: 100%;">
    <input type="text" id="q" name="q" placeholder="Ej.: pensión de viudedad, vida laboral, IMV…" value="${esc(valor)}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-autocomplete="list" aria-controls="search-dropdown" style="width: 100%; padding-right: 2.5rem;">
    <button type="button" id="clear-search-btn" style="display: none; position: absolute; right: 5rem; background: transparent; border: none; font-size: 1.2rem; color: #64748b; cursor: pointer; padding: 0 0.5rem;" aria-label="Limpiar campo">&times;</button>
    <button type="submit">Buscar</button>
  </div>
  <div id="search-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 6px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); z-index: 100; max-height: 320px; overflow-y: auto; text-align: left;"></div>
</form>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("q");
    var clearBtn = document.getElementById("clear-search-btn");
    var dropdown = document.getElementById("search-dropdown");
    if (!input || !dropdown) return;

    // Desactivar autocompletado del navegador por JS
    input.setAttribute("autocomplete", "off");

    var indexData = [];
    fetch("/search.json")
      .then(function(res) { return res.json(); })
      .then(function(data) { indexData = data; })
      .catch(function() {});

    function stripAccents(str) {
      return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function getStem(term) {
      return stripAccents(term).replace(/(es|s|ar|er|ir|cion|ciones)$/, "");
    }

    input.addEventListener("input", function(e) {
      var rawQ = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = rawQ.length > 0 ? "block" : "none";

      if (rawQ.length < 2) {
        dropdown.style.display = "none";
        return;
      }

      var qNorm = stripAccents(rawQ);
      var qStem = getStem(rawQ);

      var matches = indexData.filter(function(item) {
        var titleNorm = stripAccents(item.title);
        var descNorm = stripAccents(item.description);

        return titleNorm.indexOf(qNorm) !== -1 || 
               descNorm.indexOf(qNorm) !== -1 ||
               (qStem.length >= 3 && (titleNorm.indexOf(qStem) !== -1 || descNorm.indexOf(qStem) !== -1));
      }).slice(0, 5);

      if (matches.length > 0) {
        var html = "";
        for (var i = 0; i < matches.length; i++) {
          var item = matches[i];
          var desc = item.description ? item.description.substring(0, 75) + "..." : "";
          html += '<a href="' + item.url + '" style="display: block; padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: #1e293b;">' +
                  '<strong style="display: block; color: #0f172a; font-size: 0.95rem; margin-bottom: 2px;">' + item.title + '</strong>' +
                  '<span style="font-size: 0.825rem; color: #64748b; display: block; line-height: 1.3;">' + desc + '</span></a>';
        }
        dropdown.innerHTML = html;
      } else {
        dropdown.innerHTML = '<div style="padding: 0.85rem 1rem; color: #64748b; font-size: 0.9rem;">No encontramos guías para "' + esc(rawQ) + '".</div>';
      }
      dropdown.style.display = "block";
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function() {
        input.value = "";
        clearBtn.style.display = "none";
        dropdown.style.display = "none";
        input.focus();
      });
    }

    document.addEventListener("click", function(e) {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  });
</script>`;
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
