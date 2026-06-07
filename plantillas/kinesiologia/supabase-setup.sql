-- ============================================================================
-- Setup de Supabase para Kinesiología Martínez (sistema de turnos)
-- Ejecutar una vez en el SQL Editor del proyecto.
--
-- Objetivo de seguridad: el sitio es público y usa la anon key (también
-- pública). La tabla `turnos` guarda datos sensibles (nombre, email, teléfono),
-- así que NO habilitamos SELECT directo para el rol anónimo. En su lugar:
--   - anon solo puede INSERTAR turnos.
--   - para mostrar qué horarios están ocupados se usa una función
--     SECURITY DEFINER que devuelve ÚNICAMENTE las horas, nunca datos del
--     paciente.
-- ============================================================================

-- Tabla (referencia; el spec dice que ya está creada).
create table if not exists public.turnos (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  email       text not null,
  telefono    text not null,
  fecha       date not null,
  hora        text not null,
  servicio    text not null,
  mensaje     text,
  estado      text not null default 'pendiente',
  created_at  timestamptz not null default now()
);

-- 1) RLS activado y sin política de SELECT para anon => no se puede leer la tabla.
alter table public.turnos enable row level security;

-- 2) anon (y usuarios) pueden CREAR turnos.
drop policy if exists "anon puede crear turnos" on public.turnos;
create policy "anon puede crear turnos"
  on public.turnos
  for insert
  to anon, authenticated
  with check (true);

-- 3) Función que devuelve solo las horas ocupadas de una fecha.
--    SECURITY DEFINER: corre con permisos del owner y saltea RLS para leer,
--    pero solo expone la columna `hora`.
create or replace function public.horas_ocupadas(p_fecha date)
returns setof text
language sql
security definer
set search_path = public
as $$
  select hora
  from public.turnos
  where fecha = p_fecha
    and estado = 'pendiente';
$$;

-- 4) Permitir ejecutar la función al rol anónimo (y autenticados).
grant execute on function public.horas_ocupadas(date) to anon, authenticated;
