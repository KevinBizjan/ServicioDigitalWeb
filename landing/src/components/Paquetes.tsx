import { PAQUETES, urlWhatsApp, mensajePaquete } from "../consts";

export default function Paquetes() {
  return (
    <section id="servicios" className="bg-primary py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Elegí el plan que necesita tu negocio
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/70">
          Sin precios fijos porque cada negocio es distinto. Consultanos y
          armamos algo a tu medida.
        </p>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {PAQUETES.map((paquete) => (
            <article
              key={paquete.nombre}
              className={`animate-on-scroll relative flex h-full flex-col rounded-2xl bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                paquete.destacado
                  ? "border-2 border-accent md:scale-105 md:shadow-2xl"
                  : "border border-white/10"
              }`}
            >
              {paquete.destacado && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Más elegido
                </span>
              )}

              <h3 className="text-2xl font-bold">{paquete.nombre}</h3>
              <p className="mt-2 text-sm text-white/70">{paquete.descripcion}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {paquete.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0 text-accent2"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={urlWhatsApp(mensajePaquete(paquete.nombre))}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 rounded-full px-6 py-3 text-center font-semibold transition-all duration-300 ${
                  paquete.destacado
                    ? "text-white hover:scale-[1.02]"
                    : "border border-white/25 text-white hover:bg-white/10"
                }`}
                style={
                  paquete.destacado
                    ? {
                        backgroundImage:
                          "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                        boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                      }
                    : undefined
                }
              >
                {paquete.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
