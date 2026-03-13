# Streaming

SeaPortal supports Server-Sent Events (SSE) for real-time results. Instead of waiting for the entire extraction or summarization to complete, stream partial results as they're processed.

## Enabling Streaming

Add `stream: true` to any request:

```bash
curl -N https://api.seaportal.sh/extract \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/long-article",
    "stream": true
  }'
```

The `-N` flag disables curl's output buffering, so you see events as they arrive.

## Event Format

SSE events follow the standard format:

```
event: chunk
data: {"type": "content", "text": "# Article Title\n\n"}

event: chunk
data: {"type": "content", "text": "First paragraph of the article..."}

event: metadata
data: {"title": "Article Title", "tokens": 1523, "cached": false}

event: done
data: {"status": "complete", "totalChunks": 12}
```

### Event Types

| Event | Description |
|-------|-------------|
| `chunk` | Partial content as it's extracted |
| `metadata` | Page metadata (title, author, etc.) |
| `progress` | Processing progress updates |
| `error` | Error during extraction |
| `done` | Stream complete |

## JavaScript Client

```javascript
const response = await fetch('https://api.seaportal.sh/extract', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/article',
    stream: true,
  }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();
let content = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const text = decoder.decode(value);
  const lines = text.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      if (data.type === 'content') {
        content += data.text;
        process.stdout.write(data.text);
      }
    }
  }
}
```

## Python Client

```python
import requests
import json

response = requests.post(
    'https://api.seaportal.sh/extract',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    },
    json={
        'url': 'https://example.com/article',
        'stream': True,
    },
    stream=True,
)

for line in response.iter_lines():
    if line:
        decoded = line.decode('utf-8')
        if decoded.startswith('data: '):
            data = json.loads(decoded[6:])
            if data.get('type') == 'content':
                print(data['text'], end='')
```

## Streaming with Batch Requests

Batch requests can also stream. Results arrive as each URL completes:

```bash
curl -N https://api.seaportal.sh/batch \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://example.com/1", "https://example.com/2"],
    "operation": "extract",
    "stream": true
  }'
```

Each result arrives as a separate SSE event with the URL identifier:

```
event: result
data: {"url": "https://example.com/1", "content": "...", "tokens": 850}

event: result
data: {"url": "https://example.com/2", "content": "...", "tokens": 1200}

event: done
data: {"status": "complete", "processed": 2, "failed": 0}
```

## Connection Handling

- **Timeout**: Streams stay open for up to 5 minutes per request
- **Reconnection**: Clients should handle reconnection for long-running extractions
- **Backpressure**: The server respects client read speed; slow readers won't lose events
