// Datos del negocio. Única fuente de verdad para toda la plantilla.
export const NEGOCIO = {
  nombre: "Cabañas Don Ramón",
  ciudad: "Villa Ángela, Chaco",
  direccion: "Ruta 16 km 12, Villa Ángela, Chaco",
  telefono: "+54 9 3646 55-1234",
  whatsapp: "5493646551234",
  email: "contacto@cabanasdonramon.com.ar",
  checkIn: "14:00",
  checkOut: "10:00",
  url: "https://cabanasdonramon.com.ar",
} as const;

// Arma una URL de wa.me con el mensaje ya codificado.
export function urlWhatsApp(mensaje: string): string {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// Mensajes predefinidos reutilizados en varios componentes.
export const MENSAJE_DISPONIBILIDAD =
  "Hola, quiero consultar disponibilidad en Cabañas Don Ramón";

export function mensajeReserva(temporada: string, precio: string): string {
  return `Hola, quiero reservar una cabaña en Temporada ${temporada} (${precio}/noche) en Cabañas Don Ramón`;
}
