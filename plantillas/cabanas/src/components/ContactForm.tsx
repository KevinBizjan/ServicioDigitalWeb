import { useState } from "react";
import { NEGOCIO } from "../consts";

// Reemplazar por el endpoint real de Formspree al publicar.
const FORMSPREE_ACTION = "https://formspree.io/f/REEMPLAZAR";

type Estado = "idle" | "enviando" | "enviado" | "error";

export default function ContactForm() {
  const [estado, setEstado] = useState<Estado>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setEstado("enviando");
    try {
      const res = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setEstado("enviado");
      } else {
        setEstado("error");
      }
    } catch {
      setEstado("error");
    }
  }

  return (
    <section id="contacto" className="bg-primary py-20 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        {/* Formulario */}
        <div>
          <h2 className="text-3xl font-bold text-accent sm:text-4xl">Contacto</h2>
          <p className="mt-3 text-white/70">Escribinos y te respondemos a la brevedad.</p>

          <form action={FORMSPREE_ACTION} method="POST" onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm">
              Nombre
              <input
                type="text"
                name="nombre"
                required
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 outline-none focus:border-accent"
                placeholder="Tu nombre"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Email
              <input
                type="email"
                name="email"
                required
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 outline-none focus:border-accent"
                placeholder="tu@email.com"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Teléfono
              <input
                type="tel"
                name="telefono"
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 outline-none focus:border-accent"
                placeholder="+54 9 ..."
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Mensaje
              <textarea
                name="mensaje"
                required
                rows={4}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/40 outline-none focus:border-accent"
                placeholder="¿En qué fecha querés venir?"
              />
            </label>

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="rounded-full bg-accent px-6 py-3 font-semibold text-primary transition hover:brightness-110 disabled:opacity-60"
            >
              {estado === "enviando" ? "Enviando..." : "Enviar"}
            </button>

            {estado === "enviado" && (
              <p className="text-sm text-accent">¡Gracias! Tu mensaje fue enviado.</p>
            )}
            {estado === "error" && (
              <p className="text-sm text-red-300">Hubo un error. Probá de nuevo o escribinos por WhatsApp.</p>
            )}
          </form>
        </div>

        {/* Datos de contacto */}
        <div className="flex flex-col gap-6 md:pt-16">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Dirección</h3>
            <p className="mt-1 text-white/90">{NEGOCIO.direccion}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Teléfono</h3>
            <p className="mt-1 text-white/90">{NEGOCIO.telefono}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Mail</h3>
            <p className="mt-1 text-white/90">{NEGOCIO.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Horarios</h3>
            <p className="mt-1 text-white/90">Check-in: {NEGOCIO.checkIn} hs</p>
            <p className="text-white/90">Check-out: {NEGOCIO.checkOut} hs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
