# sdkwork-im-sdk-typescript/generated/server-openapi

Generator-owned TypeScript transport workspace for the Craw Chat app API.

This directory is an internal-only generated build workspace. It exists so the
public root package `@sdkwork/im-sdk` can assemble generated transport
output into the single consumer-facing TypeScript SDK.

The internal generated package identity is
`@sdkwork-internal/im-sdk-generated`.

## Consumer Direction

Application code must start from `@sdkwork/im-sdk` and `ImSdkClient`.

This workspace is internal. It does not define a second public client contract.
Its low-level transport entrypoints are `ImTransportClient` and
`createTransportClient` for generator assembly and internal verification only.

## Workspace Boundary

- this directory is generator-owned
- it is not a second TypeScript consumer package
- it is not a publish target
- Internal generator subpaths are not part of the supported public API.
- the workspace normalization wrapper strips generator-only auth scaffolding and
  source-tree build residue before verification and packaging

## Transport Shape

Generated transport remains bearer-only:

```typescript
const client = new ImTransportClient({
  baseUrl: 'http://127.0.0.1:18090',
});

client.setAuthToken('your-bearer-token');
// Sends: Authorization: Bearer <token>
```

Route groups currently exposed from the generated transport:

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

- generator-owned files are tracked in `.sdkwork/sdkwork-generator-manifest.json`
- each run also writes `.sdkwork/sdkwork-generator-changes.json`
- apply mode also writes `.sdkwork/sdkwork-generator-report.json`
- hand-written wrappers, adapters, and orchestration belong in `custom/`
- files scaffolded under `custom/` are created once and preserved across regenerations
- if a generated-owned file was modified locally, its previous content is copied
  to `.sdkwork/manual-backups/` before overwrite or removal
