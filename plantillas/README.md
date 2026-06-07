# Plantillas por rubro

Cada subcarpeta (menos `_base/`) es una **plantilla de un rubro**: un proyecto
Astro independiente y publicable, que reutiliza los componentes de
`@sitio-firme/base`.

- `_base/` → `@sitio-firme/base`, componentes compartidos (no se publica solo).
- `cabanas/` → `@sitio-firme/cabanas`, primera plantilla (referencia).
- `restaurante/`, `veterinaria/`, `kinesiologia/` → pendientes (solo `.gitkeep`).

## Cómo crear un rubro nuevo

Tomá `cabanas/` como molde. Pasos:

1. **Crear la carpeta** `plantillas/<rubro>/` con esta estructura mínima:

   ```
   <rubro>/
   ├── package.json
   ├── astro.config.mjs
   ├── tsconfig.json
   ├── public/
   └── src/
       ├── pages/index.astro
       └── styles/global.css
   ```

2. **`package.json`** — copiá el de `cabanas` y cambiá `name` a
   `@sitio-firme/<rubro>`. Mantené las dependencias (astro, react, react-dom,
   `@astrojs/react`, `@tailwindcss/vite`, tailwindcss, `@supabase/supabase-js`,
   `@sitio-firme/base`) y devDeps (`@types/react`, `@types/react-dom`).

3. **`astro.config.mjs`** — idéntico a cabañas:

   ```js
   import { defineConfig } from 'astro/config';
   import react from '@astrojs/react';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     integrations: [react()],
     vite: { plugins: [tailwindcss()] },
   });
   ```

4. **`src/styles/global.css`** — importá Tailwind, apuntá `@source` a `_base` y
   definí los tokens de color del rubro en `@theme`:

   ```css
   @import "tailwindcss";

   /* desde plantillas/<rubro>/src/styles/ hasta plantillas/_base/ */
   @source "../../../_base/**/*.{astro,tsx}";

   @theme {
     --color-primary: #......;
     --color-secondary: #......;
     --color-accent: #......;
     --color-text: #......;
   }
   ```

   > La ruta `../../../_base` es relativa al `global.css`: tres niveles arriba
   > (`styles` → `src` → `<rubro>` → `plantillas`) y entrás a `_base`.

5. **Agregar scripts** en el `package.json` raíz (opcional pero recomendado):

   ```json
   "dev:<rubro>": "npm run dev -w @sitio-firme/<rubro>",
   "build:<rubro>": "npm run build -w @sitio-firme/<rubro>"
   ```

   y sumá `build:<rubro>` a `build:all`.

6. **`npm install`** desde la raíz para enlazar el nuevo workspace y, si
   reaparece Vite 8 en `npm ls vite`, hacé un install limpio (ver README raíz).

## Convención de islands (ver CLAUDE.md)

- `.astro` → estructura, layout, SEO, secciones estáticas.
- `.tsx` con `client:load` → header con menú mobile.
- `.tsx` con `client:visible` → galería, formularios, calendario, carrito.
- Nunca JS donde no hay interactividad real.
