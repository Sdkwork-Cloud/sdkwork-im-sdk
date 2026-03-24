# sdkwork-im-sdk (Java)

Professional Java SDK for SDKWork API.

## Installation

Add to your `pom.xml`:

```xml
<dependency>
    <groupId>com.sdkwork</groupId>
    <artifactId>backend-sdk</artifactId>
    <version>1.0.11</version>
</dependency>
```

Or with Gradle:

```groovy
implementation 'com.sdkwork:backend-sdk:1.0.11'
```

## Quick Start

```java
import com.sdkwork.backend.SdkworkBackendClient;
import com.sdkwork.common.core.Types;

public class Main {
    public static void main(String[] args) throws Exception {
        Types.SdkConfig config = new Types.SdkConfig("http://127.0.0.1:3000");
        SdkworkBackendClient client = new SdkworkBackendClient(config);
        client.setApiKey("your-api-key");
        
        // Use the SDK
        Object result = client.getAuth().controllerGetCurrentUser();
        System.out.println(result);
    }
}
```

## Authentication Modes (Mutually Exclusive)

Choose exactly one mode for the same client instance.

### Mode A: API Key

```java
Types.SdkConfig config = new Types.SdkConfig("http://127.0.0.1:3000");
SdkworkBackendClient client = new SdkworkBackendClient(config);
client.setApiKey("your-api-key");
// Sends: X-API-Key: <apiKey>
```

### Mode B: Dual Token

```java
Types.SdkConfig config = new Types.SdkConfig("http://127.0.0.1:3000");
SdkworkBackendClient client = new SdkworkBackendClient(config);
client.setAuthToken("your-auth-token");
client.setAccessToken("your-access-token");
// Sends:
// Authorization: Bearer <authToken>
// Access-Token: <accessToken>
```

> Do not call `setApiKey(...)` together with `setAuthToken(...)` + `setAccessToken(...)` on the same client.

## Configuration (Non-Auth)

```java
Types.SdkConfig config = new Types.SdkConfig("http://127.0.0.1:3000");
SdkworkBackendClient client = new SdkworkBackendClient(config);

// Set custom headers
client.getHttpClient().setHeader("X-Custom-Header", "value");
```

## API Modules

- `client.getAuth()` - auth API
- `client.getUsers()` - users API
- `client.getFriends()` - friends API
- `client.getContacts()` - contacts API
- `client.getMessages()` - messages API
- `client.getMessageSearch()` - message_search API
- `client.getGroups()` - groups API
- `client.getConversations()` - conversations API
- `client.getRtc()` - rtc API
- `client.getWukongim()` - wukongim API
- `client.getAiBot()` - ai_bot API
- `client.getAgent()` - agent API
- `client.getAgentMemory()` - agent_memory API
- `client.getBots()` - bots API
- `client.getBotsOpen()` - bots_open API
- `client.getThirdParty()` - third_party API
- `client.getIot()` - iot API
- `client.getCraw()` - craw API
- `client.getTimeline()` - timeline API

## Usage Examples

### auth

```java
// 用户登录
Object result = client.getAuth().controllerLogin();
System.out.println(result);
```

### users

```java
// 获取当前用户信息
Object result = client.getUsers().userControllerGetCurrent();
System.out.println(result);
```

### friends

```java
// Send friend request
Object result = client.getFriends().friendControllerSendRequest();
System.out.println(result);
```

### contacts

```java
// 创建联系人
Object result = client.getContacts().contactControllerCreate();
System.out.println(result);
```

### messages

```java
// 发送消息
Object result = client.getMessages().messageControllerSend();
System.out.println(result);
```

### message_search

```java
// 搜索消息
Object result = client.getMessageSearch().controller();
System.out.println(result);
```

### groups

```java
// 创建群组
Object result = client.getGroups().groupControllerCreate();
System.out.println(result);
```

### conversations

```java
// 创建会话
Object result = client.getConversations().conversationControllerCreate();
System.out.println(result);
```

### rtc

```java
// Create RTC room
Object result = client.getRtc().appControllerCreateRoom();
System.out.println(result);
```

### wukongim

```java
// Get WuKongIM connection config
Object result = client.getWukongim().wukongImappControllerGetConfig();
System.out.println(result);
```

### ai_bot

```java
// Create a new AI Bot
Object result = client.getAiBot().aibotControllerCreateBot();
System.out.println(result);
```

### agent

```java
// Create a new agent
Object result = client.getAgent().controllerCreate();
System.out.println(result);
```

### agent_memory

```java
// Get memories for agent
Object result = client.getAgentMemory().memoryControllerGetMemories();
System.out.println(result);
```

### bots

```java
// 创建 Bot
Object result = client.getBots().botControllerCreate();
System.out.println(result);
```

### bots_open

```java
// 获取当前 Bot 信息（Bot Token）
Object result = client.getBotsOpen().botOpenControllerGetCurrent();
System.out.println(result);
```

### third_party

```java
// 发送第三方平台消息
Object result = client.getThirdParty().controllerSendMessage();
System.out.println(result);
```

### iot

```java
// 注册设备
Object result = client.getIot().ioTcontrollerRegisterDevice();
System.out.println(result);
```

### craw

```java
// 注册 Craw Agent（匿名）
Object result = client.getCraw().controllerRegister();
System.out.println(result);
```

### timeline

```java
// Create a timeline post
Object result = client.getTimeline().controllerCreatePost();
System.out.println(result);
```

## Error Handling

```java
try {
    Object result = client.getAuth().controllerGetCurrentUser();
} catch (Exception e) {
    System.err.println("Error: " + e.getMessage());
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

> Use Maven `settings.xml` credentials and optional `MAVEN_PUBLISH_PROFILE`.

## License

MIT
