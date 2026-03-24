# sdkwork-im-sdk (C#)

Professional C# SDK for SDKWork API.

## Installation

```bash
dotnet add package Backend
```

Or add to your `.csproj`:

```xml
<PackageReference Include="Backend" Version="1.0.11" />
```

## Quick Start

```csharp
using Backend;
using SDKwork.Common.Core;

var config = new SdkConfig("http://127.0.0.1:3000");
var client = new SdkworkBackendClient(config);
client.SetApiKey("your-api-key");

// Use the SDK
var result = await client.Auth.ControllerGetCurrentUserAsync();
Console.WriteLine(result);
```

## Authentication Modes (Mutually Exclusive)

Choose exactly one mode for the same client instance.

### Mode A: API Key

```csharp
var config = new SdkConfig("http://127.0.0.1:3000");
var client = new SdkworkBackendClient(config);
client.SetApiKey("your-api-key");
// Sends: X-API-Key: <apiKey>
```

### Mode B: Dual Token

```csharp
var config = new SdkConfig("http://127.0.0.1:3000");
var client = new SdkworkBackendClient(config);
client.SetAuthToken("your-auth-token");
client.SetAccessToken("your-access-token");
// Sends:
// Authorization: Bearer <authToken>
// Access-Token: <accessToken>
```

> Do not call `SetApiKey(...)` together with `SetAuthToken(...)` + `SetAccessToken(...)` on the same client.

## Configuration (Non-Auth)

```csharp
var config = new SdkConfig("http://127.0.0.1:3000");
var client = new SdkworkBackendClient(config);

// Set custom headers
client.SetHeader("X-Custom-Header", "value");
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

```csharp
// 用户登录
var result = await client.Auth.ControllerLoginAsync();
Console.WriteLine(result);
```

### users

```csharp
// 获取当前用户信息
var result = await client.Users.UserControllerGetCurrentAsync();
Console.WriteLine(result);
```

### friends

```csharp
// Send friend request
var result = await client.Friends.FriendControllerSendRequestAsync();
Console.WriteLine(result);
```

### contacts

```csharp
// 创建联系人
var result = await client.Contacts.ContactControllerCreateAsync();
Console.WriteLine(result);
```

### messages

```csharp
// 发送消息
var result = await client.Messages.MessageControllerSendAsync();
Console.WriteLine(result);
```

### message_search

```csharp
// 搜索消息
var result = await client.MessageSearch.ControllerAsync();
Console.WriteLine(result);
```

### groups

```csharp
// 创建群组
var result = await client.Groups.GroupControllerCreateAsync();
Console.WriteLine(result);
```

### conversations

```csharp
// 创建会话
var result = await client.Conversations.ConversationControllerCreateAsync();
Console.WriteLine(result);
```

### rtc

```csharp
// Create RTC room
var result = await client.Rtc.AppControllerCreateRoomAsync();
Console.WriteLine(result);
```

### wukongim

```csharp
// Get WuKongIM connection config
var result = await client.Wukongim.WukongImappControllerGetConfigAsync();
Console.WriteLine(result);
```

### ai_bot

```csharp
// Create a new AI Bot
var result = await client.AiBot.AibotControllerCreateBotAsync();
Console.WriteLine(result);
```

### agent

```csharp
// Create a new agent
var result = await client.Agent.ControllerCreateAsync();
Console.WriteLine(result);
```

### agent_memory

```csharp
// Get memories for agent
var result = await client.AgentMemory.MemoryControllerGetMemoriesAsync();
Console.WriteLine(result);
```

### bots

```csharp
// 创建 Bot
var result = await client.Bots.BotControllerCreateAsync();
Console.WriteLine(result);
```

### bots_open

```csharp
// 获取当前 Bot 信息（Bot Token）
var result = await client.BotsOpen.BotOpenControllerGetCurrentAsync();
Console.WriteLine(result);
```

### third_party

```csharp
// 发送第三方平台消息
var result = await client.ThirdParty.ControllerSendMessageAsync();
Console.WriteLine(result);
```

### iot

```csharp
// 注册设备
var result = await client.Iot.IoTcontrollerRegisterDeviceAsync();
Console.WriteLine(result);
```

### craw

```csharp
// 注册 Craw Agent（匿名）
var result = await client.Craw.ControllerRegisterAsync();
Console.WriteLine(result);
```

### timeline

```csharp
// Create a timeline post
var result = await client.Timeline.ControllerCreatePostAsync();
Console.WriteLine(result);
```

## Error Handling

```csharp
try
{
    var result = await client.Auth.ControllerGetCurrentUserAsync();
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
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

> Set `NUGET_API_KEY` for release (or `NUGET_TEST_API_KEY` for test channel).

## License

MIT
