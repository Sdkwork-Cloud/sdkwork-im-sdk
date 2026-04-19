# im_sdk

Official app-facing Flutter package in the IM SDK family.

This package is the manual-owned consumer layer inside the Flutter workspace.
It sits above and re-exports the generated `im_sdk_generated` package, so most Flutter app consumers
should import `package:im_sdk/im_sdk.dart` first.
Use `im_sdk_generated` directly only when you explicitly want the standalone generated transport package.

This package provides:

- a consumer-facing `ImSdkClient`
- business-oriented module names
- convenience builders for common message, stream, and RTC flows

Current checked-in scope:

- `im_sdk` re-exports `im_sdk_generated`, whose package root now exports generated `AuthApi` and
  `PortalApi` symbols.
- `ImSdkClient` exposes `sdk.auth` and `sdk.portal`, while `ImTransportClient` mounts the
  same generated groups as `client.auth` and `client.portal`.
- `sdk.auth.login(...)` automatically applies the returned `accessToken` when present, and
  `sdk.auth.useToken(...)` plus `sdk.auth.clearToken()` handle explicit bearer-token control.
- The consumer package has no delivered WebSocket adapter and does not ship `sdk.connect(...)`.
- The package does not yet ship a TypeScript-style `sdk.createXxxMessage()` / `send()` /
  `decodeMessage()` message-first surface.
- Route-aligned outbound shortcuts currently live on `sdk.conversations.postText(...)`,
  `sdk.conversations.publishSystemText(...)`, `sdk.media.attachText(...)`, and `ImBuilders.*`.

The generated `im_sdk_generated` package remains generator-owned under `../generated/server-openapi`.
This `composed` package is manual-owned and remains the official Flutter app-consumer package in
this workspace.

## Usage

```dart
import 'package:im_sdk/im_sdk.dart';

final sdk = ImSdkClient.create(
  baseUrl: 'https://api.example.com',
  authToken: '<token>',
);

await sdk.auth.me();
final workspace = await sdk.portal.getWorkspace();

await sdk.conversations.postText(
  'conversation-1',
  text: 'hello world',
);
```

For presigned browser-or-device uploads, use `sdk.media.upload(...)`. The helper executes the
create-upload call, pushes bytes to the presigned URL, and completes the upload handshake. It
returns `MediaUploadMutationResponse`, so callers can keep working with the generated transport
model when they need exact upload-session details.

```dart
final uploadResult = await sdk.media.upload(
  CreateUploadRequest(
    mediaAssetId: 'asset-image-1',
    bucket: 'tenant-media',
    objectKey: 'conversation-1/storefront.png',
    resource: MediaResource(
      type: MediaResourceType.image,
      name: 'storefront.png',
      mimeType: 'image/png',
      size: fileBytes.length,
    ),
  ),
  fileBytes,
);

print(uploadResult?.mediaAssetId);
print(uploadResult?.upload?.url);
```

Because `im_sdk` re-exports the generated `im_sdk_generated` package, most consumers do not need
to add both packages separately during local workspace development.

## Local Dependency Override

This workspace keeps `pubspec.yaml` publish-friendly and lets the root IM SDK wrappers materialize a local `pubspec_overrides.yaml` for the current checkout layout.
That generated local override keeps both the generated `im_sdk_generated` package and `sdkwork_common_flutter` pointed at the correct workspace paths in either the main checkout or a nested git worktree:

```yaml
dependency_overrides:
  im_sdk_generated:
    path: ../generated/server-openapi
  sdkwork_common_flutter:
    path: <computed by root wrapper>
```
