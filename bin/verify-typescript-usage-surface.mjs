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
const packageRoot = path.join(
  workspaceRoot,
  'sdkwork-im-sdk-typescript',
);

const { typesSource, sdkContextSource, readmeSource } = readWorkspaceSources({
  workspaceRoot: packageRoot,
  files: {
    typesSource: path.join('src', 'types.ts'),
    sdkContextSource: path.join('src', 'sdk-context.ts'),
    readmeSource: 'README.md',
  },
});
const publicOptionsDeclarationMatch = typesSource.match(
  /export interface ImSdkClientOptions \{([\s\S]*?)\n\}/,
);
const publicOptionsSource = publicOptionsDeclarationMatch?.[0] || '';

const expectations = [
  {
    description: 'public constructor options expose flat baseUrl',
    pattern: /baseUrl\??:\s*string;/,
    source: publicOptionsSource,
  },
  {
    description: 'public constructor options expose flat apiBaseUrl',
    pattern: /apiBaseUrl\??:\s*string;/,
    source: publicOptionsSource,
  },
  {
    description: 'public constructor options expose flat websocketBaseUrl',
    pattern: /websocketBaseUrl\??:\s*string;/,
    source: publicOptionsSource,
  },
  {
    description: 'public constructor options expose flat authToken',
    pattern: /authToken\??:\s*string;/,
    source: publicOptionsSource,
  },
  {
    description: 'public constructor options expose tokenProvider',
    pattern: /tokenProvider\??:\s*ImTokenProvider;/,
    source: publicOptionsSource,
  },
  {
    description: 'public constructor options expose webSocketFactory',
    pattern: /webSocketFactory\??:\s*ImWebSocketFactory;/,
    source: publicOptionsSource,
  },
  {
    description: 'public constructor options do not expose generatedConfig',
    pattern: /generatedConfig\??:/,
    source: publicOptionsSource,
    negate: true,
  },
  {
    description: 'public constructor options do not expose generated transport tuning fields',
    pattern: /headers\??:|timeout\??:/,
    source: publicOptionsSource,
    negate: true,
  },
  {
    description: 'generated client resolution accepts flat constructor options',
    pattern: /const apiBaseUrl = firstDefinedString\(\s*options\.apiBaseUrl,\s*options\.baseUrl,\s*\);[\s\S]*const authToken = firstDefinedString\(options\.authToken\);/,
    source: sdkContextSource,
  },
  {
    description: 'generated client resolution does not read generatedConfig from public constructor options',
    pattern: /options\.generatedConfig/,
    source: sdkContextSource,
    negate: true,
  },
  {
    description: 'README uses constructor-based flat client options',
    pattern: /new ImSdkClient\(\{\s*baseUrl:/,
    source: readmeSource,
  },
  {
    description: 'README does not document generatedConfig as public consumer API',
    pattern: /generatedConfig/,
    source: readmeSource,
    negate: true,
  },
  {
    description: 'README documents the upload helper',
    pattern: /sdk\.upload\(/,
    source: readmeSource,
  },
  {
    description: 'README explains ImUploadedMediaAsset',
    pattern: /ImUploadedMediaAsset/,
    source: readmeSource,
  },
];

const failures = collectExpectationFailures(expectations);
finishFileExpectationVerification({
  prefix: 'sdkwork-im-sdk',
  failures,
  failureHeader: 'TypeScript usage surface verification failed:',
  successMessage: '[sdkwork-im-sdk] TypeScript usage surface verification passed.',
});
