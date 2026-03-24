# SDKWork IM SDK Scripts

This directory contains workspace-level orchestration scripts for:

- OpenAPI source preparation
- multi-language SDK generation
- generation boundary verification
- composed SDK assembly

The root `generate-sdk` wrappers:

- support PowerShell and POSIX shells
- can refresh from a runtime OpenAPI endpoint or skip refresh and use the checked-in snapshot
- use a safer default runtime schema refresh timeout and allow overrides through `OPENAPI_REFRESH_TIMEOUT_MS` or `--refresh-timeout-ms`
- resolve one unified SDK version and pass it to every generator run with `--fixed-sdk-version`
