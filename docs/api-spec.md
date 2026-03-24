# OpenChat IM App API Contract Notes

This document summarizes the app-facing HTTP contract shape used by `sdkwork-im-sdk`.

## Transport Model

- message submission uses the server HTTP API
- client long connections stay on WuKongIM SDKs
- inbound realtime delivery comes from WuKongIM

The generated SDKs cover the HTTP side only.

## Runtime OpenAPI

- app docs: `/im/v3/docs`
- app schema: `/im/v3/openapi.json`
- admin docs: `/admin/im/v3/docs`
- admin schema: `/admin/im/v3/openapi.json`

Only the app schema is a generation source for `sdkwork-im-sdk`.

## Message Envelope

Prefer the V2 envelope:

```json
{
  "version": 2,
  "conversation": {},
  "message": {
    "text": {},
    "image": {},
    "video": {},
    "file": {},
    "location": {}
  },
  "event": {}
}
```

## Expansion Rules

- `message` is used for persisted business messages
- `event` is used for signaling, RTC coordination, gameplay payloads, and future transient or semi-persistent extensions
- message media payloads should stay aligned with the MediaResource model
- transport `type` values should use uppercase where the contract exposes typed enums

## SDK Boundary

- generator-owned code lives in `generated/server-openapi`
- handwritten realtime integration lives in `adapter-wukongim`
- product-facing aggregation lives in `composed`

Repeated generation must not overwrite handwritten layers.
