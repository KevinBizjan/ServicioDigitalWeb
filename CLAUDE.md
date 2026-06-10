# SitioFirme — Contexto del proyecto

## Quién soy y qué hago
Agencia "SitioFirme". Vendo sitios web completos a PyMEs argentinas
(Chaco, Corrientes y región NEA). Cada plantilla es un producto real
que entrego a un cliente de ese rubro.

## Tiers de servicio
- Básico: landing estática (Astro + Formspree + Cloudflare Pages)
- Intermedio: sitio funcional (+ Supabase + Resend + WhatsApp)
- Premium: sistema completo (+ MercadoPago + Wassenger + Decap CMS)

## Stack definitivo (no cambiar sin preguntar)
- Frontend: Astro 6 + React 18 islands + Tailwind CSS v4 + TypeScript strict
- Backend: Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- Pagos: MercadoPago Checkout Pro
- Emails: Resend
- Formularios simples: Formspree (tier básico)
- WhatsApp simple: wa.me links con mensaje predefinido
- WhatsApp API: Wassenger (tier premium)
- Hosting: Cloudflare Pages
- Dominios: NIC.ar (.com.ar) / Namecheap (.com)
- CMS: Decap CMS conectado a GitHub (tier premium)
- Control de versiones: GitHub, un repo por cliente

## Arquitectura Astro + React islands
- .astro → estructura, layout, SEO, secciones estáticas
- .tsx con client:visible → galería, formularios, calendario, carrito
- .tsx con client:load → header con menú mobile
- Nunca frameworks JS donde no hay interactividad real

## Configuración técnica fija
- Tailwind v4: tokens en @theme {} dentro de global.css (NO tailwind.config.mjs)
- Tailwind se integra via @tailwindcss/vite en astro.config.mjs
- React se integra via @astrojs/react en astro.config.mjs
- Vite fijado en ^7.3.2 via overrides en package.json raíz (NO actualizar)
- npm workspaces: un solo node_modules en la raíz
- Componentes compartidos en plantillas/_base/ como @sitio-firme/base

## Convenciones de código
- Idioma: español argentino, voseo
- Imágenes: en plantillas entregadas, fotos reales de Unsplash
  (https://images.unsplash.com/photo-ID?w=W&h=H&fit=crop&q=80). picsum.photos
  solo queda como placeholder genérico en _base/ hasta tener datos reales.
  Siempre loading="lazy", width y height explícitos y alt descriptivo en español
- WhatsApp URL: https://wa.me/549XXXXXXXXXX?text=MENSAJE_ENCODED
- Formspree: action="https://formspree.io/f/REEMPLAZAR" visible como placeholder
- Google Maps: iframe embed estándar, sin API key
- Mobile-first siempre
- TypeScript strict en todos los archivos .ts y .tsx
- Sin any, sin @ts-ignore salvo caso muy justificado

## Antes de escribir cualquier código
Listá todos los archivos que vas a crear o modificar y esperá confirmación.

## Decisiones técnicas y errores conocidos

- @source en global.css debe apuntar a ../../../_base/**/*.{astro,tsx}
  (no a plantillas/_base, esa ruta resuelve mal desde dentro del proyecto)
- @astrojs/react debe ser ^5.0.7 (línea para Astro 6 / Vite 7). NO usar 4.x
  (Astro 5 / Vite 6): compila el build pero ROMPE la hidratación en dev
  (react-dom/client no exporta createRoot → ningún island hidrata, botones
  muertos). El build NO lo detecta; verificar en navegador (npm run smoke).
- Verificación: build no ejecuta el sitio. Para hidratación correr npm run smoke
  (smoke test headless con Chrome del sistema, scripts/smoke.mjs).
- Scaffolding manual en vez de npm create astro (evita descargas interactivas)
- .tsx usa className (no class) para que React no se queje
- landing/ está en la raíz (no bajo plantillas/), así que su @source apunta a
  ../../../plantillas/_base/**, NO a ../../../_base/** como las plantillas:
  la profundidad de carpetas es distinta. Hoy landing solo consume
  SEOHead.astro de _base (sin clases Tailwind), así que ese @source quedó
  inofensivo pero ya no imprescindible.
- smoke test: la PRIMERA corrida tras un build suele fallar "header interactivo"
  en las primeras plantillas porque Vite reoptimiza dependencias y la
  hidratación llega después del wait de 1500ms. No es un bug: re-correr
  npm run smoke con la caché tibia y da OK en las 4.
- Tipografía landing/: display = Sora, cuerpo = Inter (Google Fonts via @import
  al tope de global.css, tokens --font-display/--font-body en @theme). NO usar
  Syne: su "g" es de un solo piso con gancho corto y se lee "cortada/plana"
  (no es bug de CSS, es el diseño de la fuente; verificado a nivel de píxel).
- NO aplicar gradiente al título con background-clip:text +
  -webkit-text-fill-color:transparent: en Blink/Chrome RECORTA los descendentes
  (la "g" sale cortada) y ni padding ni line-height lo arreglan. Para acentos de
  color en un título usar color sólido en un <span>, nunca clip de texto.
  Matiz por descendentes (g/j/p/q/y): el clip SOLO es seguro si el texto exacto
  del h1 no tiene ninguna. cabanas/ "Cabañas Don Ramón" no tiene → ahí se usó
  gradiente white→gold con clip. restaurante/ "La Parrilla de Don Jorge" tiene la
  "g" de Jorge → clip recorta, así que el acento coral va por <span> sólido. Ante
  la duda, regla por defecto = <span> sólido. Verificar SIEMPRE el texto real,
  no asumir.
- landing/ animaciones de entrada: clase .animate-on-scroll + IntersectionObserver
  inline en Layout.astro. El estado oculto (opacity:0) va scopeado a html.js, y un
  <script is:inline> agrega .js en el <head> antes del render: sin JS el contenido
  NUNCA queda invisible. Respetar prefers-reduced-motion (ya en global.css).

## Estado actual del proyecto

### Completado
- [x] Monorepo configurado y builds verificados
- [x] _base/: SEOHead.astro, Footer.astro completados con props
- [x] plantillas/cabanas/ completa (Don Ramón) — build ✅
- [x] plantillas/restaurante/ completa (Don Jorge) — build ✅
- [x] _base/SEOHead.astro: schemaType como prop, default LocalBusiness
- [x] plantillas/kinesiologia/ completa con Supabase — build ✅
- [x] RPC horas_ocupadas() en Supabase (SECURITY DEFINER)
- [x] src/lib/supabase.ts patrón establecido para futuros rubros
- [x] src/types.ts patrón establecido
- [x] landing/ de SitioFirme completa (agencia) — build ✅ + smoke ✅
  (Footer propio, schema ProfessionalService, sin Supabase, form Formspree)
- [x] landing/ pase estético: Sora (display) + Inter (cuerpo), animaciones de
      entrada al scroll con fallback no-JS, hover de cards y CTAs con gradiente
- [x] cards de la landing (Rubros) enlazan a la demo de cada plantilla
      (campo url en RUBROS, target=_blank); URLs placeholder pages.dev
- [x] imágenes reales de Unsplash en las 3 plantillas + cards de la landing
      (heroes, galerías, Nosotros). landing/ hero sigue siendo gradiente
- [x] favicon SVG por sitio (landing + 3 plantillas), link en _base/SEOHead.astro
- [x] cabanas/ pase estético: Sora (display) + Inter (cuerpo), animaciones de
      entrada al scroll (mismo patrón que landing), hover lift de cards, CTAs con
      gradiente accent→amber-600 + sombra de color, Header con blur al scroll.
      Hero h1 con gradiente white→gold por clip (seguro: "Cabañas Don Ramón" no
      tiene descendentes) — build ✅
- [x] restaurante/ pase estético: mismo patrón (Sora + Inter, animaciones, hover
      lift, CTAs con gradiente accent→red-700, Header con blur). Hero h1 SIN clip:
      acento de color con <span> sólido coral en "Don Jorge" porque la "g" es
      descendente y el clip la recortaría — build ✅

### Pendiente
- [ ] plantillas/veterinaria/
- [ ] MercadoPago (tier premium, aún sin implementar)
- [ ] Decap CMS (tier premium, aún sin implementar)
- [ ] Reemplazar placeholders de la landing al publicar: WhatsApp 5493794966406,
      mail bizjankevin@gmail.com, IG @sitiofirme, endpoint Formspree REEMPLAZAR

## Decisiones técnicas aprendidas

- Islands van en el rubro específico (cabanas/src/components/) con datos
  reales. _base/ conserva placeholders genéricos hasta tener 2+ rubros
  que compartan la misma lógica, ahí se refactoriza con props.
- consts.ts en cada plantilla: única fuente de verdad para datos del
  negocio y helpers de WhatsApp. Cuando el cliente cambia el teléfono
  se toca un solo archivo.
- min-h-screen en lugar de min-h-[90vh], colores fuera de paleta
  (como #25D366 de WhatsApp) van por style inline, no clases arbitrarias.
- astro check requiere @astrojs/check + typescript extra. Dejarlo para
  cuando haya 3+ plantillas. Por ahora el build solo es suficiente.
- _base/ props con defaults: Footer y SEOHead funcionan sin datos
  para que landing/ siga buildeando sin modificarse.
- schemaType en SEOHead es prop con default LocalBusiness (genérico).
  Cada Layout pasa el tipo correcto explícitamente:
  cabanas → LodgingBusiness, restaurante → Restaurant,
  veterinaria → VeterinaryCare, kinesiologia → MedicalBusiness,
  landing → ProfessionalService
- landing/ tiene Footer propio (landing/src/components/Footer.astro), NO usa
  el de _base: así personaliza textos (slogan, "© 2025 SitioFirme ·
  Corrientes, Capital") sin acoplar la landing a las plantillas de clientes
  ni tener que tocar _base.
- Menu.tsx con tabs por categoría es el patrón para cualquier
  listado con filtro (servicios, productos, turnos disponibles).
- Imágenes Unsplash: usar el ID en formato photo-NNNNN-xxxxx (el que vive en
  images.unsplash.com), NO el slug corto de la URL de la página (ajqDp29Pz7M):
  ese slug no resuelve contra images.unsplash.com. Verificar cada ID con un
  HEAD real (Invoke-WebRequest) antes de commitear: las búsquedas a veces
  devuelven el slug pegado al id (photo-123-abc-SLUG) y rompen la imagen.
- Galería con Unsplash: las galerías ya no usan un array de seeds numéricos;
  usan FOTOS = [{ id, alt }] con alt individual por foto. El estado del
  lightbox guarda el id (string) y se resuelve con FOTOS.find().
- Favicon: el <link rel="icon" href="/favicon.svg"> vive una sola vez en
  _base/SEOHead.astro (head compartido por los 4 sitios). Cada sitio sirve su
  propio public/favicon.svg, así que para cambiar el logo de una pestaña se
  reemplaza ese archivo sin tocar código. Son SVG monograma (rect + text con
  iniciales) en los colores de la paleta del sitio. SVG favicon no anda en
  Safari viejo; si un cliente lo necesita, sumar favicon.ico de respaldo.

## Supabase kinesio
- Proyecto: sitiofirme-kinesiologia
- URL: https://mnehhamflwifvuqzfobr.supabase.co
- Tabla: turnos (id, nombre, email, telefono, fecha, hora,
  servicio, mensaje, estado, created_at)
- RPC: horas_ocupadas(p_fecha date) → setof text
- RLS: INSERT público, SELECT denegado, RPC con SECURITY DEFINER
- .env.local nunca se commitea, credenciales guardadas aparte