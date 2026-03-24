#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
"${WORKSPACE_DIR}/sdkwork-im-sdk-swift/bin/sdk-assemble.sh" "$@"
