#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  collectExpectationFailures,
  finishFileExpectationVerification,
  readWorkspaceSources,
} from '../../workspace-file-expectation-shared.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');
const composedRoot = path.join(
  workspaceRoot,
  'sdkwork-im-sdk-flutter',
  'composed',
);

const { sdkSource, typesSource, readmeSource } = readWorkspaceSources({
  workspaceRoot: composedRoot,
  files: {
    sdkSource: path.join('lib', 'im_sdk.dart'),
    typesSource: path.join('lib', 'src', 'types.dart'),
    readmeSource: 'README.md',
  },
});

const expectations = [
  {
    description: 'public client uses package-aligned ImSdkClient naming',
    pattern: /class ImSdkClient\s*\{/,
    source: sdkSource,
  },
  {
    description: 'sdk options use ImSdkClientOptions naming',
    pattern: /class ImSdkClientOptions\s*\{/,
    source: typesSource,
  },
  {
    description: 'create exposes flat baseUrl',
    pattern: /factory ImSdkClient\.create\(\{[\s\S]*String\?\s+baseUrl,/,
    source: sdkSource,
  },
  {
    description: 'create exposes flat authToken',
    pattern: /factory ImSdkClient\.create\(\{[\s\S]*String\?\s+authToken,/,
    source: sdkSource,
  },
  {
    description: 'create exposes flat headers',
    pattern: /factory ImSdkClient\.create\(\{[\s\S]*Map<String,\s*String>\?\s+headers,/,
    source: sdkSource,
  },
  {
    description: 'create exposes flat timeout',
    pattern: /factory ImSdkClient\.create\(\{[\s\S]*int\s+timeout\s*=\s*30000,/,
    source: sdkSource,
  },
  {
    description: 'create does not expose generatedConfig',
    pattern: /factory ImSdkClient\.create\(\{[\s\S]*ImGeneratedConfig\?\s+generatedConfig,/,
    source: sdkSource,
    negate: true,
  },
  {
    description: 'README uses package-aligned ImSdkClient naming',
    pattern: /ImSdkClient/,
    source: readmeSource,
  },
  {
    description: 'README uses flat create options',
    pattern: /ImSdkClient\.create\(\s*baseUrl:/,
    source: readmeSource,
  },
  {
    description: 'README documents the upload helper',
    pattern: /sdk\.media\.upload\(/,
    source: readmeSource,
  },
  {
    description: 'README documents MediaUploadMutationResponse',
    pattern: /MediaUploadMutationResponse/,
    source: readmeSource,
  },
  {
    description: 'README does not document generatedConfig as public consumer API',
    pattern: /generatedConfig/,
    source: readmeSource,
    negate: true,
  },
  {
    description: 'factory error message does not mention generatedConfig',
    pattern: /baseUrl\/generatedConfig/,
    source: sdkSource,
    negate: true,
  },
];

const failures = collectExpectationFailures(expectations);
finishFileExpectationVerification({
  prefix: 'sdkwork-im-sdk',
  failures,
  failureHeader: 'Flutter usage surface verification failed:',
  successMessage: '[sdkwork-im-sdk] Flutter usage surface verification passed.',
});
