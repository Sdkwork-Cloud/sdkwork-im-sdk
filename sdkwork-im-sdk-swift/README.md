# SDKWork IM SDK Swift Workspace

This workspace is the Swift lane of the `sdkwork-im-sdk` multi-language delivery standard.

## Current Standard

- Maturity tier: `Tier B`
- Target semantic client: `ImSdkClient`
- Current generated transport package: `ImSdkGenerated`
- Reserved semantic package: `ImSdk`
- Generator-owned boundary: `generated/server-openapi`
- Manual-owned semantic boundary: `composed`

The checked-in Swift delivery is transport-first. `generated/server-openapi` contains the generated transport package from the live OpenAPI 3.x schema, while `composed` stays manual-owned for the future `ImSdkClient` semantic facade and Swift-specific conveniences.

## Workspace Layout

- `generated/server-openapi`
  Generator-owned Swift transport package. See the generated README in that directory for raw package usage.
- `composed`
  Manual-owned semantic reserve for the app-facing Swift SDK.
- `bin/`
  Thin forwarding wrappers to the root generation and verification entrypoints.
- `README.md`
  Manual-owned workspace contract for the Swift lane.

Do not hand-edit generated files under `generated/server-openapi`.

## Generate

The workspace wrapper delegates to the root generator, which refreshes the live service schema before regenerating the Swift transport package.

```powershell
.\bin\sdk-gen.ps1
```

```bash
./bin/sdk-gen.sh
```

## Verify

Use the workspace verifier to confirm README alignment, package-boundary ownership, and assembly metadata correctness.

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

