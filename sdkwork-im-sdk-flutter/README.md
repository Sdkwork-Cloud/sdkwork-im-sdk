# SDKWork IM SDK Flutter Workspace

This workspace owns the Flutter package surface for the IM SDK family.

## Consumer Package Standard

The official Flutter app-consumer package in this workspace is `im_sdk`.

- package name: `im_sdk`
- library entrypoint: `package:im_sdk/im_sdk.dart`
- primary client: `ImSdkClient`
- manual-owned consumer layer: `composed`
- generator-owned transport boundary: `im_sdk_generated`
- low-level generated entrypoint: `package:im_sdk_generated/im_sdk_generated.dart`

For most Flutter app integrations, import `im_sdk`.
That root library re-exports the generated `im_sdk_generated` package, so generated models and low-level
transport stay reachable without making `im_sdk_generated` the default app-consumer dependency.

## Layout

- `generated/server-openapi`
  Generator-owned Flutter HTTP SDK output from `sdkwork-sdk-generator`.
- `composed`
  Manual-owned consumer package `im_sdk` built above the generated HTTP layer.
- `bin/`
  Thin forwarding scripts to the root workspace wrappers.
- `README.md`
  Manual-owned workspace documentation.

## Generation Boundary

This workspace follows the layered Flutter IM-family pattern:

- generated HTTP SDK lives in `generated/server-openapi`
- composed Flutter SDK lives in `composed`
- `im_sdk` is the official app-facing Flutter package
- `im_sdk` re-exports `package:im_sdk_generated/im_sdk_generated.dart`
- any future handwritten realtime adapter must live outside generated output

Do not hand-edit the generated package. Change the root OpenAPI inputs or generator wrappers and regenerate.
The root generation wrapper also normalizes the generated package's public auth surface back to Craw Chat's bearer-only contract before verification continues.

The root wrapper feeds Flutter from `openapi/craw-chat-app.flutter.sdkgen.yaml`, which expands primitive component refs before generation so Dart models stay correctly typed.
The manual `composed` layer consumes the generated package only through `package:im_sdk_generated/im_sdk_generated.dart`; it does not import generated `src/` paths directly.

## Consumer Package

The primary app-facing Flutter package is `composed/pubspec.yaml`:

- package name: `im_sdk`
- library entrypoint: `package:im_sdk/im_sdk.dart`
- main capabilities:
  - `ImSdkClient`
  - business modules for sessions, presence, realtime HTTP, devices, inbox, conversations, messages, media, streams, and RTC
  - convenience builders for text messages, text stream frames, and JSON RTC signals
- the root library re-exports the generated `im_sdk_generated` package for low-level transport access

## Current Surface Reality

The checked-in Flutter SDK is intentionally narrower than the TypeScript package:

- `im_sdk` re-exports `im_sdk_generated`, whose package root now exports generated `AuthApi` and
  `PortalApi` symbols.
- `ImTransportClient` mounts `client.auth` and `client.portal`, and `ImSdkClient` exposes
  those capabilities as `sdk.auth` and `sdk.portal`.
- `sdk.auth.login(...)` automatically applies the returned `accessToken` when the service returns
  one, while `sdk.auth.useToken(...)` and `sdk.auth.clearToken()` provide explicit token control.
- The checked-in Flutter SDK has no delivered WebSocket adapter and does not ship `sdk.connect(...)`.
- The checked-in Flutter SDK does not yet ship a `sdk.createXxxMessage()` / `sdk.send()` /
  `sdk.decodeMessage()` message-first surface; that richer outbound builder family still lives in
  TypeScript today.
- Dart consumers currently post outbound text and route-aligned messages through
  `sdk.conversations.postText(...)`, `sdk.conversations.publishSystemText(...)`,
  `sdk.media.attachText(...)`, and `ImBuilders.*`.
- Realtime in the checked-in Flutter SDK is HTTP coordination only today.

## Generate

From this workspace:

```powershell
.\bin\sdk-gen.ps1
```

If local PowerShell execution policy blocks script execution, use:

```powershell
powershell -ExecutionPolicy Bypass -File .\bin\sdk-gen.ps1
```

```bash
./bin/sdk-gen.sh
```

These scripts forward to the root `sdkwork-im-sdk/bin/generate-sdk.*` wrapper and constrain generation to the Flutter target.
The forwarded flow ends by running the shared `bin/verify-flutter-workspace.mjs` suite, so regeneration immediately rechecks generated-model regressions, bearer-auth surface alignment, composed parity, public API boundaries, and package metadata alignment.
The same root-owned verification path also materializes the local `composed/pubspec_overrides.yaml` file for the current checkout layout, so `im_sdk_generated` and `sdkwork_common_flutter` resolve correctly in both the main workspace and nested git worktrees.

## Verify

From this workspace:

```powershell
.\bin\sdk-verify.ps1
```

If local PowerShell execution policy blocks script execution, use:

```powershell
powershell -ExecutionPolicy Bypass -File .\bin\sdk-verify.ps1
```

```bash
./bin/sdk-verify.sh
```

These scripts forward to the root `sdkwork-im-sdk/bin/verify-sdk.*` wrapper and constrain verification to the Flutter target.
The forwarded verification path delegates to the shared `bin/verify-flutter-workspace.mjs` suite.
Add `-WithDart` on PowerShell or `--with-dart` on shell when the machine has a responsive Dart toolchain and you want native `dart pub get` plus `dart analyze` checks in addition to the default source-level regression guards.
On Windows, that native Dart path resolves Flutter's bundled `dart.exe`, isolates the pub cache under `.sdkwork/dart/pub-cache`, and falls back to the workspace `bin/verify-flutter-dart-analysis.dart` analyzer entrypoint when `dart analyze` cannot safely launch its own helper process in the current environment.

## Current Round Scope

This round generates Flutter transport and composed coverage for:

- mounted portal auth and portal snapshot APIs on both generated and composed Flutter clients
- sessions
- presence
- realtime HTTP coordination
- conversations
- members
- messages
- media
- streams
- RTC

The websocket transport is documented at the workspace root but is not implemented as a handwritten
Flutter adapter in this round.

## Release Snapshot Boundary

This workspace inherits the current SDK release snapshot from `artifacts/releases/wave-d-2026-04-08/sdk-release-catalog.json`.

- `state = generated_pending_publication`
- `generationStatus = generated`
- `releaseStatus = not_published`
- `plannedVersion = null`
- `versionStatus = version_unassigned_pending_freeze`
- `versionDecisionSourcePath = null`
