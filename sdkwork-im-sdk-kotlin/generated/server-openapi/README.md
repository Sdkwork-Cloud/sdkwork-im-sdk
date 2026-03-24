# sdkwork-im-sdk (Kotlin)

Professional Kotlin SDK for SDKWork API.

## Installation

Add to your `build.gradle.kts`:

```kotlin
implementation("com.sdkwork:backend-sdk:1.0.11")
```

Or with Gradle Groovy:

```groovy
implementation 'com.sdkwork:backend-sdk:1.0.11'
```

## Quick Start

```kotlin
import com.sdkwork.backend.SdkworkBackendClient
import com.sdkwork.common.core.SdkConfig

suspend fun main() {
    val config = SdkConfig(baseUrl = "http://127.0.0.1:3000")
    val client = SdkworkBackendClient(config)
    client.setApiKey("your-api-key")
    
    // Use the SDK
    val result = client.auth.controllerGetCurrentUser()
    println(result)
}
```

## Authentication Modes (Mutually Exclusive)

Choose exactly one mode for the same client instance.

### Mode A: API Key

```kotlin
val config = SdkConfig(baseUrl = "http://127.0.0.1:3000")
val client = SdkworkBackendClient(config)
client.setApiKey("your-api-key")
// Sends: X-API-Key: <apiKey>
```

### Mode B: Dual Token

```kotlin
val config = SdkConfig(baseUrl = "http://127.0.0.1:3000")
val client = SdkworkBackendClient(config)
client.setAuthToken("your-auth-token")
client.setAccessToken("your-access-token")
// Sends:
// Authorization: Bearer <authToken>
// Access-Token: <accessToken>
```

> Do not call `setApiKey(...)` together with `setAuthToken(...)` + `setAccessToken(...)` on the same client.

## Configuration (Non-Auth)

```kotlin
val config = SdkConfig(baseUrl = "http://127.0.0.1:3000")
val client = SdkworkBackendClient(config)
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

```kotlin
// 用户登录
val result = client.auth.controllerLogin()
println(result)
```

### users

```kotlin
// 获取当前用户信息
val result = client.users.userControllerGetCurrent()
println(result)
```

### friends

```kotlin
// Send friend request
val result = client.friends.friendControllerSendRequest()
println(result)
```

### contacts

```kotlin
// 创建联系人
val result = client.contacts.contactControllerCreate()
println(result)
```

### messages

```kotlin
// 发送消息
val result = client.messages.messageControllerSend()
println(result)
```

### message_search

```kotlin
// 搜索消息
val result = client.messageSearch.controller()
println(result)
```

### groups

```kotlin
// 创建群组
val result = client.groups.groupControllerCreate()
println(result)
```

### conversations

```kotlin
// 创建会话
val result = client.conversations.conversationControllerCreate()
println(result)
```

### rtc

```kotlin
// Create RTC room
val result = client.rtc.appControllerCreateRoom()
println(result)
```

### wukongim

```kotlin
// Get WuKongIM connection config
val result = client.wukongim.wukongImappControllerGetConfig()
println(result)
```

### ai_bot

```kotlin
// Create a new AI Bot
val result = client.aiBot.aibotControllerCreateBot()
println(result)
```

### agent

```kotlin
// Create a new agent
val result = client.agent.controllerCreate()
println(result)
```

### agent_memory

```kotlin
// Get memories for agent
val result = client.agentMemory.memoryControllerGetMemories()
println(result)
```

### bots

```kotlin
// 创建 Bot
val result = client.bots.botControllerCreate()
println(result)
```

### bots_open

```kotlin
// 获取当前 Bot 信息（Bot Token）
val result = client.botsOpen.botOpenControllerGetCurrent()
println(result)
```

### third_party

```kotlin
// 发送第三方平台消息
val result = client.thirdParty.controllerSendMessage()
println(result)
```

### iot

```kotlin
// 注册设备
val result = client.iot.ioTcontrollerRegisterDevice()
println(result)
```

### craw

```kotlin
// 注册 Craw Agent（匿名）
val result = client.craw.controllerRegister()
println(result)
```

### timeline

```kotlin
// Create a timeline post
val result = client.timeline.controllerCreatePost()
println(result)
```

## Error Handling

```kotlin
try {
    val result = client.auth.controllerGetCurrentUser()
} catch (e: Exception) {
    println("Error: ${e.message}")
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

> Configure Gradle publishing credentials and optional `GRADLE_PUBLISH_TASK`.

## License

MIT
