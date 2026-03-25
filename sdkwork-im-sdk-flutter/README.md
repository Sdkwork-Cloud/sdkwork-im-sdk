# SDKWork IM Flutter Workspace

This directory is the Flutter workspace inside `sdkwork-im-sdk`.

## Contract Source

- app schema: `/im/v3/openapi.json`
- admin schema: excluded

## Permanent Layer Split

- `generated/server-openapi`: SDKWORK Generator output for server HTTP APIs only
- `adapter-wukongim`: handwritten realtime adapter that wraps `wukongimfluttersdk`
- `composed`: handwritten product SDK that depends on both generated HTTP APIs and the WuKongIM adapter

## Packages

- generated HTTP package: `backend_sdk`
- WuKongIM adapter package: `openchat_wukongim_adapter`
- composed SDK package: `openchat_sdk`

## Runtime Contract

- message send: HTTP API on `/im/v3/messages`
- message receive: `wukongimfluttersdk` long connection through `openchat_wukongim_adapter`
- message persistence: handled by the server, not by the generator
- transport version: `version: 2`
- message payloads: `conversation + message`
- event payloads: `conversation + event`
- RTC signaling: standardized as `event.type = RTC_SIGNAL`
- future game or chess data: standardized as domain events such as `GAME_EVENT`

## RTC Bootstrap

The runtime schema now exposes `POST /im/v3/rtc/rooms/:id/connection`, and the generated Flutter layer includes it in `generated/server-openapi/lib/src/api/rtc.dart`.

The handwritten composed SDK exposes:

- `sdk.rtc.connection.get(roomId, request: ...)`
- `sdk.rtc.connection.prepareCall(roomId, request: ..., applyRealtimeSession: true)`

`prepareCall(...)` uses the generated `backend_sdk` method, converts the DTOs into stable composed-layer models, and can write the returned WuKongIM realtime session back into the SDK auth session automatically.

Keep these fields distinct:

- `businessRoomId`: OpenChat business room id for app APIs and signaling
- `providerRoomId`: provider-native room id used by the RTC media SDK

## Handwritten Module Surface

`openchat_sdk` composes stable business modules above the generated HTTP layer:

- `session`
- `realtime`
- `messages`
- `events`
- `friends`
- `conversations`
- `groups`
- `contacts`
- `rtc`

`openchat_wukongim_adapter` owns connection lifecycle, inbound normalization, and connection-state dispatching only. Outbound send remains HTTP-first.

## Local Workspace Resolution

For local development the Flutter composed package uses `pubspec_overrides.yaml` so it resolves:

- `backend_sdk` to `../generated/server-openapi`
- `openchat_wukongim_adapter` to `../adapter-wukongim`

This keeps publish-time dependencies versioned while allowing local regeneration and handwritten development to coexist safely.

## Helper Highlights

- `session.register(...)` and `session.login(...)` both support bootstrapping realtime from server-provided WuKongIM config
- `messages.batchSend(...)` normalizes every outbound envelope in the batch before it reaches the generated HTTP client
- `messages.sendUserCard(...)` and `messages.sendCombined(...)` provide compatibility semantics on top of the same HTTP-first transport
- `realtime.connect(...)` persists the connected WuKongIM session back into the SDK session state
- `realtime.onRaw(...)` exposes normalized inbound message and event frames before app-level filtering
- room-scoped RTC signaling falls back to `roomId` when no explicit `groupId` or direct `toUserId` is provided
- `events.publishGameEvent(...)` standardizes `GAME_EVENT` transport for multiplayer, chess, and similar scenes
- `conversations.batchDelete(...)` and `contacts.batchDelete(...)` are implemented in the handwritten composed layer so Flutter can safely send DELETE request bodies without touching generated code
- `rtc.connection.prepareCall(...)` hydrates provider bootstrap, signaling metadata, and WuKongIM realtime bootstrap from one app-facing endpoint

## Commands

- generate server SDK: `bin/sdk-gen.sh` or `bin/sdk-gen.ps1`
- assemble compatibility metadata: `bin/sdk-assemble.sh` or `bin/sdk-assemble.ps1`
- validate adapter package: `dart analyze adapter-wukongim`
- validate composed package: `dart analyze composed`

## Rules

- only `generated/server-openapi` may be overwritten by generation
- realtime logic belongs in `adapter-wukongim` or `composed`
- app clients must never depend on admin control-plane APIs
- repeated generation must not change `adapter-wukongim` or `composed`
