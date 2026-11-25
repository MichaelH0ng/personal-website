---
paths:
  - "**/*.tsx"
  - "app/globals.css"
  - "app/layout.tsx"
---

# Styling

- **Tailwind v4** — no `tailwind.config.js`; theme tokens are defined via `@theme inline` in `app/globals.css`.
- **Fonts** are loaded exclusively via `next/font/google` in `app/layout.tsx` as CSS variables (`--font-poppins`, `--font-playfair`). Poppins is the body default. Playfair is used for the name/hero accent. Don't add a new font without wiring it through `layout.tsx` the same way.
- **Palette**: green accent (`green-400`/`500`/`600`) on black/white/gray, dark glassmorphic cards (`bg-black/50 backdrop-blur-sm border-green-500/30`).
- **Accessibility**: `useReducedMotion()` from framer-motion gates JS-driven animation; `app/globals.css` has a global `prefers-reduced-motion` fallback that kills CSS animations/transitions. A skip-to-content link is in `layout.tsx`. Preserve both when adding new animated elements.
