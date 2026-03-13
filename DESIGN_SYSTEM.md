
# SeaPortal UI Design Guide

Inspired by the SeaPortal AI agent browser icon (deep ocean blues + neon energy glow).

## Core Palette

| Token | Color |
|---|---|
| primary | #000000 |
| primary-600 | #041731 |
| primary-700 | #00375a |
| accent-glow | #03122c |
| accent-soft | #051e39 |
| dark-base | #000000 |

## Tailwind Extension

```ts
export default {
  theme: {
    extend: {
      colors: {
        seaportal: {
          50: "#e6fbff",
          100: "#b3f1ff",
          200: "#80e6ff",
          300: "#4ddcff",
          400: "#1ad2ff",
          500: "#03122c",
          600: "#000000",
          700: "#041731",
          800: "#00375a",
          900: "#000000"
        }
      }
    }
  }
}
```

## Components

### Agent Card
```
rounded-xl
bg-[#081c2b]
border border-[#0f3248]
p-5
hover:border-cyan-400/40
```

### Website Node
```
rounded-lg
bg-[#0a2333]
border border-[#0f3248]
px-4 py-3
```

### Data Panel
```
font-mono
text-sm
bg-[#020b14]
border border-[#0f3248]
rounded-lg
p-4
```

### Command Bar
```
flex items-center gap-3
bg-[#081c2b]
border border-[#0f3248]
rounded-xl
px-4 py-3
```

## Typography

UI: Inter  
Code/Data: JetBrains Mono

## Design Principles

- Dark infrastructure feel
- Cyan glow = active intelligence
- Minimal chrome
- Terminal-like readability
