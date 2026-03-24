# sdkwork-im-sdk (Swift)

Professional Swift SDK for SDKWork API.

## Installation

Add to `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/sdkwork/backend-sdk-swift", from: "1.0.11")
]
```

## Quick Start

```swift
import SdkworkBackend
import SDKworkCommon

let config = SdkConfig(baseUrl: "http://127.0.0.1:3000")
let client = SdkworkBackendClient(config: config)
client.setApiKey("your-api-key")

// Use the SDK
let result = try await client.auth.controllerGetCurrentUser()
print(result)
```

## Authentication Modes (Mutually Exclusive)

Choose exactly one mode for the same client instance.

### Mode A: API Key

```swift
let config = SdkConfig(baseUrl: "http://127.0.0.1:3000")
let client = SdkworkBackendClient(config: config)
client.setApiKey("your-api-key")
// Sends: X-API-Key: <apiKey>
```

### Mode B: Dual Token

```swift
let config = SdkConfig(baseUrl: "http://127.0.0.1:3000")
let client = SdkworkBackendClient(config: config)
client.setAuthToken("your-auth-token")
client.setAccessToken("your-access-token")
// Sends:
// Authorization: Bearer <authToken>
// Access-Token: <accessToken>
```

> Do not call `setApiKey(...)` together with `setAuthToken(...)` + `setAccessToken(...)` on the same client.

## Configuration (Non-Auth)

```swift
let config = SdkConfig(baseUrl: "http://127.0.0.1:3000")
let client = SdkworkBackendClient(config: config)

// Set custom headers
client.setHeader("X-Custom-Header", value: "value")
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

```swift
// 用户登录
let result = try await client.auth.controllerLogin()
print(result)
```

### users

```swift
// 获取当前用户信息
let result = try await client.users.userControllerGetCurrent()
print(result)
```

### friends

```swift
// Send friend request
let result = try await client.friends.friendControllerSendRequest()
print(result)
```

### contacts

```swift
// 创建联系人
let result = try await client.contacts.contactControllerCreate()
print(result)
```

### messages

```swift
// 发送消息
let result = try await client.messages.messageControllerSend()
print(result)
```

### message_search

```swift
// 搜索消息
let result = try await client.messageSearch.controller()
print(result)
```

### groups

```swift
// 创建群组
let result = try await client.groups.groupControllerCreate()
print(result)
```

### conversations

```swift
// 创建会话
let result = try await client.conversations.conversationControllerCreate()
print(result)
```

### rtc

```swift
// Create RTC room
let result = try await client.rtc.appControllerCreateRoom()
print(result)
```

### wukongim

```swift
// Get WuKongIM connection config
let result = try await client.wukongim.wukongImappControllerGetConfig()
print(result)
```

### ai_bot

```swift
// Create a new AI Bot
let result = try await client.aiBot.aibotControllerCreateBot()
print(result)
```

### agent

```swift
// Create a new agent
let result = try await client.agent.controllerCreate()
print(result)
```

### agent_memory

```swift
// Get memories for agent
let result = try await client.agentMemory.memoryControllerGetMemories()
print(result)
```

### bots

```swift
// 创建 Bot
let result = try await client.bots.botControllerCreate()
print(result)
```

### bots_open

```swift
// 获取当前 Bot 信息（Bot Token）
let result = try await client.botsOpen.botOpenControllerGetCurrent()
print(result)
```

### third_party

```swift
// 发送第三方平台消息
let result = try await client.thirdParty.controllerSendMessage()
print(result)
```

### iot

```swift
// 注册设备
let result = try await client.iot.ioTcontrollerRegisterDevice()
print(result)
```

### craw

```swift
// 注册 Craw Agent（匿名）
let result = try await client.craw.controllerRegister()
print(result)
```

### timeline

```swift
// Create a timeline post
let result = try await client.timeline.controllerCreatePost()
print(result)
```

## Error Handling

```swift
do {
    let result = try await client.auth.controllerGetCurrentUser()
} catch {
    print("Error: \(error)")
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

> Set `SWIFT_RELEASE_TAG` (or `SDKWORK_RELEASE_TAG`) for tag-based release.

## License

MIT
