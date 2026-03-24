# WuKongIM Adapter Standard

WuKongIM integration is isolated to handwritten adapter modules.

- TypeScript adapter wraps `wukongimjssdk`
- Flutter adapter wraps `wukongimfluttersdk`
- Adapter package metadata must declare the official WuKongIM dependency explicitly.
- Composed packages must depend on both the generated server package and the handwritten adapter package.

Adapters must never be generation targets.

## Adapter Scope

Adapters are responsible for:

- connecting and disconnecting WuKongIM
- mapping WuKongIM connection status into SDK connection state
- normalizing inbound frames into the OpenChat transport envelope
- dispatching normalized message and event callbacks

Adapters are not responsible for:

- sending application messages
- defining server HTTP contracts
- mutating generated OpenAPI output

## Inbound Envelope Rules

Adapters should normalize WuKongIM inbound payloads into one of two stable shapes:

- message frame: `conversation + message`
- event frame: `conversation + event`

The normalized message envelope uses uppercase `type` values such as:

- `TEXT`
- `IMAGE`
- `AUDIO`
- `VIDEO`
- `FILE`
- `LOCATION`

The normalized event envelope must support:

- `RTC_SIGNAL` for RTC negotiation data
- domain events such as `GAME_EVENT`
- arbitrary future business namespaces through `event.metadata.namespace`

## Compose Boundary

The composed SDK layer may subscribe to adapter events, but the adapter itself must stay business-agnostic. This keeps WuKongIM runtime code stable across repeated OpenAPI regeneration.
