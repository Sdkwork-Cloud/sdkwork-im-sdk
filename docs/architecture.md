# SDKWork IM SDK Architecture

The workspace uses a three-layer language architecture:

- `generated/server-openapi`
- `adapter-wukongim`
- `composed`

Only `generated/server-openapi` is writable by SDKWORK Generator.

## Layer Responsibilities

`generated/server-openapi`

- generated only from `/im/v3/openapi.json`
- app-facing HTTP transport only
- safe to overwrite on every generation

`adapter-wukongim`

- handwritten realtime runtime integration
- wraps `wukongimjssdk` or `wukongimfluttersdk`
- owns connection lifecycle, inbound frame normalization, and connection state
- must not send business messages directly; outbound send stays HTTP-first

`composed`

- handwritten business facade
- combines generated HTTP APIs with realtime adapters
- exposes stable IM modules such as `session`, `messages`, `events`, `friends`, `groups`, `contacts`, and `rtc`
- shields apps from generator typing weaknesses and WuKongIM runtime details

## Transport Standard

- app HTTP prefix: `/im/v3`
- admin HTTP prefix: `/admin/im/v3`
- frontend SDK generation source: `/im/v3/openapi.json`
- admin schema is exported separately and must never be bundled into `sdkwork-im-sdk`
- send-message standard: `version + conversation + message`
- send-event standard: `version + conversation + event`
- RTC signaling standard: `event.type = RTC_SIGNAL`

## Regeneration Boundary

Repeated SDKWORK generation is allowed to touch only:

- `sdkwork-im-sdk/openapi/*`
- `sdkwork-im-sdk/sdkwork-im-sdk-*/generated/server-openapi/*`

Repeated SDKWORK generation must never touch:

- `sdkwork-im-sdk/sdkwork-im-sdk-*/adapter-wukongim/*`
- `sdkwork-im-sdk/sdkwork-im-sdk-*/composed/*`

The root generation wrappers enforce this boundary by capturing a manual-owned snapshot before generation and comparing it after generation plus assembly.
