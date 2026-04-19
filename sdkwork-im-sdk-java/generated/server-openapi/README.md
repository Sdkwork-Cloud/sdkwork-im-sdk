# com.sdkwork:im-sdk-generated

Generator-owned Java transport SDK for the Craw Chat app API.

## Boundary

This package is the low-level generated transport boundary for the Craw Chat app API.
Prefer the app-facing artifact `com.sdkwork:im-sdk` and `ImSdkClient` for most
application code. Use this package directly only when you explicitly need raw
generated transport modules.

The generated package identity is `com.sdkwork:im-sdk-generated`.

## Authentication

Craw Chat app routes use bearer authentication only.

```java
import com.sdkwork.common.core.Types;
import com.sdkwork.im.generated.ImTransportClient;

Types.SdkConfig config = new Types.SdkConfig("http://127.0.0.1:18090");
ImTransportClient client = new ImTransportClient(config);
client.setAuthToken("your-bearer-token");
// Sends: Authorization: Bearer <token>
```

## API Modules

- `client.getAuth()`
- `client.getPortal()`
- `client.getSession()`
- `client.getPresence()`
- `client.getRealtime()`
- `client.getDevice()`
- `client.getInbox()`
- `client.getConversation()`
- `client.getMessage()`
- `client.getMedia()`
- `client.getStream()`
- `client.getRtc()`

## Regeneration Contract

- Generator-owned files are tracked in `.sdkwork/sdkwork-generator-manifest.json`.
- Each run also writes `.sdkwork/sdkwork-generator-changes.json`.
- Apply mode also writes `.sdkwork/sdkwork-generator-report.json`.
- Put hand-written wrappers, adapters, and orchestration in `custom/`.
- Files scaffolded under `custom/` are created once and preserved across regenerations.
- If a generated-owned file was modified locally, its previous content is copied to `.sdkwork/manual-backups/` before overwrite or removal.
