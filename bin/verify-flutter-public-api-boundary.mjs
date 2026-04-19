#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  finishFileExpectationVerification,
  readWorkspaceSource,
  readWorkspaceSources,
} from '../../workspace-file-expectation-shared.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');
const flutterComposedRoot = path.join(
  workspaceRoot,
  'sdkwork-im-sdk-flutter',
  'composed',
  'lib',
);
const flutterGeneratedPublicEntrypoint = path.join(
  workspaceRoot,
  'sdkwork-im-sdk-flutter',
  'generated',
  'server-openapi',
  'lib',
  'im_sdk_generated.dart',
);
const removedFlutterGenericClientPattern = new RegExp(`class ${['Im', 'Client'].join('')}\\s*\\{`);

const files = [
  'im_sdk.dart',
  'src/auth_module.dart',
  'src/builders.dart',
  'src/conversations_module.dart',
  'src/device_module.dart',
  'src/inbox_module.dart',
  'src/media_module.dart',
  'src/messages_module.dart',
  'src/portal_module.dart',
  'src/presence_module.dart',
  'src/realtime_module.dart',
  'src/rtc_module.dart',
  'src/session_module.dart',
  'src/streams_module.dart',
  'src/types.dart',
];

const failures = [];
const { generatedPublicSource, flutterEntrypointSource, flutterTypesSource } = readWorkspaceSources({
  workspaceRoot,
  files: {
    generatedPublicSource: path.join(
      'sdkwork-im-sdk-flutter',
      'generated',
      'server-openapi',
      'lib',
      'im_sdk_generated.dart',
    ),
    flutterEntrypointSource: path.join(
      'sdkwork-im-sdk-flutter',
      'composed',
      'lib',
      'im_sdk.dart',
    ),
    flutterTypesSource: path.join(
      'sdkwork-im-sdk-flutter',
      'composed',
      'lib',
      'src',
      'types.dart',
    ),
  },
});

if (!generatedPublicSource.includes("export 'src/models.dart';")) {
  failures.push('generated/server-openapi/lib/im_sdk_generated.dart must publicly export src/models.dart.');
}
if (!generatedPublicSource.includes("export 'transport_client.dart';")) {
  failures.push('generated/server-openapi/lib/im_sdk_generated.dart must publicly export transport_client.dart.');
}
if (!/class ImSdkClient\s*\{/.test(flutterEntrypointSource)) {
  failures.push('composed/lib/im_sdk.dart must define ImSdkClient.');
}
if (!/class ImSdkClientOptions\s*\{/.test(flutterTypesSource)) {
  failures.push('composed/lib/src/types.dart must define ImSdkClientOptions.');
}
if (removedFlutterGenericClientPattern.test(flutterEntrypointSource)) {
  failures.push('composed/lib/im_sdk.dart must not keep the removed generic client name.');
}

for (const relativePath of files) {
  const source = readWorkspaceSource({
    workspaceRoot: flutterComposedRoot,
    relativePath,
  });
  if (source.includes("package:im_sdk_generated/src/")) {
    failures.push(`${relativePath} imports or exports im_sdk_generated private src paths.`);
  }
}

finishFileExpectationVerification({
  prefix: 'sdkwork-im-sdk',
  failures,
  failureHeader: 'Flutter public API boundary verification failed:',
  successMessage: '[sdkwork-im-sdk] Flutter public API boundary verification passed.',
});
