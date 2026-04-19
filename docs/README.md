# SDKWork IM SDK Internal Docs

This directory is the workspace-internal documentation map for `sdkwork-im-sdk`.

Use it when you are maintaining generation, verification, package boundaries, or wording standards
inside the `sdkwork-im-sdk` workspace itself.

## What This Folder Anchors

- internal standards for the TypeScript and Flutter package contracts
- the live service schema source used during regeneration
- the verification entrypoints that must stay green before release work continues
- pointers to the public docs site pages and the local language workspace READMEs

## Internal Standards Map

- `package-standards.md`
  Exact package names, client names, ownership boundaries, and public entrypoints.
- `generation-pipeline.md`
  Required generation sequence from live OpenAPI schema refresh through post-generation verification.
- `verification-matrix.md`
  Script-by-script verification responsibilities for shared, TypeScript, Flutter, and docs checks.
- `realtime-extension-boundary.md`
  Manual-versus-generated ownership rules for realtime and WebSocket-adjacent SDK behavior.
- `multilanguage-generator-standard.md`
  Root-workspace standard for the nine-language SDK family, live-schema refresh, normalization, and
  workspace-versus-generator ownership.
- `multilanguage-capability-matrix.md`
  Maintainer-facing tier map for package names, generated boundaries, semantic reserves, and current
  verification depth.
- `multilanguage-audit-report.md`
  The latest real generation and verification baseline, including workspace fixes, external
  generator gaps, and environment-only blockers.
- `sites/README.md`
  Public docs sync standard for the VitePress site pages that must stay aligned with workspace
  naming and package-boundary rules.

## Current Package Standards

### TypeScript Single-Package Standard

The TypeScript SDK follows a single-package standard:

- official consumer package: `@sdkwork/im-sdk`
- primary client: `ImSdkClient`
- low-level generated transport is still available from the same package
- generated transport is assembled into `src/generated/**`
- handwritten business modules stay in root `src/**` outside `src/generated/**`

Use the TypeScript workspace README as the package-level maintainer guide:

- `sdkwork-im-sdk-typescript/README.md`
- `sdkwork-im-sdk-typescript/composed/README.md`
- `sdkwork-im-sdk-typescript/generated/server-openapi/README.md`

### Flutter Consumer-Package Standard

The Flutter SDK follows an official consumer package plus generated transport boundary:

- official app-facing package: `im_sdk`
- primary client: `ImSdkClient`
- generated transport boundary: `im_sdk_generated`
- consumer entrypoint: `package:im_sdk/im_sdk.dart`
- generated transport entrypoint: `package:im_sdk_generated/im_sdk_generated.dart`
- `im_sdk` re-exports `im_sdk_generated` so most app consumers do not need a second direct dependency on the generated package

Use the Flutter workspace README set as the package-level maintainer guide:

- `sdkwork-im-sdk-flutter/README.md`
- `sdkwork-im-sdk-flutter/composed/README.md`
- `sdkwork-im-sdk-flutter/generated/server-openapi/README.md`

## Generation Source Of Truth

The authoritative generation source is the live service schema export:

- endpoint: `/openapi/craw-chat-app.openapi.yaml`
- checked-in authority snapshot: `openapi/craw-chat-app.openapi.yaml`
- derived generator inputs:
  - `openapi/craw-chat-app.sdkgen.yaml`
  - `openapi/craw-chat-app.flutter.sdkgen.yaml`

The checked-in authority file is the last successful live snapshot for review and diffability.
Generation wrappers must refresh from the live OpenAPI schema first, then normalize derived inputs
for the target language.
For TypeScript, the wrappers also stage conflicting generator-owned entries under
`.sdkwork/tmp/prepare-generated-output/typescript/**` before regeneration so local overwrite locks
do not break the live-schema flow.

For the full step-by-step flow, read `generation-pipeline.md`.

## Verification Entry Points

Run the workspace-level verification entrypoint first:

```powershell
node .\bin\verify-sdk.mjs
```

Then use the docs-site verification flow when wording, navigation, or public SDK guidance changes:

```powershell
node ..\..\docs\sites\scripts\verify-api-docs.mjs
node ..\..\docs\sites\scripts\verify-sdk-docs.mjs
```

Important workspace verifiers that define the current standard:

- `bin/verify-sdk-automation.mjs`
- `bin/verify-internal-docs.mjs`
- `bin/verify-docs-contract-tests.mjs`
- `bin/verify-typescript-workspace.mjs`
- `bin/verify-typescript-live-contract.mjs`
- `bin/verify-flutter-workspace.mjs`
- `bin/verify-auth-surface-alignment.mjs`

For the full script responsibility map, read `verification-matrix.md`.

## Public Docs Cross-References

When you update workspace wording, keep these public docs aligned:

- `docs/sites/sdk/index.md`
- `docs/sites/sdk/app-sdk.md`
- `docs/sites/sdk/typescript-sdk.md`
- `docs/sites/sdk/flutter-sdk.md`
- `docs/sites/sdk/rust-sdk.md`
- `docs/sites/sdk/java-sdk.md`
- `docs/sites/sdk/csharp-sdk.md`
- `docs/sites/sdk/swift-sdk.md`
- `docs/sites/sdk/kotlin-sdk.md`
- `docs/sites/sdk/go-sdk.md`
- `docs/sites/sdk/python-sdk.md`
- `docs/sites/sdk/generator-boundary.md`
- `docs/sites/sdk/language-support.md`
- `docs/sites/api-reference/app-api.md`

The maintainers' page map and wording rules for those public docs live in `sites/README.md`.

## Working Rule

Do not let wording drift back to generic "generated versus composed client" language when the real
consumer contract is already known.

Prefer package names, client class names, and real public entrypoints:

- `@sdkwork/im-sdk`
- `ImSdkClient`
- `im_sdk`
- `im_sdk_generated`

For the complete naming and boundary rules, read `package-standards.md`.
For the public VitePress sync standard, read `sites/README.md`.
