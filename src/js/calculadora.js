/*
 * Calculadora orientativa de edad ordinaria de jubilación.
 * Regla general (calendario transitorio). SOLO cubre jubilaciones que se alcancen en 2026 o después.
 *
 * IMPORTANTE ANTES DE PUBLICAR:
 *  1. Contrastar estos valores con la fuente oficial vigente (seg-social.es y la disposición transitoria
 *     séptima de la LGSS) y anotar la fecha real en REVISION.fecha.
 *  2. Mientras REVISION.fecha esté vacía, la calculadora muestra "datos pendientes de revisión oficial".
 *
 * Valores tomados de fuentes secundarias consultadas en octubre de 2026 (SIN verificar oficialmente):
 *   2026: 65 años si hay >= 38 años y 3 meses cotizados; si no, 66 años y 10 meses.
 *   2027 y siguientes: 65 años si hay >= 38 años y 6 meses cotizados; si no, 67 años.
 */
(function () {
  'use strict';

  var REVISION = { fecha: '', fuente: 'https://www.seg-social.es/' };
  var MIN_CARENCIA_MESES = 15 * 12; // 15 años de cotización mínima

  function regla(anio) {
    if (anio === 2026) { return { cotizadosParaLos65: 38 * 12 + 3, edadMeses: 66 * 12 + 10 }; }
    if (anio >= 2027)  { return { cotizadosParaLos65: 38 * 12 + 6, edadMeses: 67 * 12 }; }
    return null; // antes de 2026: no cubierto
  }

  function addMonths(d, m) {
    var mo = d.getUTCMonth() + m, day = d.getUTCDate();
    var ny = d.getUTCFullYear() + Math.floor(mo / 12), nm = ((mo % 12) + 12) % 12;
    var last = new Date(Date.UTC(ny, nm + 1, 0)).getUTCDate();
    return new Date(Date.UTC(ny, nm, Math.min(day, last)));
  }
  function fmt(d) {
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  }
  function edadTxt(meses) {
    var a = Math.floor(meses / 12), m = meses % 12;
    return a + ' años' + (m ? ' y ' + m + ' meses' : '');
  }

  function calcular(nac, cotMeses) {
    if (cotMeses < MIN_CARENCIA_MESES) {
      return { texto: 'Con menos de 15 años cotizados no se alcanza el mínimo para la pensión contributiva de jubilación ordinaria. Puede haber otras vías (por ejemplo, la pensión no contributiva): consulta la Seguridad Social.' };
    }
    var f65 = addMonths(nac, 65 * 12);
    var r65 = regla(f65.getUTCFullYear());
    if (!r65) { return { texto: 'Tu caso depende de reglas de años anteriores a 2026, que esta calculadora no cubre. Consulta el simulador oficial de la Seguridad Social.' }; }
    if (cotMeses >= r65.cotizadosParaLos65) {
      return { fecha: f65, texto: 'Podrías jubilarte a los 65 años.' };
    }
    var f2026 = addMonths(nac, regla(2026).edadMeses);
    var f2027 = addMonths(nac, regla(2027).edadMeses);
    if (f2026.getUTCFullYear() === 2026) {
      return { fecha: f2026, texto: 'Tu edad ordinaria de jubilación sería ' + edadTxt(regla(2026).edadMeses) + '.' };
    }
    if (f2027.getUTCFullYear() >= 2027) {
      return { fecha: f2027, texto: 'Tu edad ordinaria de jubilación sería ' + edadTxt(regla(2027).edadMeses) + '.' };
    }
    return { texto: 'Tu caso cae en un tramo del calendario que esta calculadora no cubre. Consulta el simulador oficial.' };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('pc-calc');
    if (!form) { return; }
    var out = document.getElementById('pc-result');
    var nota = document.getElementById('pc-nota');
    nota.textContent = REVISION.fecha
      ? 'Reglas revisadas el ' + REVISION.fecha + '. Fuente: Seguridad Social.'
      : 'Datos pendientes de revisión oficial: no los uses para decidir.';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = document.getElementById('pc-nac').value;
      var a = parseInt(document.getElementById('pc-anios').value, 10);
      var m = parseInt(document.getElementById('pc-meses').value || '0', 10);
      out.hidden = false;
      if (!v || isNaN(a) || a < 0 || isNaN(m) || m < 0 || m > 11) {
        out.innerHTML = '<p class="calc-error">Revisa los datos: indica la fecha de nacimiento y el tiempo cotizado (meses de 0 a 11).</p>';
        return;
      }
      var p = v.split('-');
      var r = calcular(new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])), a * 12 + m);
      var html = '<p><strong>' + r.texto + '</strong></p>';
      if (r.fecha) { html += '<p>Fecha orientativa: ' + fmt(r.fecha) + '.</p>'; }
      html += '<p>No incluye jubilación anticipada, demorada, regímenes especiales, discapacidad ni coeficientes reductores. Comprueba tu caso en el simulador oficial de la <a href="' + REVISION.fuente + '" rel="noopener">Seguridad Social</a>.</p>';
      out.innerHTML = html;
    });
  });
})();
