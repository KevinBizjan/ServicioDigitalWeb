export interface Turno {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  servicio: string;
  mensaje?: string;
  estado?: string;
  created_at?: string;
}

export interface SlotHorario {
  hora: string;
  disponible: boolean;
}
