# Caching

SeaPortal includes built-in content caching to avoid redundant extractions and reduce latency. When the same URL is requested again within the TTL window, the cached result is returned instantly.

## How It Works

Every extraction, summarization, and transcription result is cached by default. Cache keys are derived from the URL and request parameters (depth, format, provider).

```
Request → Cache lookup → Hit? Return cached → Miss? Extract → Cache → Return
```

Cached responses include a `cached: true` flag so you know when you're getting a cached result:

```json
{
  "url": "https://example.com",
  "content": "...",
  "tokens": 1523,
  "cached": true,
  "cachedAt": "2026-03-13T05:00:00Z",
  "expiresAt": "2026-03-13T06:00:00Z"
}
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SEAPORTAL_CACHE_ENABLED` | `true` | Enable/disable caching globally |
| `SEAPORTAL_CACHE_TTL` | `3600` | Default TTL in seconds (1 hour) |
| `SEAPORTAL_CACHE_MAX_SIZE` | `500` | Maximum number of cached entries |
| `SEAPORTAL_CACHE_DIR` | `.seaportal/cache` | Local cache directory |

### Per-Request Cache Control

Override caching behavior on individual requests:

```bash
# Skip cache entirely (always fetch fresh)
curl -s https://api.seaportal.sh/extract \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -d '{"url": "https://example.com", "cache": false}'

# Set a custom TTL (in seconds)
curl -s https://api.seaportal.sh/extract \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -d '{"url": "https://example.com", "ttl": 86400}'

# Force refresh (bypass cache, but update it)
curl -s https://api.seaportal.sh/extract \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -d '{"url": "https://example.com", "refresh": true}'
```

## Cache Strategies

### Short-lived content (news, feeds)

```json
{
  "url": "https://news.example.com/latest",
  "ttl": 300
}
```

5-minute TTL for frequently updated content.

### Static content (documentation, wikis)

```json
{
  "url": "https://docs.example.com/guide",
  "ttl": 86400
}
```

24-hour TTL for content that rarely changes.

### Never cache (real-time data)

```json
{
  "url": "https://api.example.com/status",
  "cache": false
}
```

Disable caching for endpoints with real-time data.

## Cache Management

### View Cache Stats

```bash
curl -s https://api.seaportal.sh/cache/stats \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN"
```

```json
{
  "entries": 1542,
  "hits": 28403,
  "misses": 3201,
  "hitRate": 0.899,
  "storageMb": 12.4,
  "oldestEntry": "2026-03-10T00:00:00Z"
}
```

### Invalidate a Cached Entry

```bash
# Delete by cache key (URL hash)
curl -X DELETE https://api.seaportal.sh/cache/abc123 \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN"
```

### Clear All Cache

```bash
curl -X DELETE https://api.seaportal.sh/cache \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN"
```

## Cost Impact

Caching has a direct impact on cost when using AI-powered summarization:

| Scenario | Requests | API Calls | Tokens Used |
|----------|----------|-----------|-------------|
| No caching | 100 | 100 | ~150,000 |
| Cache (80% hit rate) | 100 | 20 | ~30,000 |
| Cache (95% hit rate) | 100 | 5 | ~7,500 |

For AI agent workloads where the same URLs are accessed repeatedly, caching can reduce costs by 80-95%.
