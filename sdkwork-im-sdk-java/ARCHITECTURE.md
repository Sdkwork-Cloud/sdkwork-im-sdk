# Java Workspace Architecture

The Java workspace is generator-first.

- `generated/server-openapi` is the only code layer in this workspace today.
- Realtime composition is not implemented here; future expansion must remain outside `generated/server-openapi`.
