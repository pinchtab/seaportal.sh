# API Endpoints

SeaPortal exposes a small HTTP API. All endpoints accept JSON bodies and return JSON responses. Every endpoint supports streaming via `?stream=true`.

## Authentication

All requests require a Bearer token:

```bash
curl -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  https://api.seaportal.sh/extract
```

## Health Check

**GET** `/health`

Returns service status. No authentication required.

```bash
curl https://api.seaportal.sh/health
```

```json
{
  "status": "ok",
  "version": "1.0.0",
  "uptime": 86400
}
```

## Extract

**POST** `/extract`

Extract clean, readable content from a URL. Strips navigation, ads, scripts, and clutter. Returns structured markdown.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | yes | URL to extract content from |
| `format` | string | no | Output format: `markdown` (default), `json`, `text` |
| `stream` | boolean | no | Enable SSE streaming (default: `false`) |
| `includeMetadata` | boolean | no | Include page metadata (default: `true`) |
| `maxTokens` | number | no | Maximum tokens in response |

### Example

```bash
curl -s https://api.seaportal.sh/extract \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/blog/post",
    "format": "markdown"
  }'
```

### Response

```json
{
  "url": "https://example.com/blog/post",
  "title": "Blog Post Title",
  "content": "# Blog Post Title\n\nArticle content in clean markdown...",
  "tokens": 1523,
  "cached": false,
  "metadata": {
    "author": "Author Name",
    "publishedAt": "2026-01-15",
    "description": "Post meta description"
  },
  "extractedAt": "2026-03-13T06:00:00Z"
}
```

## Summarize

**POST** `/summarize`

Summarize content from a URL using AI. Configurable depth controls the detail level.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | yes | URL to summarize |
| `depth` | string | no | `brief`, `normal` (default), `detailed` |
| `maxTokens` | number | no | Maximum tokens in summary |
| `stream` | boolean | no | Enable SSE streaming |
| `format` | string | no | `markdown` (default), `json`, `bullets` |

### Example

```bash
curl -s https://api.seaportal.sh/summarize \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/long-article",
    "depth": "brief"
  }'
```

### Response

```json
{
  "url": "https://example.com/long-article",
  "summary": "The article discusses three key points: ...",
  "tokens": {
    "input": 3200,
    "output": 450
  },
  "depth": "brief",
  "cached": false,
  "summarizedAt": "2026-03-13T06:00:00Z"
}
```

## Transcribe

**POST** `/transcribe`

Transcribe audio or video content from a URL. Supports YouTube, podcast feeds, and direct media links.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | yes | Media URL to transcribe |
| `provider` | string | no | Transcription provider: `auto` (default), `whisper`, `deepgram`, `assemblyai` |
| `language` | string | no | Language hint (ISO 639-1 code) |
| `timestamps` | boolean | no | Include word-level timestamps (default: `false`) |
| `stream` | boolean | no | Enable SSE streaming |

### Example

```bash
curl -s https://api.seaportal.sh/transcribe \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://youtube.com/watch?v=example",
    "provider": "whisper"
  }'
```

### Response

```json
{
  "url": "https://youtube.com/watch?v=example",
  "transcript": "Welcome to this episode...",
  "duration": 1842,
  "tokens": 2100,
  "provider": "whisper",
  "language": "en",
  "cached": false,
  "transcribedAt": "2026-03-13T06:00:00Z"
}
```

## Slides

**POST** `/slides`

Parse slide decks and presentations from URLs. Returns structured content with slide boundaries.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | yes | URL to a slide deck (Google Slides, PDF, etc.) |
| `format` | string | no | `markdown` (default), `json` |
| `includeNotes` | boolean | no | Include speaker notes (default: `true`) |

### Example

```bash
curl -s https://api.seaportal.sh/slides \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://docs.google.com/presentation/d/example"
  }'
```

## Batch Processing

**POST** `/batch`

Process multiple URLs in a single request. Each URL uses the specified operation.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | string[] | yes | Array of URLs to process |
| `operation` | string | no | `extract` (default), `summarize`, `transcribe` |
| `concurrency` | number | no | Parallel requests (default: 3, max: 10) |
| `stream` | boolean | no | Stream results as they complete |

### Example

```bash
curl -s https://api.seaportal.sh/batch \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://example.com/page-1",
      "https://example.com/page-2",
      "https://example.com/page-3"
    ],
    "operation": "extract",
    "concurrency": 3
  }'
```

## Cache Management

### Get Cached Result

**GET** `/cache/:key`

Retrieve a previously cached extraction or summary result.

### Invalidate Cache

**DELETE** `/cache/:key`

Remove a specific cached result.

### Cache Stats

**GET** `/cache/stats`

Returns cache hit/miss statistics and storage usage.

```json
{
  "entries": 1542,
  "hits": 28403,
  "misses": 3201,
  "hitRate": 0.899,
  "storageMb": 12.4
}
```

## Error Responses

All errors follow a consistent format:

```json
{
  "error": {
    "code": "EXTRACTION_FAILED",
    "message": "Unable to extract content from the provided URL",
    "status": 422
  }
}
```

Common error codes:

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing token |
| `RATE_LIMITED` | 429 | Too many requests |
| `EXTRACTION_FAILED` | 422 | Content extraction failed |
| `URL_NOT_REACHABLE` | 502 | Target URL unreachable |
| `TIMEOUT` | 504 | Extraction timed out |
| `DOMAIN_NOT_ALLOWED` | 403 | URL domain not in allowlist |
