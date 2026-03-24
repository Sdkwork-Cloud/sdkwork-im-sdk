# SDKWork IM Android Compatibility Wrapper

This directory is a compatibility wrapper.

## Canonical Target

- authoritative generator workspace: `sdkwork-im-sdk-kotlin`
- app schema source: `/im/v3/openapi.json`
- admin schema: excluded

## Why It Exists

- historical references may still point to an Android-labelled directory
- SDKWORK Generator emits Kotlin packages, not Android-specific project trees
- the wrapper preserves stable entry points without expanding the generator boundary

## Commands

Compatibility scripts forward to the Kotlin workspace:

- `bin/sdk-gen.sh`
- `bin/sdk-gen.ps1`
- `bin/sdk-assemble.sh`
- `bin/sdk-assemble.ps1`

## Rule

Do not point generation at `sdkwork-im-sdk-android`. Generate into `sdkwork-im-sdk-kotlin/generated/server-openapi` instead.
