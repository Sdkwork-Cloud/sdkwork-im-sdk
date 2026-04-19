#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { legacyReadmeForbiddenTerms } from './legacy-alias-terms.mjs';
import { resolveSdkworkGeneratorRoot } from './sdk-paths.mjs';
import { verifyLanguageWorkspace } from './verify-language-workspace-shared.mjs';

function fail(message) {
  console.error(`[sdkwork-im-sdk] ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  if (argv.length > 0) {
    fail(`Unknown argument: ${argv[0]}`);
  }
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    stdio: 'inherit',
    shell: false,
    timeout: options.timeoutMs,
  });

  if (result.error) {
    fail(`${options.step || command} failed to start: ${result.error.message}`);
  }
  if (typeof result.status === 'number' && result.status !== 0) {
    fail(`${options.step || command} failed with exit code ${result.status}`);
  }
  if (result.signal) {
    fail(`${options.step || command} terminated with signal ${result.signal}`);
  }
}

parseArgs(process.argv.slice(2));

verifyLanguageWorkspace({
  language: 'typescript',
  workspace: 'sdkwork-im-sdk-typescript',
  primaryClient: 'ImSdkClient',
  maturityTier: 'tier-a',
  requiredPackageLayers: ['generated', 'composed', 'root'],
  readmeRequiredTerms: [
    'sdk.createTextMessage(...)',
    'sdk.send(...)',
    'sdk.uploadAndSendMessage(...)',
    'sdk.decodeMessage(...)',
    'createAiImageGenerationMessage',
    'createAiVideoGenerationMessage',
    'createAgentMessage',
    'sdk.sync.ack(...)',
    'context.ack()',
    'sdk.conversations.createAgentDialog(...)',
    'sdk.conversations.postText(...)',
    'sdk.session.resume(...)',
    'sdk.presence.getPresenceMe()',
    'sdk.realtime.listRealtimeEvents(...)',
    'sdk.device.register(...)',
    'sdk.inbox.getInbox()',
    'sdk.stream.open(...)',
    'sdk.media.uploadAndComplete(...)',
    'sdk.media.attachText(...)',
    'sdk.rtc.postJsonSignal(...)',
    'live.messages.on(...)',
    'live.messages.onConversation(...)',
    'live.data.on(...)',
    'live.signals.on(...)',
    'live.signals.onRtcSession(...)',
    'live.events.on(...)',
    'live.lifecycle.onStateChange(...)',
    'live.lifecycle.onError(...)',
    'live.lifecycle.getState()',
    'rtcMode',
    'signalingStreamId',
    'sdk.rtc.issueParticipantCredential(...)',
    'sdk.rtc.getRecordingArtifact(...)',
    'browser and Node.js',
    '@sdkwork-internal/im-sdk-generated',
    'verify-typescript-workspace-concurrency.mjs',
    'verify-typescript-live-contract.mjs',
    'runtime root exports',
    'dead auth scaffolding',
  ],
  readmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.typescript,
    'live.onMessage(',
    'live.onConversationMessage(',
    'live.onData(',
    'live.onSignal(',
    'live.onRawEvent(',
    'live.onStateChange(',
    'live.onError(',
    'createAiImage(',
    'createAiVideo(',
    'participantIds',
    '`connecting`, `connected`, `error`, and `closed`',
    'sdk.generated.',
  ],
  generatedReadmeRequiredTerms: [
    'Generator-owned TypeScript transport workspace',
    '@sdkwork/im-sdk',
    'ImSdkClient',
    'ImTransportClient',
    'internal-only generated build workspace',
    '@sdkwork-internal/im-sdk-generated',
  ],
  generatedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.typescript,
    '@sdkwork/im-sdk-generated',
    'standalone generated transport package',
    'npm install @sdkwork/im-sdk-generated',
    'Use `@sdkwork/im-sdk-generated` directly',
  ],
  composedReadmeRequiredTerms: [
    'manual-owned authoring source',
    '@sdkwork-internal/im-sdk-generated',
    'assemble-single-package.mjs',
    'live.messages.on(...)',
    'live.events.on(...)',
    'live.lifecycle.onStateChange(...)',
    'live.lifecycle.onError(...)',
  ],
  composedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.typescript,
    '@sdkwork/im-sdk-generated',
    'npm install @sdkwork/im-sdk-generated',
    'Use `@sdkwork/im-sdk-generated` directly',
    'live.onMessage(',
    'live.onRawEvent(',
    'live.onStateChange(',
    'live.onError(',
  ],
  expectedPackageDescriptions: {
    generated: 'Internal generated transport build workspace for the IM TypeScript SDK',
    composed: 'Internal composed authoring workspace for the IM TypeScript SDK',
    root: 'Unified IM SDK package with embedded OpenAPI-generated transport and handwritten realtime/business modules',
  },
  expectedPackageFields: {
    generated: {
      private: true,
    },
    composed: {
      private: true,
      version: '0.1.0',
    },
    root: {
      private: false,
      version: '0.1.0',
    },
  },
  expectedManifestFields: {
    generated: {
      main: './dist/index.cjs',
      module: './dist/index.js',
      types: './dist/index.d.ts',
    },
    composed: {
      main: './dist/index.js',
      module: './dist/index.js',
      types: './dist/index.d.ts',
    },
    root: {
      main: './dist/index.js',
      module: './dist/index.js',
      types: './dist/index.d.ts',
    },
  },
  consumerPackage: {
    layer: 'root',
    name: '@sdkwork/im-sdk',
    packagePath: 'sdkwork-im-sdk-typescript',
    manifestPath: 'sdkwork-im-sdk-typescript/package.json',
    version: '0.1.0',
    description: 'Unified IM SDK package with embedded OpenAPI-generated transport and handwritten realtime/business modules',
    private: false,
  },
});

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');
const generatorRoot = resolveSdkworkGeneratorRoot(workspaceRoot);
const typescriptPackageRoot = path.join(
  workspaceRoot,
  'sdkwork-im-sdk-typescript',
);
const composedTypeScriptPackageRoot = path.join(
  typescriptPackageRoot,
  'composed',
);
const typescriptCompilerCliPath = path.join(
  generatorRoot,
  'node_modules',
  'typescript',
  'bin',
  'tsc',
);
const rootPackageAssemblePath = path.join(
  typescriptPackageRoot,
  'bin',
  'assemble-single-package.mjs',
);
const composedPackageVerifyPath = path.join(
  scriptDir,
  'verify-typescript-composed-package-layout.mjs',
);
const composedPackageTaskPath = path.join(
  composedTypeScriptPackageRoot,
  'bin',
  'package-task.mjs',
);
const typeScriptLiveContractVerifyPath = path.join(
  scriptDir,
  'verify-typescript-live-contract.mjs',
);
const rootPackageVerifyPath = path.join(
  scriptDir,
  'verify-typescript-single-package-layout.mjs',
);
const rootPackageCleanPath = path.join(
  typescriptPackageRoot,
  'bin',
  'clean-dist.mjs',
);
const rootPackageSmokePath = path.join(
  typescriptPackageRoot,
  'test',
  'im-client.test.mjs',
);

run('node', [path.join(scriptDir, 'build-typescript-generated-package.mjs')], {
  cwd: workspaceRoot,
  step: 'typescript:generated-build',
});
run('node', [path.join(scriptDir, 'verify-typescript-generated-package-install-safety.mjs')], {
  cwd: workspaceRoot,
  step: 'typescript:generated-package-install-safety',
});
run('node', [path.join(scriptDir, 'verify-typescript-generated-package.mjs')], {
  cwd: workspaceRoot,
  step: 'typescript:generated-package',
});
run('node', [path.join(scriptDir, 'verify-typescript-generated-package-temp-cleanup.mjs')], {
  cwd: workspaceRoot,
  step: 'typescript:generated-package-temp-cleanup',
});
run('node', [path.join(scriptDir, 'verify-auth-surface-alignment.mjs'), '--language', 'typescript'], {
  cwd: workspaceRoot,
  step: 'typescript:auth-surface',
});
run('node', [path.join(scriptDir, 'verify-typescript-usage-surface.mjs')], {
  cwd: workspaceRoot,
  step: 'typescript:usage-surface',
});
run('node', [path.join(scriptDir, 'verify-typescript-public-api-boundary.mjs')], {
  cwd: workspaceRoot,
  step: 'typescript:public-api-boundary',
});
run('node', [composedPackageVerifyPath], {
  cwd: workspaceRoot,
  step: 'typescript:composed-package-layout',
});
run('node', [composedPackageTaskPath, 'typecheck'], {
  cwd: composedTypeScriptPackageRoot,
  step: 'typescript:composed-typecheck',
});
run('node', [composedPackageTaskPath, 'build'], {
  cwd: composedTypeScriptPackageRoot,
  step: 'typescript:composed-build',
});
run('node', [typeScriptLiveContractVerifyPath, '--package', 'composed'], {
  cwd: workspaceRoot,
  step: 'typescript:composed-live-contract',
});
run('node', [composedPackageTaskPath, 'test'], {
  cwd: composedTypeScriptPackageRoot,
  step: 'typescript:composed-test',
});
run('node', [rootPackageAssemblePath], {
  cwd: workspaceRoot,
  step: 'typescript:single-package-assemble',
});
run('node', [rootPackageVerifyPath], {
  cwd: workspaceRoot,
  step: 'typescript:single-package-layout',
});
run(process.execPath, [typescriptCompilerCliPath, '-p', 'tsconfig.build.json', '--noEmit'], {
  cwd: typescriptPackageRoot,
  step: 'typescript:typecheck',
});
run('node', [rootPackageCleanPath], {
  cwd: typescriptPackageRoot,
  step: 'typescript:clean',
});
run(process.execPath, [typescriptCompilerCliPath, '-p', 'tsconfig.build.json'], {
  cwd: typescriptPackageRoot,
  step: 'typescript:build',
});
run('node', [typeScriptLiveContractVerifyPath, '--package', 'root'], {
  cwd: workspaceRoot,
  step: 'typescript:live-contract',
});
run('node', [rootPackageSmokePath], {
  cwd: typescriptPackageRoot,
  step: 'typescript:test',
});
run('node', [path.join(scriptDir, 'verify-typescript-single-package-publishability.mjs')], {
  cwd: workspaceRoot,
  step: 'typescript:single-package-publishability',
});

