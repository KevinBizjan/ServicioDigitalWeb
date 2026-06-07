// Datos del negocio. Única fuente de verdad para toda la plantilla.
export const NEGOCIO = {
  nombre: "La Parrilla de Don Jorge",
  ciudad: "Resistencia, Chaco",
  direccion: "Av. Alberdi 1250, Resistencia, Chaco",
  telefono: "+54 9 362 555-9876",
  whatsapp: "5493625559876",
  email: "contacto@laparrilladedonjorge.com.ar",
  especialidad: "Parrilla, pastas y pizzas artesanales",
  url: "https://laparrilladedonjorge.com.ar",
} as const;

// Horarios de atención, como objeto para reutilizar en componentes.
export interface Horario {
  dia: string;
  horario: string;
}

export const HORARIOS: Horario[] = [
  { dia: "Lunes a sábado", horario: "12:00 a 15:00 y 20:00 a 24:00" },
  { dia: "Domingo", horario: "12:00 a 16:00" },
];

// Arma una URL de wa.me con el mensaje ya codificado.
export function urlWhatsApp(mensaje: string): string {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// Mensajes predefinidos reutilizados en varios componentes.
export const WHATSAPP_RESERVA =
  "Hola, quiero hacer una reserva en La Parrilla de Don Jorge";
export const WHATSAPP_CONSULTA =
  "Hola, quiero consultar el menú de La Parrilla de Don Jorge";
export const WHATSAPP_DEFAULT = WHATSAPP_CONSULTA;

// Carta del restaurante.
export interface Plato {
  nombre: string;
  descripcion: string;
  precio: string;
}
export interface Categoria {
  nombre: string;
  platos: Plato[];
}

export const MENU: Categoria[] = [
  {
    nombre: "Entradas",
    platos: [
      {
        nombre: "Provoleta a la parrilla",
        descripcion: "Queso provolone fundido a las brasas con orégano y aceite de oliva.",
        precio: "$6.000",
      },
      {
        nombre: "Empanadas criollas (x6)",
        descripcion: "Media docena de empanadas de carne cortada a cuchillo.",
        precio: "$7.000",
      },
      {
        nombre: "Tabla de fiambres",
        descripcion: "Selección de fiambres, quesos y aceitunas para compartir.",
        precio: "$9.000",
      },
    ],
  },
  {
    nombre: "Principales",
    platos: [
      {
        nombre: "Asado de tira",
        descripcion: "Tira de asado a la parrilla, tierna y jugosa, a las brasas.",
        precio: "$18.000",
      },
      {
        nombre: "Vacío a la parrilla",
        descripcion: "Corte de vacío cocido lento a la leña hasta el punto justo.",
        precio: "$19.000",
      },
      {
        nombre: "Pollo entero",
        descripcion: "Pollo a la parrilla con hierbas, ideal para compartir.",
        precio: "$14.000",
      },
      {
        nombre: "Pasta fresca al fileto",
        descripcion: "Tallarines caseros con salsa fileto de tomate y albahaca.",
        precio: "$12.000",
      },
      {
        nombre: "Pizza artesanal napolitana",
        descripcion: "Masa madre, tomate, mozzarella, jamón y morrón asado.",
        precio: "$13.000",
      },
      {
        nombre: "Milanesa napolitana",
        descripcion: "Milanesa de ternera con jamón, salsa y mozzarella, con papas.",
        precio: "$15.000",
      },
    ],
  },
  {
    nombre: "Postres",
    platos: [
      {
        nombre: "Flan casero con dulce de leche",
        descripcion: "Flan casero con abundante dulce de leche y crema.",
        precio: "$5.000",
      },
      {
        nombre: "Tiramisú",
        descripcion: "Clásico tiramisú con café, mascarpone y cacao.",
        precio: "$6.000",
      },
      {
        nombre: "Ensalada de frutas",
        descripcion: "Frutas de estación cortadas al momento.",
        precio: "$4.000",
      },
    ],
  },
];
