// TODO: Galería de imágenes (placeholders picsum.photos con seeds fijos).
// Island con client:visible (se hidrata al entrar en viewport).
// Placeholder mínimo solo para verificar el build.
interface Props {
  // TODO: lista de imágenes { src, alt, width, height }.
  imagenes?: { src: string; alt: string; width: number; height: number }[];
}

export default function Galeria({ imagenes = [] }: Props) {
  // TODO: grid responsive + lightbox. Recordar loading="lazy" y width/height.
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {imagenes.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading="lazy"
        />
      ))}
    </div>
  );
}
