# Advanced Guides

These guides cover advanced usage patterns and optimization techniques.

## Streaming Results

SeaPortal supports streaming results via Server-Sent Events (SSE):

```bash
curl -N https://seaportal.sh/extract?url=https://example.com&stream=true
```

## Batch Processing

Process multiple URLs in a single request:

```bash
curl -X POST https://seaportal.sh/batch \
  -H 'Content-Type: application/json' \
  -d '{
    "urls": [
      "https://example.com",
      "https://example.org"
    ]
  }'
```

## Caching

SeaPortal automatically caches results. Control caching behavior:

```bash
# Skip cache
curl https://seaportal.sh/extract?url=https://example.com&cache=false

# Set custom TTL (seconds)
curl https://seaportal.sh/extract?url=https://example.com&ttl=3600
```

## AI Agent Integration

SeaPortal is optimized for AI agents. Use structured output for tool calls:

```bash
curl https://seaportal.sh/extract?url=https://example.com&format=json
```

The JSON output includes metadata and structured content blocks for easy integration with your agent.
