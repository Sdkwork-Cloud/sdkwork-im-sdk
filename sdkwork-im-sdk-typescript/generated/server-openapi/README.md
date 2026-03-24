# sdkwork-im-sdk

Professional TypeScript SDK for SDKWork API.

## Installation

```bash
npm install @sdkwork/backend-sdk
# or
yarn add @sdkwork/backend-sdk
# or
pnpm add @sdkwork/backend-sdk
```

## Quick Start

```typescript
import { SdkworkBackendClient } from '@sdkwork/backend-sdk';

const client = new SdkworkBackendClient({
  baseUrl: 'http://127.0.0.1:3000',
  timeout: 30000,
});

// Mode A: API Key (recommended for server-to-server calls)
client.setApiKey('your-api-key');

// Use the SDK
const result = await client.auth.controllerGetCurrentUser();
```

## Authentication Modes (Mutually Exclusive)

Choose exactly one mode for the same client instance.

### Mode A: API Key

```typescript
const client = new SdkworkBackendClient({ baseUrl: 'http://127.0.0.1:3000' });
client.setApiKey('your-api-key');
// Sends: X-API-Key: <apiKey>
```

### Mode B: Dual Token

```typescript
const client = new SdkworkBackendClient({ baseUrl: 'http://127.0.0.1:3000' });
client.setAuthToken('your-auth-token');
client.setAccessToken('your-access-token');
// Sends:
// Authorization: Bearer <authToken>
// Access-Token: <accessToken>
```

> Do not call `setApiKey(...)` together with `setAuthToken(...)` + `setAccessToken(...)` on the same client.

## Configuration (Non-Auth)

```typescript
import { SdkworkBackendClient } from '@sdkwork/backend-sdk';

const client = new SdkworkBackendClient({
  baseUrl: 'http://127.0.0.1:3000',
  timeout: 30000, // Request timeout in ms
  headers: {      // Custom headers
    'X-Custom-Header': 'value',
  },
});
```

## API Modules

- `client.auth` - auth API
- `client.users` - users API
- `client.friends` - friends API
- `client.contacts` - contacts API
- `client.messages` - messages API
- `client.messageSearch` - message_search API
- `client.groups` - groups API
- `client.conversations` - conversations API
- `client.rtc` - rtc API
- `client.wukongim` - wukongim API
- `client.aiBot` - ai_bot API
- `client.agent` - agent API
- `client.agentMemory` - agent_memory API
- `client.bots` - bots API
- `client.botsOpen` - bots_open API
- `client.thirdParty` - third_party API
- `client.iot` - iot API
- `client.craw` - craw API
- `client.timeline` - timeline API

## Usage Examples

### auth

```typescript
// 获取当前用户信息
const result = await client.auth.controllerGetCurrentUser();
```

### users

```typescript
// 获取当前用户信息
const result = await client.users.userControllerGetCurrent();
```

### friends

```typescript
// Get sent friend requests
const result = await client.friends.friendControllerGetSentRequests();
```

### contacts

```typescript
// 批量删除联系人
const result = await client.contacts.contactControllerBatchDelete();
```

### messages

```typescript
// 发送消息
const body = {} as any;
const result = await client.messages.messageControllerSend(body);
```

### message_search

```typescript
// 快速搜索
const params = {} as Record<string, any>;
const result = await client.messageSearch.controllerQuick(params);
```

### groups

```typescript
// 创建群组
const body = {} as any;
const result = await client.groups.groupControllerCreate(body);
```

### conversations

```typescript
// 获取未读消息总数
const result = await client.conversations.conversationControllerGetTotalUnreadCount();
```

### rtc

```typescript
// Get RTC provider capabilities for SDK dynamic integration
const result = await client.rtc.appControllerGetProviderCapabilities();
```

### wukongim

```typescript
// Get WuKongIM connection config
const result = await client.wukongim.wukongImappControllerGetConfig();
```

### ai_bot

```typescript
// Get all AI Bots
const result = await client.aiBot.aibotControllerGetBots();
```

### agent

```typescript
// Get all available tools
const result = await client.agent.controllerGetAvailableTools();
```

### agent_memory

```typescript
// Get memory statistics
const agentId = 1;
const result = await client.agentMemory.memoryControllerGetStats(agentId);
```

### bots

```typescript
// 创建 Bot
const body = {} as any;
const result = await client.bots.botControllerCreate(body);
```

### bots_open

```typescript
// 获取当前 Bot 信息（Bot Token）
const result = await client.botsOpen.botOpenControllerGetCurrent();
```

### third_party

```typescript
// 同步第三方平台联系人
const platform = 'platform';
const result = await client.thirdParty.controllerSyncContacts(platform);
```

### iot

```typescript
// 注册设备
const result = await client.iot.ioTcontrollerRegisterDevice();
```

### craw

```typescript
// 获取当前 Craw Agent 状态（需 Craw API Key）
const result = await client.craw.controllerGetStatus();
```

### timeline

```typescript
// Get timeline feed
const params = {} as Record<string, any>;
const result = await client.timeline.controllerGetFeed(params);
```

## Error Handling

```typescript
import { SdkworkBackendClient, NetworkError, TimeoutError, AuthenticationError } from '@sdkwork/backend-sdk';

try {
  const result = await client.auth.controllerGetCurrentUser();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Authentication failed:', error.message);
  } else if (error instanceof TimeoutError) {
    console.error('Request timed out:', error.message);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  } else {
    throw error;
  }
}
```

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

> Set `NPM_TOKEN` (and optional `NPM_REGISTRY_URL`) before release publish.

## License

MIT
