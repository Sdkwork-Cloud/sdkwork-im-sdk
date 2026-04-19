# SDKWork IM SDK Kotlin Workspace

This workspace is the Kotlin lane of the `sdkwork-im-sdk` multi-language delivery standard.

## Current Standard

- Maturity tier: `Tier B`
- Target semantic client: `ImSdkClient`
- Current generated transport artifact: `com.sdkwork:im-sdk-generated`
- Reserved semantic artifact: `com.sdkwork:im-sdk`
- Generator-owned boundary: `generated/server-openapi`
- Manual-owned semantic boundary: `composed`

The checked-in Kotlin delivery is transport-first. `generated/server-openapi` contains the generated transport artifact based on the latest live OpenAPI 3.x schema, while `composed` is reserved for the future `ImSdkClient` semantic layer and Kotlin business helpers.

## Workspace Layout

- `generated/server-openapi`
  Generator-owned Kotlin transport artifact. Use the generated README when consuming the raw OpenAPI surface.
- `composed`
  Manual-owned semantic reserve for the app-facing Kotlin SDK layer.
- `bin/`
  Thin forwarding wrappers back to the root generation and verification pipeline.
- `README.md`
  Manual-owned workspace contract for the Kotlin lane.

Do not modify files under `generated/server-openapi` by hand.

## Generate

The workspace wrapper delegates to the root generator, which refreshes the live schema before regenerating the Kotlin transport artifact.

```powershell
.\bin\sdk-gen.ps1
```

```bash
./bin/sdk-gen.sh
```

## Verify

The workspace verifier checks README terminology, boundary ownership, and assembly metadata for the Kotlin lane.

```powershell
.\bin\sdk-verify.ps1
```

```bash
./bin/sdk-verify.sh
```

## Release Snapshot Boundary

This workspace inherits the current SDK release snapshot from `artifacts/releases/wave-d-2026-04-08/sdk-release-catalog.json`.

- `state = generated_pending_publication`
- `generationStatus = generated`
- `releaseStatus = not_published`
- `plannedVersion = null`
- `versionStatus = version_unassigned_pending_freeze`
- `versionDecisionSourcePath = null`

