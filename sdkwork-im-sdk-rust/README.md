# SDKWork IM SDK Rust Workspace

This workspace is the Rust lane of the `sdkwork-im-sdk` multi-language delivery standard.

## Current Standard

- Maturity tier: `Tier A`
- Primary semantic client: `ImSdkClient`
- Current generated transport crate: `sdkwork-im-sdk-generated`
- Current semantic crate: `im_sdk`
- Generator-owned boundary: `generated/server-openapi`
- Manual-owned semantic boundary: `composed`

The checked-in Rust delivery now includes both layers: `generated/server-openapi` contains the
publishable transport crate generated from the latest live OpenAPI 3.x schema, while `composed`
contains the checked-in semantic crate that exposes `ImSdkClient` and route-aligned Rust helpers.

## Workspace Layout

- `generated/server-openapi`
  Generator-owned Rust transport crate. Use the generated README in this directory for raw transport usage.
- `composed`
  Manual-owned semantic Rust layer for the checked-in `ImSdkClient`, builder helpers, and
  route-aligned modules above the generated transport.
- `bin/`
  Thin forwarding wrappers that delegate to the root generation and verification pipeline.
- `README.md`
  Manual-owned workspace contract for the Rust lane.

Do not hand-edit generator output inside `generated/server-openapi`.

## Generate

Both workspace wrappers forward to the root pipeline, which refreshes the live service schema before generation.

```powershell
.\bin\sdk-gen.ps1
```

```bash
./bin/sdk-gen.sh
```

## Verify

Use the workspace verifier to confirm directory ownership, README contract, and assembly metadata alignment.

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

