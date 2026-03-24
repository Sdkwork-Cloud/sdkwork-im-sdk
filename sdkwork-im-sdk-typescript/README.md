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

- generated HTTP package: `@sdkwork/backend-sdk`
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

## Helper Highlights

- `messages.send(...)` normalizes raw envelopes to `version: 2` and uppercases transport `type` fields before HTTP send
- `messages.batchSend(...)` applies the same normalization to every outbound envelope in a batch
- `session.register(...)` aligns with `session.login(...)` and can bootstrap realtime from server-provided WuKongIM config
- `realtime.connect(...)` persists the connected WuKongIM session back into `session.getState()`
- `realtime.onRaw(...)` exposes normalized inbound message and event frames before app-level filtering
- `events.publishGameEvent(...)` standardizes `GAME_EVENT` payloads for multiplayer, chess, and similar future scenes

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
