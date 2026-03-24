# SDKWork IM Go Workspace

This directory is the Go workspace inside `sdkwork-im-sdk`.

## Contract Source

- app schema: `/im/v3/openapi.json`
- admin schema: excluded

## Package

- generated module: `github.com/sdkwork/backend-sdk`

## Current Shape

- generated HTTP SDK only
- generator-owned directory: `generated/server-openapi`
- no handwritten WuKongIM adapter layer
- no handwritten composed layer

## Commands

- generate server SDK: `bin/sdk-gen.sh` or `bin/sdk-gen.ps1`
- assemble workspace metadata: `bin/sdk-assemble.sh` or `bin/sdk-assemble.ps1`

## Rules

- only `generated/server-openapi` may be overwritten by generation
- future handwritten realtime layers must remain outside the generated directory
