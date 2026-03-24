# backend_sdk

Generated Flutter OpenAPI SDK for the OpenChat app-facing IM HTTP APIs.

## Responsibilities

- consume the app schema exposed from `/im/v3/openapi.json`
- provide typed HTTP API modules for IM, RTC, friends, contacts, groups, conversations, bots, and related app surfaces
- stay generator-owned and independent from handwritten realtime integration code

## Installation

```yaml
dependencies:
  backend_sdk: ^1.0.11
```

## Quick Start

```dart
import 'package:backend_sdk/backend_sdk.dart';

final client = SdkworkBackendClient.withBaseUrl(
  baseUrl: 'http://127.0.0.1:3000',
  timeout: 30000,
);

client.setAccessToken('your-access-token');

final profile = await client.users.userControllerGetCurrent();
print(profile);
```

## Authentication

- API key mode: `setApiKey(...)`
- dual token mode: `setAuthToken(...)` + `setAccessToken(...)`

Do not mix API key mode with dual token mode on the same client instance.

## API Modules

- `client.auth`
- `client.users`
- `client.friends`
- `client.contacts`
- `client.messages`
- `client.messageSearch`
- `client.groups`
- `client.conversations`
- `client.rtc`
- `client.wukongim`
- `client.aiBot`
- `client.agent`
- `client.agentMemory`
- `client.bots`
- `client.botsOpen`
- `client.thirdParty`
- `client.iot`
- `client.craw`
- `client.timeline`

## Publish Scripts

This generated package keeps cross-platform publish helpers in `bin/`:

- `bin/publish-core.mjs`
- `bin/publish.sh`
- `bin/publish.ps1`

Validate before publishing:

```bash
./bin/publish.sh --action check
```

## Boundary

- generator-owned package: `sdkwork-im-sdk-flutter/generated/server-openapi`
- handwritten realtime packages:
  - `sdkwork-im-sdk-flutter/adapter-wukongim`
  - `sdkwork-im-sdk-flutter/composed`

Repeated OpenAPI generation must not modify handwritten WuKongIM or RTC integration code.

## License

AGPL-3.0-or-later
