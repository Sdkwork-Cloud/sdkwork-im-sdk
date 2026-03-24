# SDKWork IM SDK OpenAPI Sources

This directory stores the OpenAPI source documents for the `sdkwork-im-sdk` workspace.

Files:

- `openchat-im.openapi.yaml`: authority OpenAPI contract
- `openchat-im.sdkgen.yaml`: SDKWORK Generator compatibility input derived from the authority contract

Rules:

- The authority contract is the source of truth.
- The `sdkgen` document may be normalized for generator compatibility.
- Generated SDKs must never edit either file in place.
- Generation wrappers first ensure runtime schema URLs are available, auto-starting
  `npm run start:openapi` when necessary.
- Generation wrappers then refresh from the frontend IM runtime schema endpoint such as
  `http://localhost:3000/im/v3/openapi.json`.
- The admin control-plane schema is exported separately at
  `http://localhost:3000/admin/im/v3/openapi.json` and is not the default source for app SDK generation.
- Runtime refresh updates both the authority snapshot and the derived `sdkgen` snapshot.
- Offline fallback is explicit through `--skip-fetch` or `SKIP_FETCH=true`.
- The derived `sdkgen` file may contain YAML or JSON-compatible YAML because JSON is a valid YAML subset for the generator path.
