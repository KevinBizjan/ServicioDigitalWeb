// Datos del negocio. Única fuente de verdad para toda la plantilla.
export const NEGOCIO = {
  nombre: "Kinesiología Martínez",
  ciudad: "Resistencia, Chaco",
  direccion: "Av. Sarmiento 845, Resistencia, Chaco",
  telefono: "+54 9 362 555-4321",
  whatsapp: "5493625554321",
  email: "turnos@kinesiologiamartinez.com.ar",
  url: "https://kinesiologiamartinez.com.ar",
} as const;

// Horarios de atención, como objeto para reutilizar en componentes.
export interface Horario {
  dia: string;
  horario: string;
}

export const HORARIOS: Horario[] = [
  { dia: "Lunes a viernes", horario: "8:00 a 12:00 y 16:00 a 20:00" },
  { dia: "Sábados", horario: "8:00 a 12:00" },
];

// Slots de turnos disponibles por franja (mismos para los días que atiende).
export const HORARIOS_TURNOS = {
  manana: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  tarde: ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"],
} as const;

// Servicios que se ofrecen (se usan en Servicios.astro y en el paso 1 de turnos).
export interface Servicio {
  nombre: string;
  descripcion: string;
}

export const SERVICIOS: Servicio[] = [
  {
    nombre: "Kinesiología deportiva",
    descripcion: "Prevención y recuperación de lesiones deportivas.",
  },
  {
    nombre: "Rehabilitación post-quirúrgica",
    descripcion: "Recuperación funcional luego de una cirugía.",
  },
  {
    nombre: "Tratamiento de columna",
    descripcion: "Dolores de espalda, cervicales y lumbares.",
  },
  {
    nombre: "Drenaje linfático",
    descripcion: "Reducción de edemas y mejora de la circulación.",
  },
  {
    nombre: "Electroterapia",
    descripcion: "Estimulación eléctrica para dolor e inflamación.",
  },
  {
    nombre: "Kinesiología respiratoria",
    descripcion: "Rehabilitación y fortalecimiento respiratorio.",
  },
];

// Arma una URL de wa.me con el mensaje ya codificado.
export function urlWhatsApp(mensaje: string): string {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// Mensajes predefinidos reutilizados en varios componentes.
export const WHATSAPP_CONSULTA =
  "Hola, quiero hacer una consulta en Kinesiología Martínez";
export const WHATSAPP_TURNO =
  "Hola, quiero sacar un turno en Kinesiología Martínez";
export const WHATSAPP_DEFAULT = WHATSAPP_CONSULTA;
