import { useState } from "react";

const SEEDS = [40, 41, 42, 43, 44, 45];

export default function Galeria() {
  const [activa, setActiva] = useState<number | null>(null);

  return (
    <section id="galeria" className="bg-primary py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-accent sm:text-4xl">Galería</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-secondary/70">
          Nuestros platos y el ambiente del salón.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEEDS.map((seed) => (
            <button
              key={seed}
              type="button"
              onClick={() => setActiva(seed)}
              className="group overflow-hidden rounded-xl"
              aria-label="Ampliar imagen"
            >
              <img
                src={`https://picsum.photos/seed/${seed}/800/600`}
                alt={`Foto ${seed - 39} de La Parrilla de Don Jorge`}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activa !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80 p-4"
          style={{ zIndex: 60 }}
          onClick={() => setActiva(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
        >
          <button
            type="button"
            onClick={() => setActiva(null)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 text-white"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <img
            src={`https://picsum.photos/seed/${activa}/1200/900`}
            alt={`Foto ${activa - 39} de La Parrilla de Don Jorge ampliada`}
            width={1200}
            height={900}
            loading="lazy"
            className="w-auto max-w-full rounded-lg object-contain"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
