# SDK Package Standards

This document defines the package-contract rules that apply inside
`sdks/sdkwork-im-sdk`.

Use it when you need the exact naming, ownership, and public-entrypoint standards for the
`sdkwork-im-sdk` app SDK family.

## TypeScript Standard

The TypeScript SDK uses one official consumer package per workspace:

- SDK root directory: `sdkwork-im-sdk`
- published package: `@sdkwork/im-sdk`
- internal generated workspace package: `@sdkwork-internal/im-sdk-generated`
- runtime targets: browser and Node.js
- primary client: `ImSdkClient`

### TypeScript Ownership Boundary

- generated OpenAPI transport is authored under `sdkwork-im-sdk-typescript/generated/server-openapi`
- assembled generated transport lives under `sdkwork-im-sdk-typescript/src/generated/**`
- handwritten business modules live under `sdkwork-im-sdk-typescript/src/**` outside `src/generated/**`
- manual authoring happens in `sdkwork-im-sdk-typescript/composed`

### TypeScript Public Contract

App consumers should import only from `@sdkwork/im-sdk`.

That package must continue to expose one public client, `ImSdkClient`, with the mounted domains:

- `sdk.auth`
- `sdk.portal`
- `sdk.session`
- `sdk.presence`
- `sdk.realtime`
- `sdk.device`
- `sdk.inbox`
- `sdk.conversations`
- `sdk.messages`
- `sdk.media`
- `sdk.live`
- `sdk.sync`
- `sdk.stream`
- `sdk.rtc`

The public realtime contract must continue to expose:

- payload-first live domain streams: `live.messages`, `live.data`, `live.signals`, `live.events`,
  and `live.lifecycle`
- no legacy flat callbacks such as `live.onMessage(...)`, `live.onSignal(...)`, or
  `live.onData(...)`
- resolved live lifecycle states limited to `connected`, `error`, and `closed`

Do not document TypeScript as a two-package consumer model.
`generated/server-openapi` and `composed` are authoring boundaries, not the downstream package
selection model.

## Flutter Standard

The Flutter SDK uses an official consumer package plus a generated transport package:

- official app-facing package: `im_sdk`
- primary client: `ImSdkClient`
- official consumer entrypoint: `package:im_sdk/im_sdk.dart`
- generator-owned transport package: `im_sdk_generated`
- transport entrypoint: `package:im_sdk_generated/im_sdk_generated.dart`

### Flutter Ownership Boundary

- generated transport is owned by `sdkwork-im-sdk-flutter/generated/server-openapi`
- manual consumer logic is owned by `sdkwork-im-sdk-flutter/composed`
- `im_sdk` re-exports `im_sdk_generated`

### Flutter Public Contract

For most Flutter app integrations, document `im_sdk` first.

Only direct transport consumers should start from `im_sdk_generated`.
Do not describe Flutter as a neutral generated-versus-composed package choice when the official
consumer package is already known.

## Tier B Reserve Standard

The Tier B languages keep a generated transport package plus a real reserved composed boundary:

- languages: Java, C#, Swift, Kotlin, Go, and Python
- generated package identity must stay app-facing and must not reuse any removed legacy package alias
- composed boundary must exist as a real manifest-backed package boundary, not a README-only placeholder
- composed boundary version stays empty until the language is promoted for public semantic helpers
- composed boundary status stays `reserved` in `.sdkwork-assembly.json`

### Tier B Reserve Ownership Boundary

- generated transport remains under `<language-workspace>/generated/server-openapi`
- reserved semantic boundary remains under `<language-workspace>/composed`
- generator output must never land in reserved `composed`
- reserved manifests exist so assembly, verifier, and docs can all point at a real package boundary

### Tier B Reserve Contract

- Java reserved composed package: `com.sdkwork:im-sdk`
- C# reserved composed package: `Sdkwork.Im.Sdk`
- Swift reserved composed package: `ImSdk`
- Kotlin reserved composed package: `com.sdkwork:im-sdk`
- Go reserved composed package: `github.com/sdkwork/im-sdk`
- Python reserved composed package: `sdkwork-im-sdk`
- each reserved package keeps its standard manual-owned description in assembly metadata
- each reserved package must continue to publish `status = reserved` until the semantic layer is actually implemented

## Shared Naming Rules

- Prefer real package names over directory nicknames.
- Prefer public client class names over generic phrases like "composed client".
- Prefer public entrypoints over internal source paths.
- Keep generated code under stable `generated` naming and keep manual business code under the real
  business package name.

## Source Of Truth Links

- workspace overview: `../README.md`
- internal docs map: `README.md`
- public docs sync standard: `sites/README.md`
- generation pipeline: `generation-pipeline.md`
- verification matrix: `verification-matrix.md`
- realtime extension boundary: `realtime-extension-boundary.md`
