import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

const LINKS: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Tarifas", href: "#tarifas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold text-accent">
          Cabañas Don Ramón
        </a>

        {/* Nav desktop */}
        <ul className="hidden gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm transition hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa mobile */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
          className="md:hidden"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {abierto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menú desplegable mobile */}
      {abierto && (
        <ul className="flex flex-col gap-1 border-t border-white/10 px-6 pb-4 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setAbierto(false)}
                className="block py-2 text-sm transition hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
