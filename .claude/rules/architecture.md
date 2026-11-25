---
paths:
  - "app/**"
  - "components/**"
  - "config/**"
  - "lib/**"
---

# Architecture

## Content model
All resume/personal content (bio, education, experience, leadership, skills, interests, projects, gallery photos) lives in **`config/content.ts`** as one typed object — this is the single source of truth. Pages import `content` and map over it rather than hardcoding data. Dynamic routes generate their params from it:
- `app/about/[slug]/page.tsx` — one page per `content.interests[]` entry (slug = kebab-cased name)
- `app/experience/[slug]/page.tsx` — one page per experience entry

`content.projects[]` holds music/project showcase entries (title, type, description, audioSrc, embedUrl, link) — currently placeholders for `app/projects`, fill in as real work gets added. `audioSrc` (a raw file in `public/`) renders the custom `AudioPlayer`; `embedUrl` (Spotify/SoundCloud/YouTube) renders an iframe instead.

When updating resume info (new job, updated stats, new interest), edit `config/content.ts` — don't scatter data into components.

## Pages
`app/layout.tsx` renders the shared shell once: skip link, `ShaderBackground`, `Navbar`, `<main id="main-content" class="pt-16">`, `Footer`. Pages render only their own content (no per-page Navbar/Footer/main). `app/page.tsx` (home) is a client component. `app/about`, `app/experience`, `app/contact` are thin server components that render a composite from `components/`. `app/projects` returns `notFound()` while `showProjects` (exported from `config/content.ts`) is false, and Projects is hidden from the Navbar, Footer and home Explore cards. Set `showProjects = true` once real tracks are added.

Detail pages (`app/about/[slug]`, `app/experience/[slug]`) are linked from the Interests panel and the expanded Experience rows ("View details"). Slugs come from `lib/slugs.ts`. Both use the dark glass theme and export `generateMetadata`.

## Components (`components/`)
Shared building blocks: `GlassCard` (the dark glass card) and `SectionHeading` (page/section title, use `as="h1"` for the page title). Use `cn()` for class merging. Animated pieces: `ShaderBackground` (pauses when the tab is hidden, still frame under reduced motion), `BlurText`, `FuzzyText`, `ShinyText` (home hero only, avoid elsewhere), `Masonry`, `PhotoCarousel`, `InterestsPanel`, `AudioPlayer` (custom inline audio player, adapted from 21st.dev). Page-level composites: `About`, `Experience`, `Projects`, `Contact`, `Navbar`, `Footer`.

Text colors on glass: use the `text-muted` and `text-subtle` tokens from `app/globals.css` rather than `text-white/40`, `text-gray-500` or `text-green-400/60` (too low contrast over the green background).

`lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use it for conditional/merged className strings instead of manual string concatenation.
