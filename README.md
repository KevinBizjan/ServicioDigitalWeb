# SitioFirme — Monorepo

Monorepo de la agencia **SitioFirme**. Acá viven el sitio de la agencia
(`landing/`) y las **plantillas por rubro** que se entregan como producto a
clientes PyME del NEA (Chaco, Corrientes y región).

> El contexto de negocio, los tiers de servicio y las convenciones de código
> están en [`CLAUDE.md`](./CLAUDE.md). Ese archivo es la fuente de verdad.

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Astro 6 + React 18 (islands) + TypeScript strict |
| Estilos | Tailwind CSS v4 vía `@tailwindcss/vite` (tokens en `@theme {}`) |
| React | integrado vía `@astrojs/react` |
| Build tool | Vite 7 (fijado con `overrides` en la raíz) |
| Backend | Supabase (`@supabase/supabase-js`) |
| Monorepo | npm workspaces (un solo `node_modules` en la raíz) |

## Estructura

```
sitio-firme/
├── package.json          workspaces + override vite ^7.3.2 + scripts
├── landing/              sitio de la agencia (@sitio-firme/landing)
└── plantillas/
    ├── _base/            componentes compartidos (@sitio-firme/base)
    ├── cabanas/          primera plantilla (@sitio-firme/cabanas)
    ├── restaurante/      pendiente
    ├── veterinaria/      pendiente
    └── kinesiologia/     pendiente
```

## Comandos

```bash
npm install            # instalar todo el monorepo (desde la raíz)

npm run dev:landing    # dev server de la landing
npm run dev:cabanas    # dev server de la plantilla cabañas

npm run build:landing  # build de la landing
npm run build:cabanas  # build de la plantilla cabañas
npm run build:all      # build de todo
```

## Componentes compartidos (`@sitio-firme/base`)

Los componentes reutilizables viven en `plantillas/_base/` y se importan desde
cualquier plantilla:

```astro
---
import Footer from "@sitio-firme/base/Footer.astro";
import Header from "@sitio-firme/base/Header.tsx";
---
<Header client:load />
```

Para que Tailwind genere las clases que usan esos componentes, cada `global.css`
incluye un `@source` que apunta a `_base` (ver `plantillas/cabanas/src/styles/global.css`).

## ⚠️ Override de Vite (no quitar)

La raíz fija `"overrides": { "vite": "^7.3.2" }`. Astro 6 corre Vite 7; sin el
override, npm 11 instala Vite 8 en paralelo y el build nativo (rolldown) rompe
con `Missing field tsconfigPaths ...`. Si después de un `npm install` aparece
Vite 8 en `npm ls vite`, borrar `node_modules` + `package-lock.json` y reinstalar.

## Crear una plantilla nueva

Ver [`plantillas/README.md`](./plantillas/README.md).
