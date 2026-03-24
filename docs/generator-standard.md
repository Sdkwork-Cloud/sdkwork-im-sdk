# Generator Standard

Generation is delegated to the external SDKWORK Generator located at:

`D:\javasource\spring-ai-plus\spring-ai-plus-business\sdk\sdkwork-sdk-generator`

Wrapper scripts in this repository orchestrate schema preparation, version resolution, generation, and boundary verification.

The wrapper flow is:

1. Ensure the runtime schema URLs are reachable.
2. If the target runtime is unavailable, auto-start the schema-only runtime through `scripts/start-openapi-server.cjs`.
3. The wrapper will fetch the runtime schema from the running server by using `OPENAPI_REFRESH_URL` or the default `${BASE_URL}/im/v3/openapi.json`.
4. Validate that the admin schema is also exported at `${BASE_URL}/admin/im/v3/openapi.json`.
5. Refresh both the authority snapshot and the derived `sdkgen` snapshot from the runtime schema.
6. Resolve one unified SDK version with `resolve-sdk-version.js`.
7. Capture a manual-owned snapshot for the handwritten `adapter-wukongim` and `composed` layers.
8. Generate only into `generated/server-openapi` and pass the resolved version with `--fixed-sdk-version`.
9. Run assembly to refresh machine-readable workspace metadata and the compatibility matrix.
10. Compare the post-generation workspace against the manual-owned snapshot and fail if handwritten layers changed.
11. Stop any temporary schema-only runtime started by the wrapper.

The admin control-plane schema is exported separately at `${BASE_URL}/admin/im/v3/openapi.json` and should only be consumed by admin-oriented tooling, not the app-facing SDK packages. `sdkwork-im-sdk` does not include admin APIs.

Generation is limited to `generated/server-openapi`. The handwritten `adapter-wukongim` and `composed` layers are protected and must remain outside generator-owned output.

Offline fallback is explicit. Use `--skip-fetch` or `SKIP_FETCH=true` only when you intentionally want to bypass runtime schema refresh and rely on the checked-in snapshot.

Each language workspace forwards back to these root wrappers through:

- `bin/sdk-gen.sh`
- `bin/sdk-gen.ps1`
- `bin/sdk-assemble.sh`
- `bin/sdk-assemble.ps1`
