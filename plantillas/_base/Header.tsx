// TODO: Header real con navegación + menú hamburguesa mobile.
// Island con client:load (interactividad necesaria desde el primer render).
// Placeholder mínimo solo para verificar el build.
export default function Header() {
  // TODO: estado open/close del menú mobile, links, logo.
  return (
    <header className="bg-primary text-secondary">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <span className="font-bold">SitioFirme</span>
        {/* TODO: navegación + botón menú mobile */}
      </nav>
    </header>
  );
}
