# openchat_wukongim_adapter

Flutter handwritten WuKongIM adapter for the `sdkwork-im-sdk` workspace.

## Responsibilities

- wrap `wukongimfluttersdk`
- own realtime connection lifecycle
- normalize inbound WuKongIM frames into OpenChat message and event frames
- expose connection-state callbacks

This package does not send business messages directly. Outbound IM, event, and RTC signaling traffic stays HTTP-first in `openchat_sdk`.

## Install

```yaml
dependencies:
  openchat_wukongim_adapter: ^1.0.11
```

## Usage

```dart
import 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

final adapter = OpenChatWukongimAdapter(
  config: OpenChatWukongimAdapterConfig(
    session: OpenChatRealtimeSession(
      uid: 'user-1',
      token: 'wk-token',
      wsUrl: 'ws://127.0.0.1:5200',
    ),
  ),
);

await adapter.connect();
final dispose = adapter.onMessage((frame) {
  print(frame.message.type);
});
```

## Workspace Boundary

- safe handwritten path: `adapter-wukongim/`
- generator-owned path: `../generated/server-openapi/`
- repeated OpenAPI regeneration must not modify this package

## Related Packages

- generated HTTP SDK: `backend_sdk`
- composed IM facade: `openchat_sdk`
