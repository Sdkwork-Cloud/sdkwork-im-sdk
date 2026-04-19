#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  collectWorkspaceFiles,
  finishFileExpectationVerification,
  readWorkspaceSource,
  readWorkspaceSources,
  workspacePathExists,
} from '../../workspace-file-expectation-shared.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');
const typescriptRoot = path.join(workspaceRoot, 'sdkwork-im-sdk-typescript');
const composedSourceRoot = path.join(typescriptRoot, 'composed', 'src');

const failures = [];
if (!workspacePathExists({ workspaceRoot: composedSourceRoot, relativePath: 'index.ts' })) {
  failures.push('composed/src/index.ts must exist.');
}
if (!workspacePathExists({ workspaceRoot: composedSourceRoot, relativePath: 'sdk.ts' })) {
  failures.push('composed/src/sdk.ts must exist.');
}
if (!workspacePathExists({ workspaceRoot: composedSourceRoot, relativePath: 'generated-client-types.ts' })) {
  failures.push('composed/src/generated-client-types.ts must exist as the single generated type bridge.');
} else {
  const { bridgeSource } = readWorkspaceSources({
    workspaceRoot: composedSourceRoot,
    files: {
      bridgeSource: 'generated-client-types.ts',
    },
  });

  if (bridgeSource.includes('generated/server-openapi/src/')) {
    failures.push(
      'composed/src/generated-client-types.ts must not bridge generated private source paths.',
    );
  }

  if (!bridgeSource.includes("from '#generated-sdk'")) {
    failures.push(
      'composed/src/generated-client-types.ts must bridge generated types from the internal #generated-sdk alias.',
    );
  }
}

if (workspacePathExists({ workspaceRoot: composedSourceRoot, relativePath: 'index.ts' })) {
  const indexSource = readWorkspaceSource({ workspaceRoot: composedSourceRoot, relativePath: 'index.ts' });
  if (!indexSource.includes('ImSdkClient')) {
    failures.push('composed/src/index.ts must export ImSdkClient.');
  }
}

if (workspacePathExists({ workspaceRoot: composedSourceRoot, relativePath: 'sdk.ts' })) {
  const sdkSource = readWorkspaceSource({ workspaceRoot: composedSourceRoot, relativePath: 'sdk.ts' });
  if (!sdkSource.includes('export class ImSdkClient')) {
    failures.push('composed/src/sdk.ts must define ImSdkClient.');
  }
}

for (const relativePath of collectWorkspaceFiles({
  workspaceRoot: composedSourceRoot,
  include: ({ relativePath: currentRelativePath, entry }) =>
    entry.isFile() && currentRelativePath.endsWith('.ts'),
})) {
  const source = readWorkspaceSource({ workspaceRoot: composedSourceRoot, relativePath });
  const matches = source.match(/generated\/server-openapi\/src\/[^\s'"`]+/g) || [];

  for (const matchedImportPath of matches) {
    failures.push(
      `${relativePath} imports or exports generated TypeScript private source path "${matchedImportPath}".`,
    );
  }

  if (source.includes('@sdkwork/im-sdk-generated')) {
    failures.push(`${relativePath} must not reference the unsupported @sdkwork/im-sdk-generated package identity.`);
  }

  if (source.includes('@sdkwork/sdk-common')) {
    failures.push(`${relativePath} must not import @sdkwork/sdk-common directly; consume generated types through the internal bridge.`);
  }

  if (relativePath === 'types.ts' && !source.includes("from './generated-client-types.js'")) {
    failures.push('types.ts must source generated client types through ./generated-client-types.js.');
  }

  if (relativePath === 'types.ts') {
    const liveConnectionBlockMatch = source.match(
      /export interface ImLiveConnection \{([\s\S]*?)\n\}/,
    );

    if (!liveConnectionBlockMatch) {
      failures.push('types.ts must define export interface ImLiveConnection.');
    } else {
      const liveConnectionBlock = liveConnectionBlockMatch[1];
      for (const legacySignature of [
        'onMessage(',
        'onConversationMessage(',
        'onData(',
        'onSignal(',
        'onRawEvent(',
        'onStateChange(',
        'onError(',
      ]) {
        if (liveConnectionBlock.includes(legacySignature)) {
          failures.push(
            `types.ts must not expose legacy live flat callbacks on ImLiveConnection: ${legacySignature}`,
          );
        }
      }
    }
  }
}

finishFileExpectationVerification({
  prefix: 'sdkwork-im-sdk',
  failures,
  failureHeader: 'TypeScript public API boundary verification failed:',
  successMessage: '[sdkwork-im-sdk] TypeScript public API boundary verification passed.',
});

