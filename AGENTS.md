# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

@AGENTS.md

## About this project

Personal portfolio website for Michael Hong (Cal Poly Business/IS student, music tech interest). Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.

## Commands

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint
```

No formal test suite. Playwright is installed but there are no spec files — it's used ad hoc for manual visual verification (e.g. screenshotting localhost while iterating). Run `npm run dev` and check pages in a browser after UI changes.

Topic-specific conventions (architecture, styling, animation, images) live in `.Codex/rules/` and load automatically when relevant files are touched.

## Writing style

No em dashes in any prose written for this site (bios, descriptions, copy) or in chat responses. Use commas, periods, or parentheses instead.
