import { urlWhatsApp, MENSAJE_DISPONIBILIDAD } from "../consts";

export default function WhatsAppFloat() {
  return (
    <a
      href={urlWhatsApp(MENSAJE_DISPONIBILIDAD)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center"
    >
      {/* Tooltip */}
      <span className="pointer-events-none mr-3 whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        ¿Consultas? Escribinos
      </span>

      {/* Círculo verde con ícono de WhatsApp */}
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:brightness-110"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.41a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24zm-3.2 4.43c-.15 0-.4.06-.6.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.12.15 1.6 2.45 3.9 3.43.54.24.97.38 1.3.48.55.17 1.05.15 1.44.09.44-.07 1.35-.55 1.54-1.08.19-.53.19-.99.13-1.08-.06-.1-.21-.15-.44-.27-.23-.12-1.35-.66-1.56-.74-.21-.08-.36-.12-.51.12-.15.22-.58.73-.71.88-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.28-1.59-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.4.12-.13.15-.22.23-.37.08-.15.04-.28-.02-.4-.06-.11-.51-1.24-.71-1.7-.18-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01z" />
        </svg>
      </span>
    </a>
  );
}
