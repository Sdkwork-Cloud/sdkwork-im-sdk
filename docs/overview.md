# SDKWork IM SDK Overview

`sdkwork-im-sdk` is the dedicated workspace for OpenChat IM SDK contracts, generation wrappers, and multi-language SDK products.

The workspace separates:

- authority OpenAPI and JSON Schema inputs
- generator-owned server SDK outputs
- handwritten WuKongIM adapters
- handwritten composed realtime SDKs

Every `sdkwork-im-sdk-XXX` workspace also carries its own `bin/sdk-gen.*` and `bin/sdk-assemble.*` forwarders so a language owner can regenerate or re-assemble from the language directory without touching generator internals.

Runtime schema endpoints:

- frontend app schema: `/im/v3/openapi.json`
- frontend app docs: `/im/v3/docs`
- admin control-plane schema: `/admin/im/v3/openapi.json`
- admin control-plane docs: `/admin/im/v3/docs`

The app-facing SDK generation flow targets the frontend schema only. `sdkwork-im-sdk` does not include admin APIs.

WuKongIM adapters remain handwritten and independent from generator-owned output. `generated/server-openapi`, `adapter-wukongim`, and `composed` stay as separate layers so regeneration never overwrites realtime integration code.

The standard app transport model is:

- `version + conversation + message`
- `version + conversation + event`

RTC signaling is standardized as `event.type = RTC_SIGNAL`, while future multiplayer and game-style traffic continues through typed domain events such as `GAME_EVENT`.
