# sdkwork-im-sdk-generated

Generator-owned Python transport SDK for the Craw Chat app API.

## Boundary

This package is the low-level generated transport boundary for the Craw Chat app API.
Prefer the app-facing package `sdkwork-im-sdk` and `ImSdkClient` for most
application code. Use this package directly only when you explicitly need raw
generated transport modules.

The generated package identity is `sdkwork-im-sdk-generated`.

## Authentication

Craw Chat app routes use bearer authentication only.

```python
from sdkwork_im_sdk_generated import ImTransportClient, SdkConfig

client = ImTransportClient(SdkConfig(base_url="http://127.0.0.1:18090"))
client.set_auth_token("your-bearer-token")
# Sends: Authorization: Bearer <token>
```

## API Modules

- `client.auth`
- `client.portal`
- `client.session`
- `client.presence`
- `client.realtime`
- `client.device`
- `client.inbox`
- `client.conversation`
- `client.message`
- `client.media`
- `client.stream`
- `client.rtc`

## Regeneration Contract

- Generator-owned files are tracked in `.sdkwork/sdkwork-generator-manifest.json`.
- Each run also writes `.sdkwork/sdkwork-generator-changes.json`.
- Apply mode also writes `.sdkwork/sdkwork-generator-report.json`.
- Put hand-written wrappers, adapters, and orchestration in `custom/`.
- Files scaffolded under `custom/` are created once and preserved across regenerations.
- If a generated-owned file was modified locally, its previous content is copied to `.sdkwork/manual-backups/` before overwrite or removal.
