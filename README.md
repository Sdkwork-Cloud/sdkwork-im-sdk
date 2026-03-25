# SDKWork IM SDK Workspace

`sdkwork-im-sdk` is the app-facing SDK workspace for OpenChat IM.

It is not a single package. It is the workspace that owns:

- runtime-driven OpenAPI inputs
- JSON Schema registry files
- generation wrappers
- multi-language generated HTTP SDKs
- handwritten WuKongIM adapter layers
- handwritten composed realtime SDK layers

## Runtime Contract

The running server exports two independent OpenAPI surfaces:

- app docs: `/im/v3/docs`
- app schema: `/im/v3/openapi.json`
- admin docs: `/admin/im/v3/docs`
- admin schema: `/admin/im/v3/openapi.json`

This workspace generates from the app schema only.

`sdkwork-im-sdk` does not include admin APIs.

## Ownership Rules

- `generated/server-openapi` is generator-owned
- `adapter-wukongim` is handwritten and isolated
- `composed` is handwritten and combines generated HTTP APIs with realtime adapters

Repeated generation must only touch `generated/server-openapi`.
The root generation wrappers capture a manual-owned boundary snapshot before generation and compare it after generation so `adapter-wukongim` and `composed` stay immutable across repeated runs.

## Transport Standard

The app-facing IM transport is standardized as:

- message send: `version + conversation + message`
- event send: `version + conversation + event`
- realtime receive: WuKongIM adapter normalizes inbound frames back into the same envelope
- RTC signaling: `event.type = RTC_SIGNAL`
- multiplayer or chess events: domain events such as `GAME_EVENT`

This keeps HTTP send, server persistence, realtime receive, and future AI-era event expansion on one coherent payload model.

## Workspace Layout

```text
sdkwork-im-sdk/
  openapi/
  schemas/
  bin/
  docs/
  sdkwork-im-sdk-typescript/
  sdkwork-im-sdk-flutter/
  sdkwork-im-sdk-python/
  sdkwork-im-sdk-go/
  sdkwork-im-sdk-java/
  sdkwork-im-sdk-kotlin/
  sdkwork-im-sdk-swift/
  sdkwork-im-sdk-csharp/
  sdkwork-im-sdk-android/
  sdkwork-im-sdk-ios/
```

## Script Standard

Workspace-level generation:

- `bin/generate-sdk.sh`
- `bin/generate-sdk.ps1`

Every language workspace exposes:

- `bin/sdk-gen.sh`
- `bin/sdk-gen.ps1`
- `bin/sdk-assemble.sh`
- `bin/sdk-assemble.ps1`

The root wrappers can auto-start `npm run start:openapi` when the runtime schema is not already reachable.

## Language Targets

- TypeScript: layered HTTP + WuKongIM + composed SDK
- Flutter: layered HTTP + WuKongIM + composed SDK
- Python / Go / Java / Kotlin / Swift / C#: generated HTTP SDKs
- Android / iOS: compatibility wrappers that forward to Kotlin / Swift

## Stable Facades

The handwritten TypeScript and Flutter composed SDKs expose stable modules above the generated HTTP clients:

- `session`
- `realtime`
- `messages`
- `events`
- `friends`
- `conversations`
- `groups`
- `contacts`
- `rtc`

For RTC bootstrap parity, the handwritten TypeScript and Flutter composed SDKs both expose:

- `rtc.connection.get(roomId, request?)`
- `rtc.connection.prepareCall(roomId, request?, applyRealtimeSession?)`
