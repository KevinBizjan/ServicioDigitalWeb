import { useState } from "react";

// Cada foto trae su id de Unsplash y un alt descriptivo propio.
const FOTOS = [
  { id: "photo-1631630259742-c0f0b17c6c10", alt: "Interior cálido de la cabaña con estufa a leña" },
  { id: "photo-1755200353224-80b7d8e535a0", alt: "Fogón encendido en el refugio durante la noche" },
  { id: "photo-1768178540284-ab256d312e61", alt: "Cabaña con pileta rodeada de bosque" },
  { id: "photo-1558030137-a56c1b004fa3", alt: "Parrilla con carne lista para el asado" },
  { id: "photo-1595521624992-48a59aef95e3", alt: "Cabaña de madera entre los árboles del bosque" },
  { id: "photo-1727706572437-4fcda0cbd66f", alt: "Dormitorio acogedor de la cabaña" },
] as const;

export default function Galeria() {
  const [activa, setActiva] = useState<string | null>(null);
  const fotoActiva = FOTOS.find((f) => f.id === activa) ?? null;

  return (
    <section id="galeria" className="bg-primary py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-secondary sm:text-4xl">Galería</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-secondary/70">
          Conocé nuestras cabañas y el entorno.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOTOS.map((foto) => (
            <button
              key={foto.id}
              type="button"
              onClick={() => setActiva(foto.id)}
              className="group overflow-hidden rounded-xl"
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
