# sdkwork-im-sdk (Python)

Professional Python SDK for SDKWork API.

## Installation

```bash
pip install sdkwork-backend-sdk
```

## Quick Start

```python
from sdkwork_backend_sdk import SdkworkBackendClient, SdkConfig

config = SdkConfig(
    base_url="http://127.0.0.1:3000",
)

client = SdkworkBackendClient(config)
client.set_api_key("your-api-key")

# Use the SDK
result = client.auth.controller_get_current_user()
```

## Authentication Modes (Mutually Exclusive)

Choose exactly one mode for the same client instance.

### Mode A: API Key

```python
config = SdkConfig(base_url="http://127.0.0.1:3000")
client = SdkworkBackendClient(config)
client.set_api_key("your-api-key")
# Sends: X-API-Key: <apiKey>
```

### Mode B: Dual Token

```python
config = SdkConfig(base_url="http://127.0.0.1:3000")
client = SdkworkBackendClient(config)
client.set_auth_token("your-auth-token")
client.set_access_token("your-access-token")
# Sends:
# Authorization: Bearer <authToken>
# Access-Token: <accessToken>
```

> Do not call `set_api_key(...)` together with `set_auth_token(...)` + `set_access_token(...)` on the same client.

## API Modules

- `client.auth` - auth API
- `client.users` - users API
- `client.friends` - friends API
- `client.contacts` - contacts API
- `client.messages` - messages API
- `client.message_search` - message_search API
- `client.groups` - groups API
- `client.conversations` - conversations API
- `client.rtc` - rtc API
- `client.wukongim` - wukongim API
- `client.ai_bot` - ai_bot API
- `client.agent` - agent API
- `client.agent_memory` - agent_memory API
- `client.bots` - bots API
- `client.bots_open` - bots_open API
- `client.third_party` - third_party API
- `client.iot` - iot API
- `client.craw` - craw API
- `client.timeline` - timeline API

## Publishing

This SDK includes cross-platform publish scripts in `bin/`:
- `bin/publish-core.mjs`
- `bin/publish.sh`
- `bin/publish.ps1`

### Check

```bash
./bin/publish.sh --action check
```

### Publish

```bash
./bin/publish.sh --action publish --channel release
```

```powershell
.\bin\publish.ps1 --action publish --channel test --dry-run
```

> Set `PYPI_TOKEN` for release (or `TEST_PYPI_TOKEN` for test channel).

## License

MIT
