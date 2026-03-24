# openchat_sdk

Flutter composed IM SDK for OpenChat.

## Responsibilities

- consume generated app HTTP APIs from `backend_sdk`
- integrate handwritten realtime transport from `openchat_wukongim_adapter`
- expose stable IM business modules:
  - `session`
  - `realtime`
  - `messages`
  - `events`
  - `friends`
  - `conversations`
  - `groups`
  - `contacts`
  - `rtc`

## Install

```yaml
dependencies:
  openchat_sdk: ^1.0.11
  backend_sdk: ^1.0.11
  openchat_wukongim_adapter: ^1.0.11
```

## Runtime Model

- send messages and events through HTTP `/im/v3/**`
- receive messages and events through WuKongIM long connection
- persist messages on the server side
- keep transport standard as `version + conversation + message` or `version + conversation + event`

## Usage

```dart
import 'package:openchat_sdk/openchat_sdk.dart';

final sdk = OpenChatImSdk.create(
  baseUrl: 'http://127.0.0.1:3000',
);

await sdk.session.login({
  'username': 'alice',
  'password': 'secret',
});

sdk.realtime.onMessage((frame) {
  print(frame.message.type);
});

await sdk.messages.sendText(
  toUserId: 'user-2',
  text: 'hello world',
  idempotencyKey: 'idem-1',
);
```

## Workspace Boundary

- generator-owned path: `../generated/server-openapi/`
- handwritten safe paths:
  - `../adapter-wukongim/`
  - `./`

Repeated OpenAPI regeneration must not change the handwritten adapter or this composed package.
