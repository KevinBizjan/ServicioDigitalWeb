import { useState } from "react";
import { AGENCIA, RUBROS, urlWhatsApp, MENSAJE_GENERAL } from "../consts";

// Reemplazar por el endpoint real de Formspree al publicar.
const FORMSPREE_ACTION = "https://formspree.io/f/REEMPLAZAR";

// Opciones del select: los rubros que ya hacemos + "Otro".
const OPCIONES_RUBRO = [...new Set(RUBROS.map((r) => r.rubro)), "Otro"];

type Estado = "idle" | "enviando" | "enviado" | "error";

export default function Contacto() {
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

  const inputClass =
    "rounded-lg border border-primary/20 bg-white px-4 py-2 text-text outline-none transition focus:border-accent";

  return (
    <section id="contacto" className="bg-secondary py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        {/* Formulario */}
        <div>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">Hablemos</h2>
          <p className="mt-3 text-text/70">
            Contanos de tu negocio y te respondemos a la brevedad.
          </p>

          <form
            action={FORMSPREE_ACTION}
            method="POST"
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1 text-sm text-text">
              Nombre
              <input type="text" name="nombre" required className={inputClass} placeholder="Tu nombre" />
            </label>
            <label className="flex flex-col gap-1 text-sm text-text">
              Negocio
              <input type="text" name="negocio" className={inputClass} placeholder="Nombre de tu negocio" />
            </label>
            <label className="flex flex-col gap-1 text-sm text-text">
              Rubro
              <select name="rubro" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Elegí tu rubro
                </option>
                {OPCIONES_RUBRO.map((rubro) => (
                  <option key={rubro} value={rubro}>
                    {rubro}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-text">
              Teléfono
              <input type="tel" name="telefono" className={inputClass} placeholder="+54 9 ..." />
            </label>
            <label className="flex flex-col gap-1 text-sm text-text">
              Mensaje
              <textarea name="mensaje" required rows={4} className={inputClass} placeholder="¿Qué necesitás para tu negocio?" />
            </label>

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {estado === "enviando" ? "Enviando..." : "Enviar consulta"}
            </button>

            {estado === "enviado" && (
              <p className="text-sm text-accent2">¡Gracias! Te respondemos a la brevedad.</p>
            )}
            {estado === "error" && (
              <p className="text-sm text-red-500">Hubo un error. Probá de nuevo o escribinos por WhatsApp.</p>
            )}
          </form>
        </div>

        {/* Datos de contacto */}
        <div className="flex flex-col gap-8 md:pt-16">
          <a
            href={urlWhatsApp(MENSAJE_GENERAL)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl p-6 text-white shadow-lg transition hover:brightness-110"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.41a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24zm-3.2 4.43c-.15 0-.4.06-.6.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.12.15 1.6 2.45 3.9 3.43.54.24.97.38 1.3.48.55.17 1.05.15 1.44.09.44-.07 1.35-.55 1.54-1.08.19-.53.19-.99.13-1.08-.06-.1-.21-.15-.44-.27-.23-.12-1.35-.66-1.56-.74-.21-.08-.36-.12-.51.12-.15.22-.58.73-.71.88-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.28-1.59-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.4.12-.13.15-.22.23-.37.08-.15.04-.28-.02-.4-.06-.11-.51-1.24-.71-1.7-.18-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01z" />
            </svg>
            <div>
              <p className="text-sm opacity-90">Escribinos por WhatsApp</p>
              <p className="text-lg font-bold">Respondemos rápido</p>
            </div>
          </a>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Mail</h3>
            <p className="mt-1 text-text/90">{AGENCIA.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Instagram</h3>
            <a href={AGENCIA.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-text/90 transition hover:text-accent">
              {AGENCIA.instagram}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Dónde estamos</h3>
            <p className="mt-1 text-text/90">Atendemos {AGENCIA.ciudad}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
