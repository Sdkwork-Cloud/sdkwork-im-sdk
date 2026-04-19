# github.com/sdkwork/im-sdk-generated

Generator-owned Go transport SDK for the Craw Chat app API.

## Boundary

This package is the low-level generated transport boundary for the Craw Chat app API.
Prefer the app-facing module `github.com/sdkwork/im-sdk` and `ImSdkClient` for most
application code. Use this package directly only when you explicitly need raw
generated transport modules.

The generated package identity is `github.com/sdkwork/im-sdk-generated`.

## Authentication

Craw Chat app routes use bearer authentication only.

```go
import (
    generated "github.com/sdkwork/im-sdk-generated"
    sdkhttp "github.com/sdkwork/im-sdk-generated/http"
)

cfg := sdkhttp.NewDefaultConfig("http://127.0.0.1:18090")
client := generated.NewImTransportClientWithConfig(cfg)
client.SetAuthToken("your-bearer-token")
// Sends: Authorization: Bearer <token>
```

## API Modules

- `client.Auth`
- `client.Portal`
- `client.Session`
- `client.Presence`
- `client.Realtime`
- `client.Device`
- `client.Inbox`
- `client.Conversation`
- `client.Message`
- `client.Media`
- `client.Stream`
- `client.Rtc`

## Regeneration Contract

- Generator-owned files are tracked in `.sdkwork/sdkwork-generator-manifest.json`.
- Each run also writes `.sdkwork/sdkwork-generator-changes.json`.
- Apply mode also writes `.sdkwork/sdkwork-generator-report.json`.
- Put hand-written wrappers, adapters, and orchestration in `custom/`.
- Files scaffolded under `custom/` are created once and preserved across regenerations.
- If a generated-owned file was modified locally, its previous content is copied to `.sdkwork/manual-backups/` before overwrite or removal.
