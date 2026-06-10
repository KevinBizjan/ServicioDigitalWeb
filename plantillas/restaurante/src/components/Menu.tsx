import { useState } from "react";
import { MENU } from "../consts";

export default function Menu() {
  const [activa, setActiva] = useState(0);
  const categoria = MENU[activa];

  return (
    <section id="menu" className="bg-primary py-20 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-3xl font-bold text-accent sm:text-4xl">Nuestro menú</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/70">
          Cocina de parrilla, pastas y pizzas artesanales.
        </p>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {MENU.map((cat, i) => (
            <button
              key={cat.nombre}
              type="button"
              onClick={() => setActiva(i)}
              aria-pressed={i === activa}
              className={
                i === activa
                  ? "rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition"
                  : "rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-accent hover:text-white"
              }
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Platos */}
        <ul className="mt-10 divide-y divide-white/10">
          {categoria.platos.map((plato) => (
            <li key={plato.nombre} className="animate-on-scroll flex items-baseline justify-between gap-4 py-4">
              <div>
                <h3 className="font-semibold text-white">{plato.nombre}</h3>
                <p className="mt-1 text-sm text-white/60">{plato.descripcion}</p>
              </div>
              <span className="shrink-0 font-semibold text-accent">{plato.precio}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
