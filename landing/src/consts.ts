// Datos de la agencia. Única fuente de verdad para toda la landing.
// Cuando cambie el WhatsApp, mail o instagram, se toca un solo archivo.
export const AGENCIA = {
  nombre: "SitioFirme",
  slogan: "Tu negocio, presente en internet",
  descripcion:
    "Agencia de desarrollo web independiente para comercios y profesionales de Corrientes y Resistencia.",
  ciudad: "Corrientes y Resistencia",
  // Placeholders: reemplazar por los datos reales al publicar.
  whatsapp: "5493794966406",
  email: "bizjankevin@gmail.com",
  instagram: "@sitiofirme",
  // Vacío = el ícono de Instagram del footer se muestra pero NO enlaza todavía.
  // Personalizable luego: poné acá la URL real cuando exista la cuenta.
  instagramUrl: "",
  url: "https://sitiofirme.com.ar",
} as const;

// Arma una URL de wa.me con el mensaje ya codificado.
export function urlWhatsApp(mensaje: string): string {
  return `https://wa.me/${AGENCIA.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// Mensaje genérico reutilizado en Hero, Header y el botón flotante.
export const MENSAJE_GENERAL =
  "Hola, quiero consultar sobre una página web para mi negocio";

// Mensaje para el CTA de cada paquete.
export function mensajePaquete(nombre: string): string {
  return `Hola, quiero consultar el paquete ${nombre}`;
}

// ── Paquetes de servicio ──────────────────────────────────────────────
export interface Paquete {
  nombre: string;
  descripcion: string;
  incluye: string[];
  destacado: boolean;
  cta: string;
}

// Cada tier suma lo del anterior: se componen con spread para que la
// relación "incluye todo lo del anterior más..." quede explícita.
const INCLUYE_BASICO = [
  "Diseño personalizado",
  "Responsive mobile",
  "WhatsApp integrado",
  "Formulario de contacto",
  "Google Maps",
  "SEO básico",
  "Dominio y hosting incluido",
];

const EXTRA_INTERMEDIO = [
  "Sistema de turnos online",
  "Base de datos",
  "Confirmación por email",
  "Panel de administración básico",
];

const EXTRA_PREMIUM = [
  "Pagos online con MercadoPago",
  "Notificaciones por WhatsApp automáticas",
  "CMS para editar contenido sin programar",
  "Mantenimiento mensual incluido",
  "Soporte prioritario",
];

export const PAQUETES: Paquete[] = [
  {
    nombre: "Básico",
    descripcion: "Tu presencia online profesional, lista para mostrar.",
    incluye: INCLUYE_BASICO,
    destacado: false,
    cta: "Consultar",
  },
  {
    nombre: "Intermedio",
    descripcion: "Sumá funcionalidad real: turnos, base de datos y panel.",
    incluye: [...INCLUYE_BASICO, ...EXTRA_INTERMEDIO],
    destacado: true,
    cta: "Consultar",
  },
  {
    nombre: "Premium",
    descripcion: "El sistema completo: pagos, automatización y CMS.",
    incluye: [...INCLUYE_BASICO, ...EXTRA_INTERMEDIO, ...EXTRA_PREMIUM],
    destacado: false,
    cta: "Consultar",
  },
];

// ── Casos reales (las plantillas ya entregadas) ───────────────────────
export interface Rubro {
  nombre: string;
  rubro: string;
  descripcion: string;
  color: string;
  // ID de Unsplash (formato photo-…): reusa el hero de cada plantilla real
  // para que la card de la landing y el sitio entregado coincidan.
  img: string;
  // Placeholder: reemplazar por la URL real de cada demo al deployarla.
  url: string;
}

export const RUBROS: Rubro[] = [
  {
    nombre: "Cabañas Don Ramón",
    rubro: "Alojamiento",
    descripcion: "Sistema de reservas con galería y tarifas por temporada",
    color: "#1a3a2a",
    img: "photo-1570793005386-840846445fed",
    url: "https://sitiofirme-cabanas.pages.dev",
  },
  {
    nombre: "La Parrilla de Don Jorge",
    rubro: "Restaurante",
    descripcion: "Menú digital interactivo y sistema de reservas por WhatsApp",
    color: "#1a0a00",
    img: "photo-1511790596488-7331af09cbc7",
    url: "https://sitiofirme-restaurante.pages.dev",
  },
  {
    nombre: "Kinesiología Martínez",
    rubro: "Salud",
    descripcion: "Turnos online en tiempo real conectados a base de datos",
    color: "#0a2540",
    img: "photo-1649751361457-01d3a696c7e6",
    url: "https://sitiofirme-kinesiologia.pages.dev",
  },
];

// Rubros que todavía no tienen plantilla pública.
export const PROXIMOS_RUBROS = [
  "Veterinarias",
  "Estudios contables",
  "Abogados",
  "Hoteles",
  "Gimnasios",
];
