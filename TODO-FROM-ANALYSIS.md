# SeaPortal: 10 Easy Wins from Browser Automation Analysis

Based on patterns from: crawlee, agent-browser, browser-use, steel-browser, playwright, puppeteer, scrapling, nanobrowser

---

## 1. ✅ Readability Extraction (defuddle)
**Source:** steel-browser  
**Effort:** 2h  
**What:** Add `/extract?format=readability` endpoint using `defuddle` library  
**Why:** Reader-mode extraction is a killer feature for content APIs  
```rust
// Add to extraction pipeline
enum OutputFormat { Html, Markdown, Readability, CleanedHtml }
```

---

## 2. ✅ Markdown Conversion (turndown)
**Source:** steel-browser  
**Effort:** 2h  
**What:** Add `/extract?format=markdown` using `turndown` or Rust equivalent  
**Why:** LLMs prefer markdown; every browser tool has this  
```rust
// Rust: pulldown-cmark for parsing, custom renderer for output
```

---

## 3. ✅ Content-Addressable Cache
**Source:** summarize  
**Effort:** 3h  
**What:** Hash content (not URL) for cache keys  
**Why:** Same content at different URLs shares cache; URL changes don't invalidate  
```rust
let cache_key = sha256(normalized_content);
```

---

## 4. ✅ SSE Streaming with Structured Events
**Source:** summarize  
**Effort:** 4h  
**What:** Stream extraction progress via SSE with typed events  
**Why:** Long extractions need progress feedback  
```
event: chunk
data: {"type":"text","content":"..."}

event: meta
data: {"title":"...","author":"..."}

event: done
data: {"tokens":1234,"cached":false}
```

---

## 5. ✅ Fallback Provider Chain
**Source:** summarize, browser-use  
**Effort:** 4h  
**What:** Chain providers with automatic fallback (Groq → whisper.cpp → AssemblyAI)  
**Why:** Resilience; different providers excel at different content  
```rust
trait Provider { async fn extract(&self) -> Result<Content>; }
let chain = [GroqProvider, WhisperProvider, AssemblyProvider];
```

---

## 6. ✅ AGENTS.md / CLAUDE.md for AI Coding
**Source:** browser-use (38KB AGENTS.md!)  
**Effort:** 1h  
**What:** Create comprehensive AGENTS.md for AI coding agents  
**Why:** Makes the codebase AI-agent friendly  
```markdown
# AGENTS.md
<guidelines>Development rules</guidelines>
<architecture>Module overview</architecture>
<api_docs>Embedded reference</api_docs>
```

---

## 7. ✅ MCP Tool Definitions
**Source:** playwright, scrapling  
**Effort:** 3h  
**What:** Define seaportal tools for Model Context Protocol  
**Why:** Direct integration with Claude, Cursor, etc.  
```json
{
  "name": "seaportal_extract",
  "description": "Extract content from URL",
  "inputSchema": { "url": "string", "format": "string" }
}
```

---

## 8. ✅ PDF Extraction Pipeline
**Source:** steel-browser (pdf2html), playwright  
**Effort:** 4h  
**What:** Detect PDF URLs, extract text/structure  
**Why:** PDF links are common; users expect them to work  
```rust
if content_type == "application/pdf" {
    return extract_pdf(bytes).await;
}
```

---

## 9. ✅ Batch Processing Endpoint
**Source:** crawlee  
**Effort:** 3h  
**What:** `/batch` endpoint for multiple URLs  
**Why:** Agents often need to process multiple pages  
```json
POST /batch
{ "urls": ["...", "..."], "format": "markdown" }
```

---

## 10. ✅ Health Check with Diagnostics
**Source:** steel-browser  
**Effort:** 1h  
**What:** `/health` endpoint with service status  
**Why:** Required for production deployments  
```json
GET /health
{
  "status": "healthy",
  "version": "0.1.0",
  "cache": { "size": 1234, "hit_rate": 0.85 },
  "providers": { "groq": "up", "whisper": "up" }
}
```

---

## Priority Order (by impact/effort)

| # | Feature | Effort | Impact |
|---|---------|--------|--------|
| 6 | AGENTS.md | 1h | High (AI-friendly) |
| 10 | Health Check | 1h | High (production) |
| 1 | Readability | 2h | High (core feature) |
| 2 | Markdown | 2h | High (LLM-friendly) |
| 3 | Content Cache | 3h | Medium (efficiency) |
| 7 | MCP Tools | 3h | High (integration) |
| 9 | Batch | 3h | Medium (convenience) |
| 4 | SSE Streaming | 4h | Medium (UX) |
| 5 | Fallback Chain | 4h | Medium (resilience) |
| 8 | PDF Extraction | 4h | Medium (completeness) |

---

## Implementation Notes

### Rust Libraries to Consider
- `defuddle` → Use `readability` crate or port
- `turndown` → `pulldown-cmark` + custom HTML→MD
- `pdf2html` → `pdf-extract` or `lopdf`
- SSE → `axum` with `Sse<impl Stream>`

### Website Updates Needed
- Add `/extract` endpoint docs
- Add `/batch` endpoint docs
- Add format options to API reference
- Add SSE streaming guide
