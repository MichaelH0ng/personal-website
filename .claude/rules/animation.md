---
paths:
  - "**/*.tsx"
---

# Animation conventions

- **Framer Motion** is the primary animation library. Standard reveal pattern: `initial={{opacity:0, y:24}}`, `whileInView={{opacity:1, y:0}}`, `viewport={{once:true, margin:"-40px"}}`, `transition={{duration:0.5, ease:"easeOut"}}`.
- **GSAP** is used only in `components/Masonry.tsx`, not general UI motion.
- Always thread `shouldReduceMotion` (from `useReducedMotion()`) into any custom `setInterval`/animation loop, mirroring the pattern in `app/page.tsx`'s `TypewriterName`.
