# sdkwork-im-sdk (Go)

Professional Go SDK for SDKWork API.

## Installation

```bash
go get github.com/sdkwork/backend-sdk
```

## Quick Start

```go
package main

import (
    "fmt"
    "github.com/sdkwork/backend-sdk"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

func main() {
    cfg := sdkhttp.NewDefaultConfig("http://127.0.0.1:3000")
    client := github.com/sdkwork/backend-sdk.NewSdkworkBackendClientWithConfig(cfg)
    client.SetApiKey("your-api-key")
    
    // Use the SDK
    result, err := client.Auth.ControllerGetCurrentUser()
    if err != nil {
        panic(err)
    }
    fmt.Println(result)
}
```

## Authentication Modes (Mutually Exclusive)

Choose exactly one mode for the same client instance.

### Mode A: API Key

```go
cfg := sdkhttp.NewDefaultConfig("http://127.0.0.1:3000")
client := github.com/sdkwork/backend-sdk.NewSdkworkBackendClientWithConfig(cfg)
client.SetApiKey("your-api-key")
// Sends: X-API-Key: <apiKey>
```

### Mode B: Dual Token

```go
cfg := sdkhttp.NewDefaultConfig("http://127.0.0.1:3000")
client := github.com/sdkwork/backend-sdk.NewSdkworkBackendClientWithConfig(cfg)
client.SetAuthToken("your-auth-token")
client.SetAccessToken("your-access-token")
// Sends:
// Authorization: Bearer <authToken>
// Access-Token: <accessToken>
```

> Do not call `SetApiKey(...)` together with `SetAuthToken(...)` + `SetAccessToken(...)` on the same client.

## Configuration (Non-Auth)

```go
cfg := sdkhttp.NewDefaultConfig("http://127.0.0.1:3000")
client := github.com/sdkwork/backend-sdk.NewSdkworkBackendClientWithConfig(cfg)

// Set custom headers
client.SetHeader("X-Custom-Header", "value")
```

## API Modules

- `client.Auth` - auth API
- `client.Users` - users API
- `client.Friends` - friends API
- `client.Contacts` - contacts API
- `client.Messages` - messages API
- `client.MessageSearch` - message_search API
- `client.Groups` - groups API
- `client.Conversations` - conversations API
- `client.Rtc` - rtc API
- `client.Wukongim` - wukongim API
- `client.AiBot` - ai_bot API
- `client.Agent` - agent API
- `client.AgentMemory` - agent_memory API
- `client.Bots` - bots API
- `client.BotsOpen` - bots_open API
- `client.ThirdParty` - third_party API
- `client.Iot` - iot API
- `client.Craw` - craw API
- `client.Timeline` - timeline API

## Usage Examples

### auth

```go
// 用户登录
result, err := client.Auth.ControllerLogin()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### users

```go
// 获取当前用户信息
result, err := client.Users.UserControllerGetCurrent()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### friends

```go
// Send friend request
result, err := client.Friends.FriendControllerSendRequest()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### contacts

```go
// 创建联系人
result, err := client.Contacts.ContactControllerCreate()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### messages

```go
// 发送消息
result, err := client.Messages.MessageControllerSend()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### message_search

```go
// 搜索消息
result, err := client.MessageSearch.Controller()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### groups

```go
// 创建群组
result, err := client.Groups.GroupControllerCreate()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### conversations

```go
// 创建会话
result, err := client.Conversations.ConversationControllerCreate()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### rtc

```go
// Create RTC room
result, err := client.Rtc.AppControllerCreateRoom()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### wukongim

```go
// Get WuKongIM connection config
result, err := client.Wukongim.WukongImappControllerGetConfig()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### ai_bot

```go
// Create a new AI Bot
result, err := client.AiBot.AibotControllerCreateBot()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### agent

```go
// Create a new agent
result, err := client.Agent.ControllerCreate()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### agent_memory

```go
// Get memories for agent
result, err := client.AgentMemory.MemoryControllerGetMemories()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### bots

```go
// 创建 Bot
result, err := client.Bots.BotControllerCreate()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### bots_open

```go
// 获取当前 Bot 信息（Bot Token）
result, err := client.BotsOpen.BotOpenControllerGetCurrent()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### third_party

```go
// 发送第三方平台消息
result, err := client.ThirdParty.ControllerSendMessage()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### iot

```go
// 注册设备
result, err := client.Iot.IoTcontrollerRegisterDevice()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### craw

```go
// 注册 Craw Agent（匿名）
result, err := client.Craw.ControllerRegister()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### timeline

```go
// Create a timeline post
result, err := client.Timeline.ControllerCreatePost()
if err != nil {
    panic(err)
}
fmt.Println(result)
```

## Error Handling

```go
result, err := client.Auth.ControllerGetCurrentUser()
if err != nil {
    // Handle error
    fmt.Println("Error:", err)
    return
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

> Set `GO_RELEASE_TAG` (or `SDKWORK_RELEASE_TAG`) and push tag if needed.

## License

MIT
