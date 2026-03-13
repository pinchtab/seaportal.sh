# Getting Started

Get up and running with SeaPortal in under a minute. Extract content, summarize pages, and transcribe media from any URL.

## Installation

Install the SeaPortal CLI globally:

```bash
npm install -g seaportal
```

Or use it directly with npx:

```bash
npx seaportal extract https://example.com
```

## Configuration

Set your API token for authenticated requests:

```bash
export SEAPORTAL_TOKEN=your-token-here
```

Create a `.seaportalrc` file in your project root for persistent config:

```json
{
  "token": "your-token-here",
  "baseUrl": "https://api.seaportal.sh",
  "cache": {
    "enabled": true,
    "ttl": 3600
  }
}
```

## Your First API Call

Extract clean content from any URL:

```bash
curl -s https://api.seaportal.sh/extract \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -d '{"url": "https://example.com"}' | jq
```

Response:

```json
{
  "url": "https://example.com",
  "title": "Example Domain",
  "content": "# Example Domain\n\nThis domain is for use in illustrative examples...",
  "tokens": 42,
  "cached": false,
  "extractedAt": "2026-03-13T06:00:00Z"
}
```

## Using the CLI

The CLI wraps the API with convenient commands:

```bash
# Extract content
seaportal extract https://example.com

# Summarize a page
seaportal summarize https://example.com --depth detailed

# Transcribe audio/video
seaportal transcribe https://youtube.com/watch?v=example

# Stream results in real-time
seaportal extract https://example.com --stream
```

## Using with AI Agents

SeaPortal is designed for AI agent workflows. Use structured JSON output for tool calls:

```bash
curl -s https://api.seaportal.sh/extract \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -d '{"url": "https://example.com", "format": "json"}' 
```

The response includes token counts, metadata, and structured content blocks — ready to feed directly into your agent's context window.

## Next Steps

- [API Endpoints](/docs/api-endpoints) — Full reference for all endpoints
- [Streaming Guide](/docs/streaming) — Real-time results with SSE
- [Caching Guide](/docs/caching) — Configure caching strategies
- [Transcription Guide](/docs/transcription) — Audio/video transcription providers
