# Multilanguage Capability Matrix

This matrix is the maintainer-facing view of the current SDK family. It records actual package
names, current maturity, and the boundaries that verification is enforcing today.

## Tier A

Tier A languages are the semantic-SDK reference set:

- TypeScript
- Flutter
- Rust

Tier A means the language is either the current checked-in semantic baseline or the next language
being driven toward that baseline.

## Tier B

Tier B languages are transport-standardized first:

- Java
- C#
- Swift
- Kotlin
- Go
- Python

Tier B means generated transport, naming, docs, and verification are standardized, while the
business-facing semantic layer still lives in a manifest-backed reserved `composed` boundary.
Each Tier B workspace keeps that reserved package boundary version-empty and publishes
`status = reserved` in `.sdkwork-assembly.json` until semantic promotion.

## Matrix

| Language | Tier | Current public package or transport artifact | Primary client status | Generated boundary | Semantic boundary | Current verified state |
| --- | --- | --- | --- | --- | --- | --- |
| TypeScript | Tier A | `@sdkwork/im-sdk` | `ImSdkClient` ships today | `generated/server-openapi`, assembled into `src/generated/**` | root `src/**` outside `src/generated/**` | Root verification passes; TypeScript remains the semantic baseline |
| Flutter | Tier A | `im_sdk` plus generated `im_sdk_generated` | `ImSdkClient` ships today | `generated/server-openapi` | `composed` | Live-schema generation and workspace verification pass |
| Rust | Tier A | generated crate `sdkwork-im-sdk-generated`; semantic target `im_sdk` | `ImSdkClient` target | `generated/server-openapi` | `composed` | Live-schema generation and workspace verification pass |
| Java | Tier B | generated artifact `com.sdkwork:im-sdk-generated` | `ImSdkClient` target only | `generated/server-openapi` | manifest-backed reserved `composed` package | Live-schema generation, workspace verification, and reserved package verification pass |
| C# | Tier B | generated package `Sdkwork.Im.Sdk.Generated` | `ImSdkClient` target only | `generated/server-openapi` | manifest-backed reserved `composed` package | Live-schema generation, workspace verification, and reserved package verification pass |
| Swift | Tier B | generated package `ImSdkGenerated` | `ImSdkClient` target only | `generated/server-openapi` | manifest-backed reserved `composed` package | Live-schema generation, workspace normalization, and reserved package verification pass |
| Kotlin | Tier B | generated artifact `com.sdkwork:im-sdk-generated` | `ImSdkClient` target only | `generated/server-openapi` | manifest-backed reserved `composed` package | Live-schema generation, workspace verification, and reserved package verification pass |
| Go | Tier B | generated module `github.com/sdkwork/im-sdk-generated` | `ImSdkClient` target only | `generated/server-openapi` | manifest-backed reserved `composed` package | Live-schema generation, workspace verification, and reserved package verification pass |
| Python | Tier B | generated package `sdkwork-im-sdk-generated` | `ImSdkClient` target only | `generated/server-openapi` | manifest-backed reserved `composed` package | Live-schema generation, workspace verification, and reserved package verification pass |

## Maintainer Reading Rules

- Read the TypeScript and Flutter public package names as shipped repo contracts today.
- Read Rust as a Tier A target with a verified generated transport crate and reserved semantic
  boundary.
- Read Java, C#, Swift, Kotlin, Go, and Python as verified transport-standardized workspaces with a
  real manifest-backed reserved `composed` package boundary.
- Do not claim a handwritten semantic SDK for a language until the `composed` boundary stops
  reporting empty version plus `status = reserved` and contains the actual public semantic
  entrypoint.

