// Banner de consentimiento de cookies (aceptar / rechazar) + Consent Mode v2.
// La decisión se guarda en localStorage con la clave "pc_consent_v1".
(function () {
  var KEY = "pc_consent_v1";

  function leer() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function guardar(ok) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: 1, ok: ok, t: Date.now() })); } catch (e) {}
  }
  function aplicar(ok) {
    if (typeof gtag !== "function") return;
    var v = ok ? "granted" : "denied";
    gtag("consent", "update", {
      ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v
    });
  }
  function cerrar() {
    var b = document.getElementById("cookie-banner");
    if (b) b.remove();
  }
  function decidir(ok) {
    guardar(ok);
    aplicar(ok);
    cerrar();
    var btn = document.getElementById("cookie-settings");
    if (btn) btn.focus();
  }
  function mostrar() {
    if (document.getElementById("cookie-banner")) return;
    var b = document.createElement("div");
    b.id = "cookie-banner";
    b.className = "cookie-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-labelledby", "cookie-title");
    b.setAttribute("aria-describedby", "cookie-text");
    b.innerHTML =
      '<div class="cookie-inner">' +
        '<div class="cookie-msg">' +
          '<p id="cookie-title" class="cookie-title">Tu privacidad</p>' +
          '<p id="cookie-text">Usamos cookies de Google para medir las visitas (Google Analytics) y mostrar publicidad (Google AdSense). ' +
          'Solo se activan si las aceptas y puedes cambiar de opinión cuando quieras desde «Configurar cookies» en el pie de página. ' +
          'Más información en la <a href="/politica-de-cookies/">Política de cookies</a> y la <a href="/politica-de-privacidad/">Política de privacidad</a>.</p>' +
        '</div>' +
        '<div class="cookie-actions">' +
          '<button type="button" id="cookie-reject" class="cookie-btn">Rechazar</button>' +
          '<button type="button" id="cookie-accept" class="cookie-btn">Aceptar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(b);
    document.getElementById("cookie-accept").addEventListener("click", function () { decidir(true); });
    document.getElementById("cookie-reject").addEventListener("click", function () { decidir(false); });
    document.getElementById("cookie-accept").focus();
  }

  var actual = leer();
  if (actual && actual.v === 1) aplicar(!!actual.ok); else mostrar();

  var ajustes = document.getElementById("cookie-settings");
  if (ajustes) ajustes.addEventListener("click", mostrar);
})();
