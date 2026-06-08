import { RUBROS, PROXIMOS_RUBROS } from "../consts";

export default function Rubros() {
  return (
    <section id="rubros" className="bg-secondary py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">
          Lo que ya construimos
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-text/70">
          Casos reales que entregamos a comercios y profesionales del NEA.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {RUBROS.map((caso) => (
            <article
              key={caso.seed}
              className="overflow-hidden rounded-2xl text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              style={{ backgroundColor: caso.color }}
            >
              <img
                src={`https://picsum.photos/seed/${caso.seed}/600/400`}
                alt={`Sitio de ${caso.nombre}`}
                width={600}
                height={400}
                loading="lazy"
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {caso.rubro}
                </span>
                <h3 className="mt-3 text-xl font-bold">{caso.nombre}</h3>
                <p className="mt-2 text-sm text-white/80">{caso.descripcion}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-text/60">
            Próximamente:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {PROXIMOS_RUBROS.map((rubro) => (
              <span
                key={rubro}
                className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm text-primary shadow-sm"
              >
                {rubro}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
