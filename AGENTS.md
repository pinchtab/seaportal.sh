# SeaPortal.sh — Agent Conventions & Architecture

## Overview
Astro 5+ static site (SSG) with **Tailwind CSS v4** + atomic components (cva-based). Zero runtime JavaScript by default. Islands architecture for any interactive features.

## Folder Structure

```
src/
├── components/
│   ├── ui/                 # Atomic primitives (Button, Card, Badge, CodeTerminal, Pill, SectionHeading)
│   │                       # Use cva + cn() for all variants
│   ├── layout/             # Page structure (BaseLayout, Footer)
│   ├── features/           # Page-specific feature blocks (Hero, Features, QuickStart, etc.)
│   └── docs/               # Documentation components (DocsRenderer, TerminalBlock)
├── lib/
│   ├── docs/               # Docs system (loader, markdown, config, types, transformers)
│   └── utils.ts            # cn() helper for class merging
├── pages/
│   ├── index.astro         # Home page
│   └── docs/               # Docs pages ([slug].astro dynamic routing)
├── styles/
│   └── global.css          # @import "tailwindcss" only
└── env.d.ts                # TypeScript definitions

docs/                       # Documentation content (markdown)
├── index.json              # Docs manifest (sections → files)
├── getting-started.md
├── api/
│   └── endpoints.md
└── guides/
    ├── streaming.md
    ├── caching.md
    └── transcription.md
```

## Design System

Read `DESIGN_SYSTEM.md` for the full palette and component patterns.

- **Theme**: Deep ocean blues + cyan glow (dark infrastructure feel)
- **Brand colors**: Use `brand-*` tokens from Tailwind config
- **Accent**: Cyan glow = active intelligence
- **Typography**: Inter (UI), JetBrains Mono (code)

## Component Patterns

### UI Primitives (`src/components/ui/`)
- Use **class-variance-authority (cva)** for variants
- Always use `cn()` to merge Tailwind + custom classes
- Accept `class` prop for overrides
- Provide TypeScript `Props` interface

### Feature Blocks (`src/components/features/`)
- Compose from ui/ primitives
- Use semantic HTML (`<section>`, `<h2>`/`<h3>`)
- Mobile-first responsive via Tailwind breakpoints

### Docs System
- `docs/index.json` defines section structure
- Markdown files in `docs/` are loaded at build time
- Supports local and remote (GitHub) docs sources
- `USE_LOCAL_DOCS = true` for development

## CSS Rules

1. **No custom CSS in components** — use Tailwind utilities
2. **Global styles in `global.css` only**
3. **Never use `<style>` blocks** in .astro files
4. **Dark mode not needed** — site is dark by default

## Build & Quality

```bash
bun run dev       # Local dev server
bun run build     # Build static site to dist/
bun run preview   # Preview production build
```

### Before Committing
- `bun run build` must succeed with zero errors
- Verify pages render correctly

## Conventions

- Path alias: `@/*` → `src/*`
- Package manager: **bun**
- Direct commits to `main` (no PRs during POC phase)
- Commit messages: conventional commits (`feat:`, `fix:`, `docs:`)

## Content

SeaPortal is a content extraction & summarization API. Website content should focus on:
- URL extraction (any page → clean markdown)
- AI-powered summarization (configurable depth)
- Media transcription (YouTube, podcasts, direct media)
- Slide parsing (presentations → structured text)
- SSE streaming for real-time results
- Smart caching for token efficiency
- Designed for AI agent workflows
