# SDKWork IM TypeScript Workspace

This directory is the TypeScript workspace inside `sdkwork-im-sdk`.

## Contract Source

- app schema: `/im/v3/openapi.json`
- admin schema: excluded

## Permanent Layer Split

- `generated/server-openapi`: SDKWORK Generator output for server HTTP APIs only
- `adapter-wukongim`: handwritten realtime adapter that wraps `wukongimjssdk`
- `composed`: handwritten product SDK that depends on both generated HTTP APIs and the WuKongIM adapter

## Packages

- generated HTTP package: `@sdkwork/im-backend-sdk`
- WuKongIM adapter package: `@openchat/sdkwork-im-wukongim-adapter`
- composed SDK package: `@openchat/sdkwork-im-sdk`

The handwritten packages publish compiled `dist` outputs. Source remains in `src`, but package entrypoints resolve to `dist/index.js` and `dist/index.d.ts`.

## Runtime Contract

- message send: HTTP API on `/im/v3/messages`
- message receive: `wukongimjssdk` long connection through `adapter-wukongim`
- message persistence: handled by the server, not by the generator
- transport version: `version: 2`
- message payloads: `conversation + message`
- event payloads: `conversation + event`
- custom RTC signaling: `rtc.signaling.sendCustom({ eventName, signalType, ... })`

## Composed RTC Helpers

The handwritten `@openchat/sdkwork-im-sdk` package exposes the same RTC connection bootstrap helpers as Flutter:

- `sdk.rtc.connection.get(roomId, request?)`
- `sdk.rtc.connection.prepareCall(roomId, request?, applyRealtimeSession?)`

`prepareCall(...)` can hydrate the WuKongIM realtime session returned by `/im/v3/rtc/rooms/:id/connection` back into the composed SDK session, while still keeping the RTC media-provider bootstrap independent from generated code.

## RTC Bootstrap

The runtime schema now exposes `POST /im/v3/rtc/rooms/:id/connection`, and the generated HTTP layer includes it in `generated/server-openapi/src/api/rtc.ts`.

The handwritten client exposes:

- `client.rtc.getConnectionInfo(roomId, options?)`
- `client.rtc.prepareCall(roomId, options?)`
- `client.rtc.startCall(roomId, options?)`

`prepareCall(...)` requests aggregated RTC bootstrap data, initializes the selected provider, and caches `providerRoomId` plus the provider token so `startCall(...)` can join the correct media room automatically.

Keep these fields distinct:

- `businessRoomId`: OpenChat business room id for app APIs and signaling
- `providerRoomId`: provider-native room id used by the RTC media SDK

## Helper Highlights

- `messages.send(...)` normalizes raw envelopes to `version: 2` and uppercases transport `type` fields before HTTP send
- `messages.batchSend(...)` applies the same normalization to every outbound envelope in a batch
- legacy `OpenChatClient.im.messages.sendXxx(...)` helpers also send through HTTP now; WuKongIM remains receive-only in that facade
- compatibility helpers such as `sendUserCard(...)` and `sendCombined(...)` are normalized into `CUSTOM` message envelopes
- `session.register(...)` aligns with `session.login(...)` and can bootstrap realtime from server-provided WuKongIM config
- `realtime.connect(...)` persists the connected WuKongIM session back into `session.getState()`
- `realtime.onRaw(...)` exposes normalized inbound message and event frames before app-level filtering
- `events.publishGameEvent(...)` standardizes `GAME_EVENT` payloads for multiplayer, chess, and similar future scenes
- `rtc.prepareCall(...)` hydrates provider bootstrap, signaling metadata, and WuKongIM realtime bootstrap from one app-facing endpoint

## Commands

- generate server SDK: `bin/sdk-gen.sh` or `bin/sdk-gen.ps1`
- assemble compatibility metadata: `bin/sdk-assemble.sh` or `bin/sdk-assemble.ps1`
- build adapter package: `cd adapter-wukongim && npm run build`
- build composed package: `cd composed && npm run build`

## Rules

- only `generated/server-openapi` may be overwritten by generation
- realtime logic belongs in `adapter-wukongim` or `composed`
- app clients must never depend on admin control-plane APIs
- repeated generation must not modify `adapter-wukongim` or `composed`
