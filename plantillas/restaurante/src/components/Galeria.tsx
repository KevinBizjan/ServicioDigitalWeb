import { useState } from "react";

// Cada foto trae su id de Unsplash y un alt descriptivo propio.
const FOTOS = [
  { id: "photo-1562625964-ffe9b2f617fc", alt: "Asado argentino a punto sobre la parrilla" },
  { id: "photo-1666037898517-e7a2da601a70", alt: "Brasas y fuego encendido de la parrilla" },
  { id: "photo-1624128082323-beb6b8b508db", alt: "Empanadas caseras recién horneadas" },
  { id: "photo-1709548145082-04d0cde481d4", alt: "Interior cálido del salón del restaurante" },
  { id: "photo-1593014109522-b2b56eb791aa", alt: "Pizza artesanal recién cortada" },
  { id: "photo-1612966893103-790e549a2ab1", alt: "Pasta fresca casera" },
] as const;

export default function Galeria() {
  const [activa, setActiva] = useState<string | null>(null);
  const fotoActiva = FOTOS.find((f) => f.id === activa) ?? null;

  return (
    <section id="galeria" className="bg-primary py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-accent sm:text-4xl">Galería</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-secondary/70">
          Nuestros platos y el ambiente del salón.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOTOS.map((foto) => (
            <button
              key={foto.id}
              type="button"
              onClick={() => setActiva(foto.id)}
              className="animate-on-scroll group overflow-hidden rounded-xl"
              aria-label="Ampliar imagen"
            >
              <img
                src={`https://images.unsplash.com/${foto.id}?w=800&h=600&fit=crop&q=80`}
                alt={foto.alt}
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
      {fotoActiva !== null && (
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
            src={`https://images.unsplash.com/${fotoActiva.id}?w=1200&h=900&fit=crop&q=80`}
            alt={`${fotoActiva.alt} (ampliada)`}
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
