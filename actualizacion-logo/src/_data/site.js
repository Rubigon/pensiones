// Datos globales del sitio. Cambia aquí el nombre y el resto sin tocar plantillas.
export default {
  nombre: process.env.SITE_NAME || "Pensión Clara", // NOMBRE PROVISIONAL
  eslogan: "Pensiones, jubilación y ayudas en España",
  // Lo que se ve en Google: título (ideal <= 60 caracteres) y descripción (ideal <= 155).
  tituloInicio: "Pensión Clara | Guías de pensiones y jubilación en España",
  descripcion:
    "Guías claras e independientes sobre jubilación, pensiones y ayudas públicas en España, con fuentes oficiales y fecha de revisión en cada una.",
  // Pon aquí tu dominio real (o define la variable de entorno SITE_URL al construir).
  url: process.env.SITE_URL || "https://TU-DOMINIO.es",
  // El marcador entre corchetes hace que "npm run check" avise hasta que pongas tu nombre real.
  autor: process.env.SITE_AUTHOR || "[NOMBRE_Y_APELLIDOS]",
  categorias: [
    { slug: "jubilacion", nombre: "Jubilación", descripcion: "Edad de jubilación, años cotizados, jubilación anticipada o demorada y compatibilidad con el trabajo." },
    { slug: "pensiones", nombre: "Pensiones", descripcion: "Pensiones contributivas y no contributivas, viudedad, orfandad y complementos." },
    { slug: "ayudas", nombre: "Ayudas", descripcion: "Ingreso Mínimo Vital y otras ayudas públicas: requisitos y cómo comprobarlos." },
    { slug: "tramites", nombre: "Trámites", descripcion: "Cómo consultar tu vida laboral, tus bases de cotización o el estado de una solicitud." },
  ],
};
