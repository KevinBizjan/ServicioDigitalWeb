import { useState } from "react";
import { supabase } from "../lib/supabase";
import { SERVICIOS, HORARIOS_TURNOS } from "../consts";
import type { SlotHorario } from "../types";

type EnvioEstado = "idle" | "cargando" | "confirmado" | "error";

const PASOS = ["Servicio", "Fecha", "Horario", "Tus datos"];

// Fecha local en formato YYYY-MM-DD (sin corrimiento por zona horaria).
function aISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dia}`;
}

function esDomingo(fechaISO: string): boolean {
  const [y, m, d] = fechaISO.split("-").map(Number);
  return new Date(y, m - 1, d).getDay() === 0;
}

const hoy = new Date();
const minFecha = aISO(hoy);
const maxFechaDate = new Date(hoy);
maxFechaDate.setDate(maxFechaDate.getDate() + 60);
const maxFecha = aISO(maxFechaDate);

export default function SistemaTurnos() {
  const [paso, setPaso] = useState(1);
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [ocupadas, setOcupadas] = useState<string[]>([]);
  const [cargandoSlots, setCargandoSlots] = useState(false);
  const [errorFecha, setErrorFecha] = useState("");
  const [envio, setEnvio] = useState<EnvioEstado>("idle");

  function onChangeFecha(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    setHora("");
    if (valor && esDomingo(valor)) {
      setErrorFecha("Los domingos no atendemos. Elegí otro día.");
      setFecha("");
      return;
    }
    setErrorFecha("");
    setFecha(valor);
  }

  async function irAHorarios() {
    setCargandoSlots(true);
    setEnvio("idle");
    const { data, error } = await supabase.rpc("horas_ocupadas", { p_fecha: fecha });
    setOcupadas(error || !data ? [] : data);
    setCargandoSlots(false);
    setPaso(3);
  }

  async function confirmar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get("nombre") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const telefono = String(fd.get("telefono") ?? "").trim();
    const mensaje = String(fd.get("mensaje") ?? "").trim();

    setEnvio("cargando");
    const { error } = await supabase.from("turnos").insert({
      nombre,
      email,
      telefono,
      fecha,
      hora,
      servicio,
      mensaje: mensaje || null,
    });
    setEnvio(error ? "error" : "confirmado");
  }

  function reiniciar() {
    setPaso(1);
    setServicio("");
    setFecha("");
    setHora("");
    setOcupadas([]);
    setErrorFecha("");
    setEnvio("idle");
  }

  const slotsManana: SlotHorario[] = HORARIOS_TURNOS.manana.map((h) => ({
    hora: h,
    disponible: !ocupadas.includes(h),
  }));
  const slotsTarde: SlotHorario[] = HORARIOS_TURNOS.tarde.map((h) => ({
    hora: h,
    disponible: !ocupadas.includes(h),
  }));

  return (
    <section id="turnos" className="bg-primary py-20 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold text-accent sm:text-4xl">Sacá tu turno online</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-white/70">
          En cuatro pasos reservás tu turno. Te confirmamos a la brevedad.
        </p>

        {/* Barra de progreso */}
        <div className="mt-10">
          <div className="flex justify-between text-xs font-medium text-white/70">
            {PASOS.map((label, i) => (
              <span key={label} className={i + 1 <= paso ? "text-accent" : ""}>
                {i + 1}. {label}
              </span>
            ))}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${(paso / 4) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-white/60">{paso}/4</p>
        </div>

        <div className="mt-8 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          {/* Paso 1: servicio */}
          {paso === 1 && (
            <div>
              <h3 className="text-lg font-semibold">Elegí el servicio</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SERVICIOS.map((s) => {
                  const activo = servicio === s.nombre;
                  return (
                    <button
                      key={s.nombre}
                      type="button"
                      onClick={() => setServicio(s.nombre)}
                      aria-pressed={activo}
                      className={
                        activo
                          ? "rounded-xl border-2 border-accent bg-accent/10 p-4 text-left transition"
                          : "rounded-xl border border-white/15 p-4 text-left transition hover:border-accent/60"
                      }
                    >
                      <span className="font-semibold">{s.nombre}</span>
                      <span className="mt-1 block text-sm text-white/60">{s.descripcion}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  disabled={!servicio}
                  onClick={() => setPaso(2)}
                  className="rounded-full bg-accent px-6 py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 2: fecha */}
          {paso === 2 && (
            <div>
              <h3 className="text-lg font-semibold">Elegí la fecha</h3>
              <p className="mt-2 text-sm text-white/60">
                Atendemos de lunes a sábado. Podés reservar hasta 60 días en adelante.
              </p>
              <input
                type="date"
                value={fecha}
                min={minFecha}
                max={maxFecha}
                onChange={onChangeFecha}
                className="mt-4 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white outline-none focus:border-accent"
              />
              {errorFecha && <p className="mt-2 text-sm text-red-300">{errorFecha}</p>}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setPaso(1)}
                  className="rounded-full border border-white/25 px-6 py-2.5 font-semibold text-white/90 transition hover:border-accent"
                >
                  Volver
                </button>
                <button
                  type="button"
                  disabled={!fecha || cargandoSlots}
                  onClick={irAHorarios}
                  className="rounded-full bg-accent px-6 py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  {cargandoSlots ? "Buscando..." : "Continuar"}
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: horario */}
          {paso === 3 && (
            <div>
              <h3 className="text-lg font-semibold">Elegí el horario</h3>
              <p className="mt-2 text-sm text-white/60">
                Turnos para el {fecha}. Los horarios en gris ya están ocupados.
              </p>

              <SlotGrid titulo="Mañana" slots={slotsManana} seleccionada={hora} onSelect={setHora} />
              <SlotGrid titulo="Tarde" slots={slotsTarde} seleccionada={hora} onSelect={setHora} />

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setPaso(2)}
                  className="rounded-full border border-white/25 px-6 py-2.5 font-semibold text-white/90 transition hover:border-accent"
                >
                  Volver
                </button>
                <button
                  type="button"
                  disabled={!hora}
                  onClick={() => setPaso(4)}
                  className="rounded-full bg-accent px-6 py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: datos */}
          {paso === 4 && envio !== "confirmado" && (
            <form onSubmit={confirmar}>
              <h3 className="text-lg font-semibold">Tus datos</h3>

              <div className="mt-4 rounded-xl bg-accent/10 p-4 text-sm ring-1 ring-accent/30">
                <p><span className="text-white/60">Servicio:</span> {servicio}</p>
                <p><span className="text-white/60">Fecha:</span> {fecha}</p>
                <p><span className="text-white/60">Horario:</span> {hora} hs</p>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <label className="flex flex-col gap-1 text-sm">
                  Nombre
                  <input name="nombre" type="text" required className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 outline-none focus:border-accent" placeholder="Tu nombre" />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Email
                  <input name="email" type="email" required className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 outline-none focus:border-accent" placeholder="tu@email.com" />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Teléfono
                  <input name="telefono" type="tel" required className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 outline-none focus:border-accent" placeholder="+54 9 ..." />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Mensaje (opcional)
                  <textarea name="mensaje" rows={3} className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 outline-none focus:border-accent" placeholder="Contanos el motivo de la consulta" />
                </label>
              </div>

              {envio === "error" && (
                <p className="mt-4 text-sm text-red-300">No pudimos registrar el turno. Probá de nuevo o escribinos por WhatsApp.</p>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setPaso(3)}
                  className="rounded-full border border-white/25 px-6 py-2.5 font-semibold text-white/90 transition hover:border-accent"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={envio === "cargando"}
                  className="rounded-full bg-accent px-6 py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  {envio === "cargando" ? "Confirmando..." : "Confirmar turno"}
                </button>
              </div>
            </form>
          )}

          {/* Confirmación */}
          {envio === "confirmado" && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">¡Turno reservado!</h3>
              <p className="mt-2 text-white/70">
                Te esperamos el {fecha} a las {hora} hs para {servicio}. Te
                contactaremos para confirmar.
              </p>
              <button
                type="button"
                onClick={reiniciar}
                className="mt-6 rounded-full border border-white/25 px-6 py-2.5 font-semibold text-white/90 transition hover:border-accent"
              >
                Sacar otro turno
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface SlotGridProps {
  titulo: string;
  slots: SlotHorario[];
  seleccionada: string;
  onSelect: (hora: string) => void;
}

function SlotGrid({ titulo, slots, seleccionada, onSelect }: SlotGridProps) {
  return (
    <div className="mt-5">
      <p className="text-sm font-semibold text-white/80">{titulo}</p>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((slot) => {
          const activo = seleccionada === slot.hora;
          return (
            <button
              key={slot.hora}
              type="button"
              disabled={!slot.disponible}
              onClick={() => onSelect(slot.hora)}
              aria-pressed={activo}
              className={
                activo
                  ? "rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white transition"
                  : "rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white/90 transition hover:border-accent disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/25 disabled:hover:border-white/5"
              }
            >
              {slot.hora}
            </button>
          );
        })}
      </div>
    </div>
  );
}
