// Datos globales del sitio. Cambia aquí el nombre y el resto sin tocar plantillas.
export default {
  nombre: process.env.SITE_NAME || "Pensión Clara", // NOMBRE PROVISIONAL
  eslogan: "Pensiones, jubilación y ayudas en España",
  descripcion:
    "Guías claras e independientes sobre jubilación, pensiones y ayudas públicas en España, con fuentes oficiales y fecha de revisión.",
  // Pon aquí tu dominio real (o define la variable de entorno SITE_URL al construir).
  url: process.env.SITE_URL || "https://pensionclara.org",
  // El marcador entre corchetes hace que "npm run check" avise hasta que pongas tu nombre real.
  autor: process.env.SITE_AUTHOR || "[NOMBRE_Y_APELLIDOS]",
  // Datos del titular: se insertan solos en las páginas legales (aviso legal, privacidad, contacto...).
  // RELLÉNALOS con tus datos reales (o define las variables de entorno SITE_NIF, SITE_EMAIL, SITE_DOMICILIO).
  nif: process.env.SITE_NIF || "[NIF]",
  email: process.env.SITE_EMAIL || "[EMAIL_DE_CONTACTO]",
  domicilio: process.env.SITE_DOMICILIO || "[DOMICILIO]",
  // false = banner de cookies propio (aceptar/rechazar).
  // true  = usas el mensaje europeo del CMP de Google (AdSense > Privacidad y mensajes): se desactiva el banner propio.
  cmpGoogle: false,
  categorias: [
    { slug: "jubilacion", nombre: "Jubilación", descripcion: "Edad de jubilación, años cotizados, jubilación anticipada o demorada y compatibilidad con el trabajo." },
    { slug: "pensiones", nombre: "Pensiones", descripcion: "Pensiones contributivas y no contributivas, viudedad, orfandad y complementos." },
    { slug: "ayudas", nombre: "Ayudas", descripcion: "Ingreso Mínimo Vital y otras ayudas públicas: requisitos y cómo comprobarlos." },
    { slug: "tramites", nombre: "Trámites", descripcion: "Cómo consultar tu vida laboral, tus bases de cotización o el estado de una solicitud." },
  ],
};
