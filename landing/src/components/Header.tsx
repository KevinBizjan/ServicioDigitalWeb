import { useEffect, useState } from "react";
import { urlWhatsApp, MENSAJE_GENERAL } from "../consts";

interface NavLink {
  label: string;
  href: string;
}

const LINKS: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Rubros", href: "#rubros" },
  { label: "Por qué nosotros", href: "#por-que-nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fondo sólido arriba de todo; con blur translúcido al scrollear.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-colors duration-300 ${
        scrolled ? "bg-primary/80 shadow-lg backdrop-blur-md" : "bg-primary"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="text-white">Sitio</span>
          <span className="text-accent">Firme</span>
        </a>

        {/* Nav desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm transition hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={urlWhatsApp(MENSAJE_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Hablemos
            </a>
          </li>
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
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Menú desplegable mobile */}
      {abierto && (
        <div className="border-t border-white/10 bg-primary px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-1">
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
          <a
            href={urlWhatsApp(MENSAJE_GENERAL)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
            className="mt-3 block rounded-full bg-accent px-5 py-2 text-center text-sm font-semibold text-white transition hover:brightness-110"
          >
            Hablemos
          </a>
        </div>
      )}
    </header>
  );
}
