/*
 * Calculadora orientativa de edad ordinaria de jubilación (regla general).
 * Fuente: cuadro de aplicación gradual de la Seguridad Social ("Jubilación ordinaria: requisitos"),
 * https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10963/28393/28396/28472
 * Contrastado con la página oficial el 24 de octubre de 2026. Revisar cuando cambie la normativa.
 *
 * Todo en meses. TABLA[año] = [meses cotizados para jubilarse a los 65, edad exigida en meses si se cotiza menos].
 * Criterio aplicado: la edad exigida es la del año en que se produce la jubilación.
 */
(function () {
  'use strict';

  var REVISION = {
    fecha: '24 de octubre de 2026',
    fuente: 'https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10963/28393/28396/28472'
  };
  var MIN_CARENCIA_MESES = 15 * 12;

  var TABLA = {
    2013: [423, 781], 2014: [426, 782], 2015: [429, 783], 2016: [432, 784], 2017: [435, 785],
    2018: [438, 786], 2019: [441, 788], 2020: [444, 790], 2021: [447, 792], 2022: [450, 794],
    2023: [453, 796], 2024: [456, 798], 2025: [459, 800], 2026: [459, 802]
  };
  var DESDE_2027 = [462, 804]; // 38 años y 6 meses para los 65; si no, 67 años

  function regla(anio) {
    if (anio < 2013) { return null; }
    var r = anio >= 2027 ? DESDE_2027 : TABLA[anio];
    return { thr: r[0], edad: r[1] };
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
      return { texto: 'Con menos de 15 años cotizados no se alcanza el mínimo para la pensión contributiva de jubilación. Puede haber otras vías (por ejemplo, la pensión no contributiva): consulta a la administración.' };
    }
    var f65 = addMonths(nac, 65 * 12);
    var y65 = f65.getUTCFullYear();
    var r65 = regla(y65);
    if (!r65) {
      return { texto: 'Tu caso depende de reglas anteriores a 2013, que esta calculadora no cubre. Consulta el simulador oficial de la Seguridad Social.' };
    }
    if (cotMeses >= r65.thr) {
      return { fecha: f65, texto: 'Podrías jubilarte a los 65 años.' };
    }
    for (var y = y65; y <= y65 + 80; y++) {
      var ry = regla(y);
      var f = addMonths(nac, ry.edad);
      if (f.getUTCFullYear() <= y) {
        return { fecha: f, texto: 'Tu edad ordinaria de jubilación sería ' + edadTxt(ry.edad) + '.' };
      }
    }
    return { texto: 'No hemos podido calcular tu caso. Consulta el simulador oficial de la Seguridad Social.' };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('pc-calc');
    if (!form) { return; }
    var out = document.getElementById('pc-result');
    var nota = document.getElementById('pc-nota');
    nota.textContent = REVISION.fecha
      ? 'Cuadro de edades contrastado con la Seguridad Social el ' + REVISION.fecha + '.'
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
      html += '<p>No incluye jubilación anticipada, demorada, regímenes especiales, discapacidad ni coeficientes reductores, ni comprueba que tengas 2 de los últimos 15 años cotizados. Confirma tu caso en el simulador oficial de la <a href="' + REVISION.fuente + '" rel="noopener">Seguridad Social</a>.</p>';
      out.innerHTML = html;
    });
  });
})();
