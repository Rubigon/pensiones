(function () {
  "use strict";
  var out = document.getElementById("resultados");
  var input = document.getElementById("q");
  if (!out || !input) return;
  var q = new URLSearchParams(location.search).get("q") || "";
  input.value = q;

  function norm(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function mensaje(t) {
    var li = document.createElement("li");
    li.textContent = t;
    out.appendChild(li);
  }

  if (!q.trim()) { mensaje("Escribe arriba lo que quieres consultar."); return; }

  fetch("/search.json")
    .then(function (r) { return r.json(); })
    .then(function (items) {
      var palabras = norm(q).split(/\s+/).filter(Boolean);
      var hits = items.filter(function (i) {
        var h = norm(i.t + " " + i.d + " " + i.c);
        return palabras.every(function (w) { return h.indexOf(w) > -1; });
      });
      if (!hits.length) { mensaje("No hay resultados para «" + q + "». Prueba con otras palabras."); return; }
      hits.forEach(function (i) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.className = "title";
        a.href = i.u;
        a.textContent = i.t;
        li.appendChild(a);
        if (i.d) { var p = document.createElement("p"); p.textContent = i.d; li.appendChild(p); }
        out.appendChild(li);
      });
    })
    .catch(function () { mensaje("No se pudo cargar la búsqueda. Inténtalo de nuevo más tarde."); });
})();
