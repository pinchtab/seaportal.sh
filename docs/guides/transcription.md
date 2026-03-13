# Transcription

SeaPortal can transcribe audio and video content from URLs. It supports multiple transcription providers and automatically detects the best one based on the media source.

## Supported Sources

- **YouTube** — Videos, shorts, live streams
- **Podcasts** — RSS feed URLs or direct episode links
- **Direct media** — MP3, MP4, WAV, WebM, and other common formats
- **Embedded media** — Audio/video embedded in web pages

## Basic Usage

```bash
curl -s https://seaportal.sh/extract \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://youtube.com/watch?v=example"}'
```

Response:

```json
{
  "url": "https://youtube.com/watch?v=example",
  "transcript": "Welcome to this episode. Today we'll be discussing...",
  "duration": 1842,
  "tokens": 2100,
  "provider": "whisper",
  "language": "en",
  "cached": false,
  "transcribedAt": "2026-03-13T06:00:00Z"
}
```

## Transcription Providers

SeaPortal supports multiple transcription backends. Set the provider per request or configure a default.

### Auto (default)

When `provider` is `auto` or omitted, SeaPortal picks the best provider:

- **YouTube** → Uses YouTube's built-in captions if available, falls back to Whisper
- **Short audio (<10 min)** → Whisper for highest accuracy
- **Long audio (>10 min)** → Deepgram for speed and cost efficiency
- **Real-time** → AssemblyAI for streaming transcription

### Whisper

OpenAI's Whisper model. Best accuracy for most content.

```json
{
  "url": "https://example.com/podcast.mp3",
  "provider": "whisper"
}
```

**Configuration:**

| Variable | Default | Description |
|----------|---------|-------------|
| `SEAPORTAL_WHISPER_MODEL` | `large-v3` | Whisper model size |
| `SEAPORTAL_OPENAI_API_KEY` | — | Required for cloud Whisper |

### Deepgram

Fast, cost-effective transcription. Best for long-form content.

```json
{
  "url": "https://example.com/long-podcast.mp3",
  "provider": "deepgram"
}
```

**Configuration:**

| Variable | Default | Description |
|----------|---------|-------------|
| `SEAPORTAL_DEEPGRAM_API_KEY` | — | Required |
| `SEAPORTAL_DEEPGRAM_MODEL` | `nova-2` | Deepgram model |

### AssemblyAI

Real-time streaming transcription with speaker diarization.

```json
{
  "url": "https://example.com/meeting.mp4",
  "provider": "assemblyai",
  "timestamps": true
}
```

**Configuration:**

| Variable | Default | Description |
|----------|---------|-------------|
| `SEAPORTAL_ASSEMBLYAI_API_KEY` | — | Required |

## Timestamps

Enable word-level timestamps for precise alignment:

```bash
curl -s https://seaportal.sh/transcribe \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -d '{
    "url": "https://example.com/video.mp4",
    "timestamps": true
  }'
```

```json
{
  "transcript": "Welcome to this episode.",
  "segments": [
    { "text": "Welcome", "start": 0.0, "end": 0.5 },
    { "text": "to", "start": 0.5, "end": 0.7 },
    { "text": "this", "start": 0.7, "end": 0.9 },
    { "text": "episode.", "start": 0.9, "end": 1.4 }
  ]
}
```

## Language Detection

SeaPortal auto-detects the content language. You can also provide a hint:

```json
{
  "url": "https://example.com/video.mp4",
  "language": "de"
}
```

Supported languages depend on the provider. Whisper supports 99+ languages, Deepgram and AssemblyAI support 30+.

## Streaming Transcription

Combine transcription with SSE for real-time results:

```bash
curl -N https://seaportal.sh/transcribe \
  -H "Authorization: Bearer $SEAPORTAL_TOKEN" \
  -d '{
    "url": "https://example.com/video.mp4",
    "stream": true
  }'
```

Transcript chunks arrive as they're processed — useful for long media where you want partial results immediately.

## Cost Considerations

Transcription costs vary by provider and duration:

| Provider | Cost (per minute) | Best For |
|----------|-------------------|----------|
| Whisper | ~$0.006 | Accuracy, multilingual |
| Deepgram | ~$0.004 | Speed, long content |
| AssemblyAI | ~$0.006 | Real-time, diarization |

Caching is especially valuable for transcription — re-transcribing the same media is expensive and unnecessary. SeaPortal caches transcriptions with a default TTL of 24 hours.
