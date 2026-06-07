// TODO: Botón flotante de WhatsApp (wa.me con mensaje predefinido).
// Island con client:load (visible y clickeable apenas carga la página).
// Placeholder mínimo solo para verificar el build.
interface Props {
  // TODO: numero en formato 549XXXXXXXXXX y mensaje a precargar.
  telefono?: string;
  mensaje?: string;
}

export default function WhatsAppFloat({ telefono = "", mensaje = "" }: Props) {
  // TODO: href={`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`}
  void telefono;
  void mensaje;
  return (
    <a
      className="fixed bottom-4 right-4 rounded-full bg-accent p-4 text-text shadow-lg"
      href="#"
    >
      {/* TODO: ícono de WhatsApp */}
      WA
    </a>
  );
}
