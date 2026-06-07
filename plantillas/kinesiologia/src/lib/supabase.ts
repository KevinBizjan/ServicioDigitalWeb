import { createClient } from "@supabase/supabase-js";

// Tipo de la tabla `turnos` en Supabase. Se usa para tipar el cliente, de modo
// que `from("turnos")`, los `insert` y el `rpc` queden chequeados por TypeScript.
// Tipos `type` (no `interface`): un type alias de objeto satisface
// Record<string, unknown>, que es lo que GenericTable de supabase-js exige.
// Con `interface` el chequeo falla y el Schema colapsa a `never`.
type TurnoRow = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  servicio: string;
  mensaje: string | null;
  estado: string;
  created_at: string;
};

type TurnoInsert = {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  servicio: string;
  mensaje?: string | null;
  estado?: string;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      turnos: {
        Row: TurnoRow;
        Insert: TurnoInsert;
        Update: Partial<TurnoInsert>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      // Devuelve solo las horas ya ocupadas para una fecha. SECURITY DEFINER:
      // no expone el resto de los datos del paciente (ver supabase-setup.sql).
      horas_ocupadas: {
        Args: { p_fecha: string };
        Returns: string[];
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
