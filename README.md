# SeaPortal Website

The marketing and documentation website for SeaPortal — content extraction and summarization API.

## Features

- Extract content from URLs
- Summarize pages with configurable depth
- Transcribe audio and video
- Parse slides and presentations
- Stream results in real-time
- Built-in caching with smart TTL
- Batch processing for multiple URLs
- Rate limiting and backoff strategies
- AI agent optimized

## Technology Stack

- **Framework:** Astro 5
- **Styling:** Tailwind CSS 4
- **UI Components:** React 19 (minimal use)
- **Language:** TypeScript
- **Package Manager:** Bun

## Getting Started

### Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Checking

```bash
bun run type-check
```

### Building for Production

```bash
bun run build
bun run preview
```

## Project Structure

```
seaportal.sh/
├── src/
│   ├── components/
│   │   ├── ui/              # Base UI components (Button, Card, Badge, etc.)
│   │   ├── layout/          # Layout wrappers (BaseLayout, Footer)
│   │   ├── features/        # Feature sections (Hero, Features, Architecture, etc.)
│   │   └── docs/            # Documentation renderers
│   ├── pages/               # Page routes
│   │   ├── index.astro      # Home page
│   │   └── docs/            # Documentation pages
│   ├── lib/
│   │   ├── docs/            # Documentation loading and processing
│   │   └── utils.ts         # Utility functions
│   ├── styles/              # Global styles
│   └── env.d.ts             # TypeScript definitions
├── public/                  # Static assets
│   ├── manifest.json
│   ├── robots.txt
│   └── (images, icons, etc.)
├── .github/
│   └── workflows/           # CI/CD workflows
├── astro.config.mjs         # Astro configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Documentation

The site includes a full documentation system that loads from the main SeaPortal repository:

- Documentation is fetched from `https://github.com/seaportal/seaportal` (main branch, `/docs` folder)
- Supports Markdown, including API references (JSON)
- Automatic sidebar generation with accordion sections
- Table of contents on the right
- Terminal blocks for code examples
- ASCII diagrams and Mermaid support

To work with local docs during development, set `USE_LOCAL_DOCS = true` in `src/lib/docs/config.ts`.

## Design System

The site uses a **deep ocean + cyan glow** aesthetic optimized for AI agents:

- **Primary Colors:**
  - Background: `#000000`
  - Surface: `#081c2b`
  - Accent: `#22d3ee` (cyan)

- **Typography:**
  - UI: Inter
  - Code: JetBrains Mono

- **Components:**
  - Agent Card: `rounded-xl, bg-[#081c2b], border-[#0f3248]`
  - Website Node: `rounded-lg, bg-[#0a2333], border-[#0f3248]`
  - Data Panel: `font-mono, text-sm, bg-[#020b14], border-[#0f3248]`

See `DESIGN_SYSTEM.md` for complete design specifications.

## Deployment

The site deploys to GitHub Pages via the `deploy.yml` workflow:

1. On push to `main`, CI runs type checks and builds the site
2. Built artifacts are uploaded to Pages
3. Site is live at `https://seaportal.sh`

## License

MIT License — See LICENSE in the seaportal/seaportal repository

## Contributing

This is the public website for SeaPortal. For the main project, see [seaportal/seaportal](https://github.com/seaportal/seaportal).

Built by [Luigi Agosti](https://github.com/luigi-agosti) with help from AI agents.
