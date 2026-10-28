// Comprueba que no se publica nada con marcadores sin rellenar ni con el dominio provisional.
import fs from "node:fs";
import path from "node:path";

const dir = "_site";
if (!fs.existsSync(dir)) { console.error("No existe _site: ejecuta antes `npm run build`."); process.exit(1); }

const marcador = /\[[A-ZÁÉÍÓÚÑ_]{4,}\]/g;
const problemas = [];
let hayDominioProvisional = false;

function recorrer(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { recorrer(p); continue; }
    if (!/\.(html|xml|txt|json)$/.test(e.name)) continue;
    const t = fs.readFileSync(p, "utf8");
    const m = t.match(marcador);
    if (m) problemas.push(`${p}: ${[...new Set(m)].join(", ")}`);
    if (t.includes("TU-DOMINIO.es")) hayDominioProvisional = true;
  }
}
recorrer(dir);

if (hayDominioProvisional) console.warn("ADVERTENCIA: sigue el dominio provisional TU-DOMINIO.es (define SITE_URL o edita src/_data/site.js).");
if (problemas.length) {
  console.warn("ADVERTENCIA: marcadores sin rellenar en el sitio generado:\n  " + problemas.join("\n  "));
}
console.log("Comprobación correcta: sin marcadores pendientes.");
