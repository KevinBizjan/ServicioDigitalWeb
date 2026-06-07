// TODO: Formulario de contacto (Formspree en tier básico, Supabase en superiores).
// Island con client:visible (se hidrata al entrar en viewport).
// Placeholder mínimo solo para verificar el build.
interface Props {
  // TODO: action de Formspree visible como placeholder, ver CLAUDE.md.
  action?: string;
}

export default function ContactForm({ action = "https://formspree.io/f/REEMPLAZAR" }: Props) {
  // TODO: campos (nombre, email, mensaje), validación y estado de envío.
  return (
    <form className="flex flex-col gap-4" action={action} method="POST">
      {/* TODO: inputs + botón enviar */}
    </form>
  );
}
