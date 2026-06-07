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
- Imágenes placeholder: picsum.photos con seeds fijos, loading="lazy",
  width y height explícitos siempre
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
- npm ls vite sale con exit 1 marcando "invalid": es benigno, es solo que
  @astrojs/react@4.4.2 declara peer vite ^6 y lo forzamos a 7. No tocar.
- Scaffolding manual en vez de npm create astro (evita descargas interactivas)
- .tsx usa className (no class) para que React no se queje
- landing/ también necesita @source apuntando a _base porque consume
  los componentes compartidos

  ## Estado actual del proyecto

### Completado
- [x] Monorepo configurado y builds verificados
- [x] _base/: SEOHead.astro, Footer.astro completados con props
- [x] plantillas/cabanas/ completa (Don Ramón) — build ✅
- [x] plantillas/restaurante/ completa (Don Jorge) — build ✅
- [x] _base/SEOHead.astro: schemaType como prop, default LocalBusiness

### Pendiente
- [ ] Landing de SitioFirme
- [ ] plantillas/restaurante/
- [ ] plantillas/veterinaria/
- [ ] plantillas/kinesiologia/
- [ ] Integración Supabase
- [ ] MercadoPago
- [ ] Decap CMS

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
  veterinaria → VeterinaryCare, kinesiologia → MedicalBusiness
- Menu.tsx con tabs por categoría es el patrón para cualquier
  listado con filtro (servicios, productos, turnos disponibles