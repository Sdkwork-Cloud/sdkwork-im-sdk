#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  escapeRegExp,
  legacyAliasTerms,
  legacyGeneratedClientTerms,
} from './legacy-alias-terms.mjs';

const removedLegacyGeneratedNamespaceRelativeRoot = [
  'com',
  'sdkwork',
  ['cr', 'aw'].join(''),
  ['ch', 'at'].join(''),
  ['gen', 'erated'].join(''),
].join('/');
const EXPECTED_GENERATED_PACKAGE_NAME_BY_LANGUAGE = {
  typescript: '@sdkwork-internal/im-sdk-generated',
  flutter: 'im_sdk_generated',
  rust: 'sdkwork-im-sdk-generated',
  java: 'com.sdkwork:im-sdk-generated',
  csharp: 'Sdkwork.Im.Sdk.Generated',
  swift: 'ImSdkGenerated',
  kotlin: 'com.sdkwork:im-sdk-generated',
  go: 'github.com/sdkwork/im-sdk-generated',
  python: 'sdkwork-im-sdk-generated',
};
const GENERATED_ROOT_BY_LANGUAGE = {
  typescript: 'sdkwork-im-sdk-typescript/generated/server-openapi',
  flutter: 'sdkwork-im-sdk-flutter/generated/server-openapi',
  rust: 'sdkwork-im-sdk-rust/generated/server-openapi',
  java: 'sdkwork-im-sdk-java/generated/server-openapi',
  csharp: 'sdkwork-im-sdk-csharp/generated/server-openapi',
  swift: 'sdkwork-im-sdk-swift/generated/server-openapi',
  kotlin: 'sdkwork-im-sdk-kotlin/generated/server-openapi',
  go: 'sdkwork-im-sdk-go/generated/server-openapi',
  python: 'sdkwork-im-sdk-python/generated/server-openapi',
};
const LEGACY_GENERATED_PACKAGE_NAMES = [
  legacyAliasTerms.typescriptPackage,
  legacyAliasTerms.hyphenPackage,
];
const legacyGeneratedClientInstancePattern = new RegExp(
  `\\b${escapeRegExp(legacyGeneratedClientTerms.instanceToken)}\\b`,
);
const legacyGeneratedClientClassOrInstancePattern = new RegExp(
  `\\b${escapeRegExp(legacyGeneratedClientTerms.instanceToken)}\\b|\\b${escapeRegExp(legacyGeneratedClientTerms.clientClass)}\\b`,
);
const legacyGeneratedClientContextPattern = new RegExp(
  `\\b${escapeRegExp(legacyGeneratedClientTerms.clientLike)}\\b|\\b${escapeRegExp(legacyGeneratedClientTerms.instanceToken)}\\b|\\b${escapeRegExp(legacyGeneratedClientTerms.factory)}\\b`,
);
const legacyGeneratedClientReadmePattern = new RegExp(
  `\\b${escapeRegExp(legacyGeneratedClientTerms.clientClass)}\\b|\\b${escapeRegExp(legacyGeneratedClientTerms.factory)}\\b|the root package also re-exports the generated transport surface`,
);

function fail(message) {
  console.error(`[sdkwork-im-sdk] ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const parsed = {
    languages: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (current === '--language') {
      const value = (argv[index + 1] || '').trim().toLowerCase();
      if (!value) {
        fail('Missing value for --language');
      }
      parsed.languages.push(value);
      index += 1;
      continue;
    }
    fail(`Unknown argument: ${current}`);
  }

  return parsed;
}

function read(relativePath) {
  return readFileSync(path.join(workspaceRoot, relativePath), 'utf8');
}

function readIfExists(relativePath, failures, missingMessage) {
  const absolutePath = path.join(workspaceRoot, relativePath);
  if (!existsSync(absolutePath)) {
    failures.push(missingMessage);
    return null;
  }
  return readFileSync(absolutePath, 'utf8');
}

function assertAbsent(failures, source, pattern, message) {
  if (pattern.test(source)) {
    failures.push(message);
  }
}

function assertPresent(failures, source, pattern, message) {
  if (!pattern.test(source)) {
    failures.push(message);
  }
}

function assertExactValues(failures, actualValues, expectedValues, message) {
  const actual = [...actualValues].sort();
  const expected = [...expectedValues].sort();
  if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
    failures.push(
      `${message} Expected [${expected.join(', ')}] but found [${actual.join(', ')}].`,
    );
  }
}

const args = parseArgs(process.argv.slice(2));
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const workspaceRoot = path.resolve(scriptDir, '..');
const languageSet = new Set(
  args.languages.length > 0
    ? args.languages
    : ['typescript', 'flutter', 'rust', 'java', 'csharp', 'swift', 'kotlin', 'go', 'python'],
);

for (const language of languageSet) {
  if (!['typescript', 'flutter', 'rust', 'java', 'csharp', 'swift', 'kotlin', 'go', 'python'].includes(language)) {
    fail(`Unsupported language: ${language}`);
  }
}

function parseJsonOrFail(failures, relativePath, source, label) {
  try {
    return JSON.parse(source);
  } catch (error) {
    failures.push(
      `${label} must be valid JSON: ${relativePath} (${error instanceof Error ? error.message : String(error)}).`,
    );
    return null;
  }
}

function assertGeneratedMetadataPackageName(failures, language) {
  const expectedPackageName = EXPECTED_GENERATED_PACKAGE_NAME_BY_LANGUAGE[language];
  const generatedRoot = GENERATED_ROOT_BY_LANGUAGE[language];
  if (!expectedPackageName || !generatedRoot) {
    failures.push(`Missing generated metadata package expectation for ${language}.`);
    return;
  }

  const metadataTargets = [
    {
      relativePath: `${generatedRoot}/sdkwork-sdk.json`,
      label: `${language} generated sdkwork-sdk metadata`,
      extractor: (json) => json?.packageName,
    },
    {
      relativePath: `${generatedRoot}/.sdkwork/sdkwork-generator-changes.json`,
      label: `${language} generated change manifest`,
      extractor: (json) => json?.sdk?.packageName,
    },
    {
      relativePath: `${generatedRoot}/.sdkwork/sdkwork-generator-manifest.json`,
      label: `${language} generated manifest`,
      extractor: (json) => json?.sdk?.packageName,
    },
    {
      relativePath: `${generatedRoot}/.sdkwork/sdkwork-generator-report.json`,
      label: `${language} generated report`,
      extractor: (json) => json?.sdk?.packageName,
    },
  ];

  for (const metadataTarget of metadataTargets) {
    const source = readIfExists(
      metadataTarget.relativePath,
      failures,
      `${metadataTarget.label} is missing: ${metadataTarget.relativePath}.`,
    );
    if (!source) {
      continue;
    }
    const parsed = parseJsonOrFail(failures, metadataTarget.relativePath, source, metadataTarget.label);
    if (!parsed) {
      continue;
    }

    const actualPackageName = metadataTarget.extractor(parsed);
    if (actualPackageName !== expectedPackageName) {
      failures.push(
        `${metadataTarget.label} must use packageName ${expectedPackageName}. Found ${String(actualPackageName)}.`,
      );
    }
    for (const legacyPackageName of LEGACY_GENERATED_PACKAGE_NAMES) {
      if (source.includes(legacyPackageName)) {
        failures.push(
          `${metadataTarget.label} must not retain legacy package name ${legacyPackageName}.`,
        );
      }
    }
  }
}

function assertPathMissing(failures, relativePath, message) {
  if (existsSync(path.join(workspaceRoot, relativePath))) {
    failures.push(message);
  }
}

const failures = [];

for (const language of languageSet) {
  assertGeneratedMetadataPackageName(failures, language);
}

if (languageSet.has('typescript')) {
  const expectedGeneratedRuntimeExports = [
    'AuthApi',
    'BaseApi',
    'ConversationApi',
    'DEFAULT_TIMEOUT',
    'DeviceApi',
    'InboxApi',
    'MediaApi',
    'MessageApi',
    'PortalApi',
    'PresenceApi',
    'RealtimeApi',
    'RtcApi',
    'SUCCESS_CODES',
    'ImTransportClient',
    'SessionApi',
    'StreamApi',
    'apiPath',
    'createAuthApi',
    'createTransportClient',
    'createConversationApi',
    'createDeviceApi',
    'createInboxApi',
    'createMediaApi',
    'createMessageApi',
    'createPortalApi',
    'createPresenceApi',
    'createRealtimeApi',
    'createRtcApi',
    'createSessionApi',
    'createStreamApi',
  ];
  const generatedIndexSource = read('sdkwork-im-sdk-typescript/generated/server-openapi/src/index.ts');
  const generatedSdkSource = read('sdkwork-im-sdk-typescript/generated/server-openapi/src/sdk.ts');
  const generatedHttpClientSource = read(
    'sdkwork-im-sdk-typescript/generated/server-openapi/src/http/client.ts',
  );
  const generatedCommonTypesSource = read(
    'sdkwork-im-sdk-typescript/generated/server-openapi/src/types/common.ts',
  );
  const generatedReadmeSource = read('sdkwork-im-sdk-typescript/generated/server-openapi/README.md');
  const generatedDistIndexTypesPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'dist',
    'index.d.ts',
  );
  const generatedDistSdkTypesPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'dist',
    'sdk.d.ts',
  );
  const generatedDistCommonTypesPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'dist',
    'types',
    'common.d.ts',
  );
  const generatedDistHttpClientTypesPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'dist',
    'http',
    'client.d.ts',
  );
  const generatedDistRuntimeIndexPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'dist',
    'index.cjs',
  );
  const generatedDistRuntimeEsmPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'dist',
    'index.js',
  );
  const generatedSourceRuntimeEsmPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'src',
    'index.js',
  );
  const generatedSourceRuntimeTypesPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'src',
    'index.d.ts',
  );
  const generatedSourceAuthIndexPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'src',
    'auth',
    'index.ts',
  );
  const generatedDistAuthIndexTypesPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'dist',
    'auth',
    'index.d.ts',
  );
  const generatedPackageJsonPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
    'package.json',
  );
  const composedSdkSource = read('sdkwork-im-sdk-typescript/composed/src/sdk.ts');
  const composedContextSource = read('sdkwork-im-sdk-typescript/composed/src/sdk-context.ts');
  const composedTypesSource = read('sdkwork-im-sdk-typescript/composed/src/types.ts');
  const composedShimPath = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'composed',
    'src',
    'shims-sdk-common.d.ts',
  );

  assertAbsent(
    failures,
    generatedIndexSource,
    /export \* from '\.\/http';/,
    'TypeScript generated root entrypoint must not re-export ./http.',
  );
  assertAbsent(
    failures,
    generatedIndexSource,
    /export \* from '\.\/auth';/,
    'TypeScript generated root entrypoint must not re-export ./auth.',
  );
  if (existsSync(generatedSourceRuntimeEsmPath)) {
    failures.push('TypeScript generated source tree must not contain src/index.js build residue.');
  }
  if (existsSync(generatedSourceRuntimeTypesPath)) {
    failures.push('TypeScript generated source tree must not contain src/index.d.ts build residue.');
  }
  if (existsSync(generatedSourceAuthIndexPath)) {
    failures.push('TypeScript generated source tree must not contain src/auth/index.ts dead auth module.');
  }
  assertAbsent(
    failures,
    generatedSdkSource,
    /\bsetApiKey\s*\(/,
    'TypeScript generated client must not expose setApiKey(...).',
  );
  assertAbsent(
    failures,
    generatedSdkSource,
    /\bsetAccessToken\s*\(/,
    'TypeScript generated client must not expose setAccessToken(...).',
  );
  assertAbsent(
    failures,
    generatedSdkSource,
    /\bget http\s*\(/,
    'TypeScript generated client must not expose the raw http getter.',
  );
  assertPresent(
    failures,
    generatedSdkSource,
    /\bpublic readonly auth:\s*AuthApi;/,
    'TypeScript generated client must expose auth API wiring.',
  );
  assertPresent(
    failures,
    generatedSdkSource,
    /\bpublic readonly portal:\s*PortalApi;/,
    'TypeScript generated client must expose portal API wiring.',
  );
  assertPresent(
    failures,
    generatedSdkSource,
    /\bthis\.auth = createAuthApi\(this\.httpClient\);/,
    'TypeScript generated client must construct auth API from the shared http client.',
  );
  assertPresent(
    failures,
    generatedSdkSource,
    /\bthis\.portal = createPortalApi\(this\.httpClient\);/,
    'TypeScript generated client must construct portal API from the shared http client.',
  );
  assertPresent(
    failures,
    generatedSdkSource,
    /\bsetAuthToken\s*\(/,
    'TypeScript generated client must expose setAuthToken(...).',
  );
  assertAbsent(
    failures,
    generatedHttpClientSource,
    /\bsetApiKey\s*\(/,
    'TypeScript generated http client must not define setApiKey(...).',
  );
  assertAbsent(
    failures,
    generatedHttpClientSource,
    /\bsetAccessToken\s*\(/,
    'TypeScript generated http client must not define setAccessToken(...).',
  );
  assertAbsent(
    failures,
    generatedHttpClientSource,
    /\bAPI_KEY_HEADER\b|\bAPI_KEY_USE_BEARER\b|Access-Token|authMode|apiKey/,
    'TypeScript generated http client must stay bearer-only internally.',
  );
  assertPresent(
    failures,
    generatedHttpClientSource,
    /\bsetAuthToken\s*\(/,
    'TypeScript generated http client must define setAuthToken(...).',
  );
  assertAbsent(
    failures,
    generatedCommonTypesSource,
    /\bapiKey\?:/,
    'TypeScript generated config must not expose apiKey.',
  );
  assertAbsent(
    failures,
    generatedCommonTypesSource,
    /\baccessToken\?:/,
    'TypeScript generated config must not expose accessToken.',
  );
  assertAbsent(
    failures,
    generatedCommonTypesSource,
    /\bauthMode\?:/,
    'TypeScript generated config must not expose authMode.',
  );
  assertPresent(
    failures,
    generatedCommonTypesSource,
    /\bauthToken\?:/,
    'TypeScript generated config must expose authToken.',
  );
  assertAbsent(
    failures,
    generatedReadmeSource,
    /Mode A: API Key|Mode B: Dual Token|setApiKey|setAccessToken|Access-Token/,
    'TypeScript generated README must not document API key or dual-token auth flows.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /setAuthToken/,
    'TypeScript generated README must document bearer auth through setAuthToken(...).',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /Generator-owned TypeScript transport workspace/,
    'TypeScript generated README must identify the generated workspace as a generator-owned TypeScript transport workspace.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /internal-only generated build workspace/,
    'TypeScript generated README must describe the workspace as internal-only generated build workspace.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /Internal generator subpaths are not part of the supported public API\./,
    'TypeScript generated README must forbid internal generator subpaths as public API.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /\bImTransportClient\b/,
    'TypeScript generated README must document the internal transport client name ImTransportClient.',
  );
  assertAbsent(
    failures,
    generatedReadmeSource,
    legacyGeneratedClientReadmePattern,
    'TypeScript generated README must not document removed generated-surface aliases.',
  );
  assertAbsent(
    failures,
    generatedReadmeSource,
    /@sdkwork\/im-sdk-generated|standalone generated transport package|npm install @sdkwork\/im-sdk-generated/,
    'TypeScript generated README must not describe the unsupported public-looking generated package identity.',
  );
  if (existsSync(generatedDistIndexTypesPath)) {
    const generatedDistIndexTypesSource = readFileSync(generatedDistIndexTypesPath, 'utf8');
    assertAbsent(
      failures,
      generatedDistIndexTypesSource,
      /export \* from '\.\/http';/,
      'TypeScript generated dist/index.d.ts must not re-export ./http.',
    );
    assertAbsent(
      failures,
      generatedDistIndexTypesSource,
      /export \* from '\.\/auth';/,
      'TypeScript generated dist/index.d.ts must not re-export ./auth.',
    );
  }
  if (existsSync(generatedDistSdkTypesPath)) {
    const generatedDistSdkTypesSource = readFileSync(generatedDistSdkTypesPath, 'utf8');
    assertAbsent(
      failures,
      generatedDistSdkTypesSource,
      /\bsetApiKey\s*\(/,
      'TypeScript generated dist/sdk.d.ts must not expose setApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedDistSdkTypesSource,
      /\bsetAccessToken\s*\(/,
      'TypeScript generated dist/sdk.d.ts must not expose setAccessToken(...).',
    );
    assertAbsent(
      failures,
      generatedDistSdkTypesSource,
      /\bget http\s*\(/,
      'TypeScript generated dist/sdk.d.ts must not expose the raw http getter.',
    );
    assertPresent(
      failures,
      generatedDistSdkTypesSource,
      /\bsetAuthToken\s*\(/,
      'TypeScript generated dist/sdk.d.ts must expose setAuthToken(...).',
    );
  }
  if (existsSync(generatedDistCommonTypesPath)) {
    const generatedDistCommonTypesSource = readFileSync(generatedDistCommonTypesPath, 'utf8');
    assertAbsent(
      failures,
      generatedDistCommonTypesSource,
      /\bapiKey\?:/,
      'TypeScript generated dist/types/common.d.ts must not expose apiKey.',
    );
    assertAbsent(
      failures,
      generatedDistCommonTypesSource,
      /\baccessToken\?:/,
      'TypeScript generated dist/types/common.d.ts must not expose accessToken.',
    );
    assertAbsent(
      failures,
      generatedDistCommonTypesSource,
      /\bauthMode\?:/,
      'TypeScript generated dist/types/common.d.ts must not expose authMode.',
    );
    assertPresent(
      failures,
      generatedDistCommonTypesSource,
      /\bauthToken\?:/,
      'TypeScript generated dist/types/common.d.ts must expose authToken.',
    );
  }
  if (existsSync(generatedDistHttpClientTypesPath)) {
    const generatedDistHttpClientTypesSource = readFileSync(generatedDistHttpClientTypesPath, 'utf8');
    assertAbsent(
      failures,
      generatedDistHttpClientTypesSource,
      /\bsetApiKey\s*\(/,
      'TypeScript generated dist/http/client.d.ts must not expose setApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedDistHttpClientTypesSource,
      /\bsetAccessToken\s*\(/,
      'TypeScript generated dist/http/client.d.ts must not expose setAccessToken(...).',
    );
    assertPresent(
      failures,
      generatedDistHttpClientTypesSource,
      /\bsetAuthToken\s*\(/,
      'TypeScript generated dist/http/client.d.ts must expose setAuthToken(...).',
    );
  }
  if (existsSync(generatedDistRuntimeIndexPath)) {
    const generatedDistRuntimeIndexSource = readFileSync(generatedDistRuntimeIndexPath, 'utf8');
    assertAbsent(
      failures,
      generatedDistRuntimeIndexSource,
      /\bsetApiKey\s*\(/,
      'TypeScript generated dist/index.cjs must not contain setApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedDistRuntimeIndexSource,
      /\bsetAccessToken\s*\(/,
      'TypeScript generated dist/index.cjs must not contain setAccessToken(...).',
    );
    try {
      const generatedDistRuntimeCjs = require(generatedDistRuntimeIndexPath);
      assertExactValues(
        failures,
        Object.keys(generatedDistRuntimeCjs),
        expectedGeneratedRuntimeExports,
        'TypeScript generated CommonJS root export set drifted.',
      );
    } catch (error) {
      failures.push(
        `TypeScript generated CommonJS root runtime import failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
  if (existsSync(generatedDistRuntimeEsmPath)) {
    try {
      const generatedDistRuntimeEsm = await import(pathToFileURL(generatedDistRuntimeEsmPath).href);
      assertExactValues(
        failures,
        Object.keys(generatedDistRuntimeEsm),
        expectedGeneratedRuntimeExports,
        'TypeScript generated ESM root export set drifted.',
      );
    } catch (error) {
      failures.push(
        `TypeScript generated ESM root runtime import failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
  if (existsSync(generatedDistAuthIndexTypesPath)) {
    const generatedDistAuthIndexTypesSource = readFileSync(generatedDistAuthIndexTypesPath, 'utf8');
    assertAbsent(
      failures,
      generatedDistAuthIndexTypesSource,
      /\bAuthMode\b/,
      'TypeScript generated dist/auth/index.d.ts must not re-export AuthMode.',
    );
    failures.push('TypeScript generated dist/auth/index.d.ts must not exist.');
  }
  if (existsSync(generatedPackageJsonPath)) {
    const generatedPackageJson = JSON.parse(readFileSync(generatedPackageJsonPath, 'utf8'));
    assertExactValues(
      failures,
      Object.keys(generatedPackageJson.exports || {}),
      ['.'],
      'TypeScript generated package exports map must only expose the root entrypoint.',
    );
  }
  assertAbsent(
    failures,
    composedSdkSource,
    /\bsetApiKey\s*\(/,
    'TypeScript composed client must not expose setApiKey(...).',
  );
  assertAbsent(
    failures,
    composedSdkSource,
    /\bsetAccessToken\s*\(/,
    'TypeScript composed client must not expose setAccessToken(...).',
  );
  assertAbsent(
    failures,
    composedSdkSource,
    /\bsetAuthToken\s*\(/,
    'TypeScript composed client must not expose root-level setAuthToken(...); auth must live under sdk.auth.',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\breadonly auth:/,
    'TypeScript composed client must expose an auth domain module.',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\bconnect\s*\(/,
    'TypeScript composed client must expose connect(...) as the live runtime entrypoint.',
  );
  assertAbsent(
    failures,
    composedSdkSource,
    legacyGeneratedClientInstancePattern,
    'TypeScript composed client must not retain legacy generated-client instance naming internally.',
  );
  assertAbsent(
    failures,
    composedContextSource,
    /\bsetApiKey\s*\(/,
    'TypeScript composed context must not proxy setApiKey(...).',
  );
  assertAbsent(
    failures,
    composedContextSource,
    /\bsetAccessToken\s*\(/,
    'TypeScript composed context must not proxy setAccessToken(...).',
  );
  assertAbsent(
    failures,
    composedContextSource,
    legacyGeneratedClientContextPattern,
    'TypeScript composed context must not retain removed generated-client naming.',
  );
  assertPresent(
    failures,
    composedContextSource,
    /\bImTransportClientLike\b|\btransportClient\b|\bcreateTransportClient\b/,
    'TypeScript composed context must use transport-client naming internally.',
  );
  assertAbsent(
    failures,
    composedTypesSource,
    /\bsetApiKey\?\s*\(/,
    'TypeScript composed generated-client contract must not include setApiKey(...).',
  );
  assertAbsent(
    failures,
    composedTypesSource,
    /\bsetAccessToken\?\s*\(/,
    'TypeScript composed generated-client contract must not include setAccessToken(...).',
  );
  assertAbsent(
    failures,
    composedTypesSource,
    /\bImGeneratedConfig\b/,
    'TypeScript composed public types must not re-export ImGeneratedConfig.',
  );
  if (existsSync(composedShimPath)) {
    failures.push(
      'TypeScript composed layer must not ship the legacy shims-sdk-common.d.ts override once real @sdkwork/sdk-common runtime types are available.',
    );
  }
}

if (languageSet.has('flutter')) {
  const generatedClientSource = read(
    'sdkwork-im-sdk-flutter/generated/server-openapi/lib/transport_client.dart',
  );
  const generatedReadmeSource = read('sdkwork-im-sdk-flutter/generated/server-openapi/README.md');
  const composedSdkSource = read('sdkwork-im-sdk-flutter/composed/lib/im_sdk.dart');
  const composedContextSource = read('sdkwork-im-sdk-flutter/composed/lib/src/context.dart');
  const composedAuthModuleSource = read(
    'sdkwork-im-sdk-flutter/composed/lib/src/auth_module.dart',
  );
  const composedPortalModuleSource = read(
    'sdkwork-im-sdk-flutter/composed/lib/src/portal_module.dart',
  );

  assertPresent(
    failures,
    generatedClientSource,
    /\bclass ImGeneratedConfig\b/,
    'Flutter generated client must define a bearer-only ImGeneratedConfig.',
  );
  assertAbsent(
    failures,
    generatedClientSource,
    /\bapiKey\b/,
    'Flutter generated client must not expose apiKey fields or parameters.',
  );
  assertAbsent(
    failures,
    generatedClientSource,
    /\baccessToken\b/,
    'Flutter generated client must not expose accessToken fields or parameters.',
  );
  assertAbsent(
    failures,
    generatedClientSource,
    /\bsetApiKey\s*\(/,
    'Flutter generated client must not expose setApiKey(...).',
  );
  assertAbsent(
    failures,
    generatedClientSource,
    /\bsetAccessToken\s*\(/,
    'Flutter generated client must not expose setAccessToken(...).',
  );
  assertPresent(
    failures,
    generatedClientSource,
    /\bsetAuthToken\s*\(/,
    'Flutter generated client must expose setAuthToken(...).',
  );
  assertPresent(
    failures,
    generatedClientSource,
    /\blate final AuthApi auth;/,
    'Flutter generated client must expose auth API wiring.',
  );
  assertPresent(
    failures,
    generatedClientSource,
    /\blate final PortalApi portal;/,
    'Flutter generated client must expose portal API wiring.',
  );
  assertPresent(
    failures,
    generatedClientSource,
    /\bauth = AuthApi\(_httpClient\);/,
    'Flutter generated client must construct auth API from the shared http client.',
  );
  assertPresent(
    failures,
    generatedClientSource,
    /\bportal = PortalApi\(_httpClient\);/,
    'Flutter generated client must construct portal API from the shared http client.',
  );
  assertAbsent(
    failures,
    generatedReadmeSource,
    /Mode A: API Key|Mode B: Dual Token|setApiKey|setAccessToken|Access-Token/,
    'Flutter generated README must not document API key or dual-token auth flows.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /setAuthToken/,
    'Flutter generated README must document bearer auth through setAuthToken(...).',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /Use only the package root entrypoint: `package:im_sdk_generated\/im_sdk_generated\.dart`\./,
    'Flutter generated README must document the package root entrypoint boundary.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /Generated `src\/` imports are not part of the supported public API\./,
    'Flutter generated README must forbid generated src imports as public API.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /`client\.auth`/,
    'Flutter generated README must document client.auth as a mounted generated API group.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /`client\.portal`/,
    'Flutter generated README must document client.portal as a mounted generated API group.',
  );
  assertPresent(
    failures,
    generatedReadmeSource,
    /\bImTransportClient\b/,
    'Flutter generated README must document ImTransportClient as the low-level transport client.',
  );
  assertAbsent(
    failures,
    generatedReadmeSource,
    /ImSdkClient\.create\(/,
    'Flutter generated README must not teach the composed ImSdkClient.create(...) entrypoint.',
  );
  assertAbsent(
    failures,
    composedSdkSource,
    /\bString\?\s+apiKey\b|\bString\?\s+accessToken\b|\bString\s+apiKeyHeader\b|\bbool\s+apiKeyAsBearer\b/,
    'Flutter composed client factory must not expose apiKey or accessToken creation parameters.',
  );
  assertAbsent(
    failures,
    composedSdkSource,
    /\bsetApiKey\s*\(/,
    'Flutter composed client must not expose setApiKey(...).',
  );
  assertAbsent(
    failures,
    composedSdkSource,
    /\bsetAccessToken\s*\(/,
    'Flutter composed client must not expose setAccessToken(...).',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\bString\?\s+authToken\b/,
    'Flutter composed client factory must expose a flat authToken parameter.',
  );
  assertAbsent(
    failures,
    composedSdkSource,
    /\bImGeneratedConfig\?\s+generatedConfig\b/,
    'Flutter composed client factory must not expose ImGeneratedConfig? generatedConfig.',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\bsetAuthToken\s*\(/,
    'Flutter composed client must expose setAuthToken(...).',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\blate final ImAuthModule auth;/,
    'Flutter composed client must expose an auth domain module.',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\blate final ImPortalModule portal;/,
    'Flutter composed client must expose a portal domain module.',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\bauth = ImAuthModule\(_context\);/,
    'Flutter composed client must construct its auth domain from the shared context.',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\bportal = ImPortalModule\(_context\);/,
    'Flutter composed client must construct its portal domain from the shared context.',
  );
  assertAbsent(
    failures,
    composedSdkSource,
    legacyGeneratedClientClassOrInstancePattern,
    'Flutter composed client must not retain legacy generated-client naming.',
  );
  assertPresent(
    failures,
    composedSdkSource,
    /\btransportClient\b|\bImTransportClient\b/,
    'Flutter composed client must use transportClient and ImTransportClient naming internally.',
  );
  assertAbsent(
    failures,
    composedContextSource,
    /\bsetApiKey\s*\(/,
    'Flutter composed context must not proxy setApiKey(...).',
  );
  assertAbsent(
    failures,
    composedContextSource,
    /\bsetAccessToken\s*\(/,
    'Flutter composed context must not proxy setAccessToken(...).',
  );
  assertPresent(
    failures,
    composedContextSource,
    /\bclearAuthToken\s*\(/,
    'Flutter composed context must expose clearAuthToken(...).',
  );
  assertPresent(
    failures,
    composedContextSource,
    /\bsetAuthToken\(''\);/,
    'Flutter composed context clearAuthToken() must clear bearer auth through setAuthToken(\'\').',
  );
  assertAbsent(
    failures,
    composedContextSource,
    legacyGeneratedClientClassOrInstancePattern,
    'Flutter composed context must not retain legacy generated-client naming.',
  );
  assertPresent(
    failures,
    composedContextSource,
    /\btransportClient\b|\bImTransportClient\b/,
    'Flutter composed context must use transportClient and ImTransportClient naming internally.',
  );
  assertPresent(
    failures,
    composedAuthModuleSource,
    /\bclass ImAuthModule\b/,
    'Flutter composed layer must define ImAuthModule.',
  );
  assertPresent(
    failures,
    composedAuthModuleSource,
    /\blogin\s*\(PortalLoginRequest body\)/,
    'Flutter auth module must expose login(PortalLoginRequest body).',
  );
  assertPresent(
    failures,
    composedAuthModuleSource,
    /\bme\s*\(\)/,
    'Flutter auth module must expose me().',
  );
  assertPresent(
    failures,
    composedAuthModuleSource,
    /\buseToken\s*\(String token\)/,
    'Flutter auth module must expose useToken(String token).',
  );
  assertPresent(
    failures,
    composedAuthModuleSource,
    /\bclearToken\s*\(\)/,
    'Flutter auth module must expose clearToken().',
  );
  assertPresent(
    failures,
    composedPortalModuleSource,
    /\bclass ImPortalModule\b/,
    'Flutter composed layer must define ImPortalModule.',
  );
  for (const portalMethod of [
    'getHome',
    'getAuth',
    'getWorkspace',
    'getDashboard',
    'getConversations',
    'getRealtime',
    'getMedia',
    'getAutomation',
    'getGovernance',
  ]) {
    assertPresent(
      failures,
      composedPortalModuleSource,
      new RegExp(`\\b${portalMethod}\\s*\\(`),
      `Flutter portal module must expose ${portalMethod}().`,
    );
  }
}

if (languageSet.has('rust')) {
  const generatedClientSource = readIfExists(
    'sdkwork-im-sdk-rust/generated/server-openapi/src/client.rs',
    failures,
    'Rust generated client source is missing: sdkwork-im-sdk-rust/generated/server-openapi/src/client.rs.',
  );
  const generatedHttpClientSource = readIfExists(
    'sdkwork-im-sdk-rust/generated/server-openapi/src/http/client.rs',
    failures,
    'Rust generated http client source is missing: sdkwork-im-sdk-rust/generated/server-openapi/src/http/client.rs.',
  );
  const generatedReadmeSource = readIfExists(
    'sdkwork-im-sdk-rust/generated/server-openapi/README.md',
    failures,
    'Rust generated README is missing: sdkwork-im-sdk-rust/generated/server-openapi/README.md.',
  );
  const generatedCargoTomlSource = readIfExists(
    'sdkwork-im-sdk-rust/generated/server-openapi/Cargo.toml',
    failures,
    'Rust generated Cargo manifest is missing: sdkwork-im-sdk-rust/generated/server-openapi/Cargo.toml.',
  );

  if (generatedClientSource) {
    assertAbsent(
      failures,
      generatedClientSource,
      /\bset_api_key\s*\(/,
      'Rust generated client must not expose set_api_key(...).',
    );
    assertAbsent(
      failures,
      generatedClientSource,
      /\bset_access_token\s*\(/,
      'Rust generated client must not expose set_access_token(...).',
    );
    assertPresent(
      failures,
      generatedClientSource,
      /\bset_auth_token\s*\(/,
      'Rust generated client must expose set_auth_token(...).',
    );
  }

  if (generatedHttpClientSource) {
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bset_api_key\s*\(/,
      'Rust generated http client must not expose set_api_key(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bset_access_token\s*\(/,
      'Rust generated http client must not expose set_access_token(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bDEFAULT_API_KEY_HEADER\b|\bDEFAULT_API_KEY_USE_BEARER\b|Access-Token|api_key/,
      'Rust generated http client must stay bearer-only internally.',
    );
    assertPresent(
      failures,
      generatedHttpClientSource,
      /\bset_auth_token\s*\(/,
      'Rust generated http client must expose set_auth_token(...).',
    );
  }

  if (generatedReadmeSource) {
    assertAbsent(
      failures,
      generatedReadmeSource,
      /set_api_key|set_access_token|Access-Token|Mode A: API Key|Mode B: Dual Token/,
      'Rust generated README must not document API key or dual-token auth flows.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /set_auth_token/,
      'Rust generated README must document bearer auth through set_auth_token(...).',
    );
  }

  if (generatedCargoTomlSource) {
    assertPresent(
      failures,
      generatedCargoTomlSource,
      /^name = "sdkwork-im-sdk-generated"$/m,
      'Rust generated Cargo manifest must keep package name sdkwork-im-sdk-generated.',
    );
    assertPresent(
      failures,
      generatedCargoTomlSource,
      /^\[lib\]$/m,
      'Rust generated Cargo manifest must declare a lib target.',
    );
    assertPresent(
      failures,
      generatedCargoTomlSource,
      /^path = "src\/lib\.rs"$/m,
      'Rust generated Cargo manifest lib target must point to src/lib.rs.',
    );
  }
}

if (languageSet.has('java')) {
  assertPathMissing(
    failures,
    `sdkwork-im-sdk-java/generated/server-openapi/src/main/java/${removedLegacyGeneratedNamespaceRelativeRoot}/ImTransportClient.java`,
    'Java generated workspace must not keep the removed legacy generated client namespace path.',
  );
  assertPathMissing(
    failures,
    `sdkwork-im-sdk-java/generated/server-openapi/src/main/java/${removedLegacyGeneratedNamespaceRelativeRoot}/http/HttpClient.java`,
    'Java generated workspace must not keep the removed legacy generated http client namespace path.',
  );
  const generatedClientSource = readIfExists(
    'sdkwork-im-sdk-java/generated/server-openapi/src/main/java/com/sdkwork/im/generated/ImTransportClient.java',
    failures,
    'Java generated client source is missing: sdkwork-im-sdk-java/generated/server-openapi/src/main/java/com/sdkwork/im/generated/ImTransportClient.java.',
  );
  const generatedHttpClientSource = readIfExists(
    'sdkwork-im-sdk-java/generated/server-openapi/src/main/java/com/sdkwork/im/generated/http/HttpClient.java',
    failures,
    'Java generated http client source is missing: sdkwork-im-sdk-java/generated/server-openapi/src/main/java/com/sdkwork/im/generated/http/HttpClient.java.',
  );
  const generatedReadmeSource = readIfExists(
    'sdkwork-im-sdk-java/generated/server-openapi/README.md',
    failures,
    'Java generated README is missing: sdkwork-im-sdk-java/generated/server-openapi/README.md.',
  );

  if (generatedClientSource) {
    assertAbsent(failures, generatedClientSource, /\bsetApiKey\s*\(/, 'Java generated client must not expose setApiKey(...).');
    assertAbsent(
      failures,
      generatedClientSource,
      /\bsetAccessToken\s*\(/,
      'Java generated client must not expose setAccessToken(...).',
    );
    assertPresent(
      failures,
      generatedClientSource,
      /\bsetAuthToken\s*\(/,
      'Java generated client must expose setAuthToken(...).',
    );
  }

  if (generatedHttpClientSource) {
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bsetApiKey\s*\(/,
      'Java generated http client must not expose setApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bsetAccessToken\s*\(/,
      'Java generated http client must not expose setAccessToken(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bAPI_KEY_HEADER\b|\bAPI_KEY_USE_BEARER\b/,
      'Java generated http client must stay bearer-only internally.',
    );
    assertPresent(
      failures,
      generatedHttpClientSource,
      /\bsetAuthToken\s*\(/,
      'Java generated http client must expose setAuthToken(...).',
    );
  }

  if (generatedReadmeSource) {
    assertAbsent(
      failures,
      generatedReadmeSource,
      /Professional Java SDK for SDKWork API\.|setApiKey|setAccessToken|API Key|Authentication Modes/,
      'Java generated README must not document API key or generic SDKWork auth flows.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /Generator-owned Java transport SDK for the Craw Chat app API\./,
      'Java generated README must identify the generated workspace as a generator-owned Java transport SDK.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /setAuthToken/,
      'Java generated README must document bearer auth through setAuthToken(...).',
    );
  }
}

if (languageSet.has('csharp')) {
  const generatedClientSource = readIfExists(
    'sdkwork-im-sdk-csharp/generated/server-openapi/ImTransportClient.cs',
    failures,
    'C# generated client source is missing: sdkwork-im-sdk-csharp/generated/server-openapi/ImTransportClient.cs.',
  );
  const generatedHttpClientSource = readIfExists(
    'sdkwork-im-sdk-csharp/generated/server-openapi/Http/HttpClient.cs',
    failures,
    'C# generated http client source is missing: sdkwork-im-sdk-csharp/generated/server-openapi/Http/HttpClient.cs.',
  );
  const generatedReadmeSource = readIfExists(
    'sdkwork-im-sdk-csharp/generated/server-openapi/README.md',
    failures,
    'C# generated README is missing: sdkwork-im-sdk-csharp/generated/server-openapi/README.md.',
  );

  if (generatedClientSource) {
    assertAbsent(failures, generatedClientSource, /\bSetApiKey\s*\(/, 'C# generated client must not expose SetApiKey(...).');
    assertAbsent(
      failures,
      generatedClientSource,
      /\bSetAccessToken\s*\(/,
      'C# generated client must not expose SetAccessToken(...).',
    );
    assertPresent(
      failures,
      generatedClientSource,
      /\bSetAuthToken\s*\(/,
      'C# generated client must expose SetAuthToken(...).',
    );
  }

  if (generatedHttpClientSource) {
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bSetApiKey\s*\(/,
      'C# generated http client must not expose SetApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bSetAccessToken\s*\(/,
      'C# generated http client must not expose SetAccessToken(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bApiKeyHeader\b|\bApiKeyUseBearer\b/,
      'C# generated http client must stay bearer-only internally.',
    );
    assertPresent(
      failures,
      generatedHttpClientSource,
      /\bSetAuthToken\s*\(/,
      'C# generated http client must expose SetAuthToken(...).',
    );
  }

  if (generatedReadmeSource) {
    assertAbsent(
      failures,
      generatedReadmeSource,
      /Professional C# SDK for SDKWork API\.|SetApiKey|SetAccessToken|API Key|Authentication Modes/,
      'C# generated README must not document API key or generic SDKWork auth flows.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /Generator-owned C# transport SDK for the Craw Chat app API\./,
      'C# generated README must identify the generated workspace as a generator-owned C# transport SDK.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /SetAuthToken/,
      'C# generated README must document bearer auth through SetAuthToken(...).',
    );
  }
}

if (languageSet.has('kotlin')) {
  assertPathMissing(
    failures,
    `sdkwork-im-sdk-kotlin/generated/server-openapi/src/main/kotlin/${removedLegacyGeneratedNamespaceRelativeRoot}/ImTransportClient.kt`,
    'Kotlin generated workspace must not keep the removed legacy generated client namespace path.',
  );
  assertPathMissing(
    failures,
    `sdkwork-im-sdk-kotlin/generated/server-openapi/src/main/kotlin/${removedLegacyGeneratedNamespaceRelativeRoot}/http/HttpClient.kt`,
    'Kotlin generated workspace must not keep the removed legacy generated http client namespace path.',
  );
  const generatedClientSource = readIfExists(
    'sdkwork-im-sdk-kotlin/generated/server-openapi/src/main/kotlin/com/sdkwork/im/generated/ImTransportClient.kt',
    failures,
    'Kotlin generated client source is missing: sdkwork-im-sdk-kotlin/generated/server-openapi/src/main/kotlin/com/sdkwork/im/generated/ImTransportClient.kt.',
  );
  const generatedHttpClientSource = readIfExists(
    'sdkwork-im-sdk-kotlin/generated/server-openapi/src/main/kotlin/com/sdkwork/im/generated/http/HttpClient.kt',
    failures,
    'Kotlin generated http client source is missing: sdkwork-im-sdk-kotlin/generated/server-openapi/src/main/kotlin/com/sdkwork/im/generated/http/HttpClient.kt.',
  );
  const generatedReadmeSource = readIfExists(
    'sdkwork-im-sdk-kotlin/generated/server-openapi/README.md',
    failures,
    'Kotlin generated README is missing: sdkwork-im-sdk-kotlin/generated/server-openapi/README.md.',
  );

  if (generatedClientSource) {
    assertAbsent(
      failures,
      generatedClientSource,
      /\bsetApiKey\s*\(/,
      'Kotlin generated client must not expose setApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedClientSource,
      /\bsetAccessToken\s*\(/,
      'Kotlin generated client must not expose setAccessToken(...).',
    );
    assertPresent(
      failures,
      generatedClientSource,
      /\bsetAuthToken\s*\(/,
      'Kotlin generated client must expose setAuthToken(...).',
    );
  }

  if (generatedHttpClientSource) {
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bsetApiKey\s*\(/,
      'Kotlin generated http client must not expose setApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bsetAccessToken\s*\(/,
      'Kotlin generated http client must not expose setAccessToken(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bAPI_KEY_HEADER\b|\bAPI_KEY_USE_BEARER\b/,
      'Kotlin generated http client must stay bearer-only internally.',
    );
    assertPresent(
      failures,
      generatedHttpClientSource,
      /\bsetAuthToken\s*\(/,
      'Kotlin generated http client must expose setAuthToken(...).',
    );
  }

  if (generatedReadmeSource) {
    assertAbsent(
      failures,
      generatedReadmeSource,
      /Professional Kotlin SDK for SDKWork API\.|setApiKey|setAccessToken|API Key|Authentication Modes/,
      'Kotlin generated README must not document API key or generic SDKWork auth flows.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /Generator-owned Kotlin transport SDK for the Craw Chat app API\./,
      'Kotlin generated README must identify the generated workspace as a generator-owned Kotlin transport SDK.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /setAuthToken/,
      'Kotlin generated README must document bearer auth through setAuthToken(...).',
    );
  }
}

if (languageSet.has('go')) {
  const generatedClientSource = readIfExists(
    'sdkwork-im-sdk-go/generated/server-openapi/sdk.go',
    failures,
    'Go generated client source is missing: sdkwork-im-sdk-go/generated/server-openapi/sdk.go.',
  );
  const generatedHttpClientSource = readIfExists(
    'sdkwork-im-sdk-go/generated/server-openapi/http/client.go',
    failures,
    'Go generated http client source is missing: sdkwork-im-sdk-go/generated/server-openapi/http/client.go.',
  );
  const generatedReadmeSource = readIfExists(
    'sdkwork-im-sdk-go/generated/server-openapi/README.md',
    failures,
    'Go generated README is missing: sdkwork-im-sdk-go/generated/server-openapi/README.md.',
  );

  if (generatedClientSource) {
    assertAbsent(failures, generatedClientSource, /\bSetApiKey\s*\(/, 'Go generated client must not expose SetApiKey(...).');
    assertAbsent(
      failures,
      generatedClientSource,
      /\bSetAccessToken\s*\(/,
      'Go generated client must not expose SetAccessToken(...).',
    );
    assertPresent(
      failures,
      generatedClientSource,
      /\bSetAuthToken\s*\(/,
      'Go generated client must expose SetAuthToken(...).',
    );
  }

  if (generatedHttpClientSource) {
    assertAbsent(failures, generatedHttpClientSource, /\bApiKey\s+string\b/, 'Go generated config must not expose ApiKey.');
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bAccessToken\s+string\b/,
      'Go generated config must not expose AccessToken.',
    );
    assertPresent(
      failures,
      generatedHttpClientSource,
      /\bAuthToken\s+string\b/,
      'Go generated config must expose AuthToken.',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bSetApiKey\s*\(/,
      'Go generated http client must not expose SetApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bSetAccessToken\s*\(/,
      'Go generated http client must not expose SetAccessToken(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bdefaultApiKeyHeader\b|\bdefaultApiKeyUseBearer\b/,
      'Go generated http client must stay bearer-only internally.',
    );
    assertPresent(
      failures,
      generatedHttpClientSource,
      /\bSetAuthToken\s*\(/,
      'Go generated http client must expose SetAuthToken(...).',
    );
  }

  if (generatedReadmeSource) {
    assertAbsent(
      failures,
      generatedReadmeSource,
      /Professional Go SDK for SDKWork API\.|SetApiKey|SetAccessToken|API Key|Authentication Modes/,
      'Go generated README must not document API key or generic SDKWork auth flows.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /Generator-owned Go transport SDK for the Craw Chat app API\./,
      'Go generated README must identify the generated workspace as a generator-owned Go transport SDK.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /SetAuthToken/,
      'Go generated README must document bearer auth through SetAuthToken(...).',
    );
  }
}

if (languageSet.has('python')) {
  const generatedClientSource = readIfExists(
    'sdkwork-im-sdk-python/generated/server-openapi/sdkwork_im_sdk_generated/client.py',
    failures,
    'Python generated client source is missing: sdkwork-im-sdk-python/generated/server-openapi/sdkwork_im_sdk_generated/client.py.',
  );
  const generatedHttpClientSource = readIfExists(
    'sdkwork-im-sdk-python/generated/server-openapi/sdkwork_im_sdk_generated/http_client.py',
    failures,
    'Python generated http client source is missing: sdkwork-im-sdk-python/generated/server-openapi/sdkwork_im_sdk_generated/http_client.py.',
  );
  const generatedReadmeSource = readIfExists(
    'sdkwork-im-sdk-python/generated/server-openapi/README.md',
    failures,
    'Python generated README is missing: sdkwork-im-sdk-python/generated/server-openapi/README.md.',
  );

  if (generatedClientSource) {
    assertAbsent(
      failures,
      generatedClientSource,
      /\bset_api_key\s*\(/,
      'Python generated client must not expose set_api_key(...).',
    );
    assertAbsent(
      failures,
      generatedClientSource,
      /\bset_access_token\s*\(/,
      'Python generated client must not expose set_access_token(...).',
    );
    assertPresent(
      failures,
      generatedClientSource,
      /\bset_auth_token\s*\(/,
      'Python generated client must expose set_auth_token(...).',
    );
  }

  if (generatedHttpClientSource) {
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bset_api_key\s*\(/,
      'Python generated http client must not expose set_api_key(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bset_access_token\s*\(/,
      'Python generated http client must not expose set_access_token(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bAPI_KEY_HEADER\b|\bAPI_KEY_USE_BEARER\b|\bset_api_key\s*\(|\bset_access_token\s*\(/,
      'Python generated http client must stay bearer-only internally.',
    );
    assertPresent(
      failures,
      generatedHttpClientSource,
      /\bset_auth_token\s*\(/,
      'Python generated http client must expose set_auth_token(...).',
    );
  }

  if (generatedReadmeSource) {
    assertAbsent(
      failures,
      generatedReadmeSource,
      /Professional Python SDK for SDKWork API\.|set_api_key|set_access_token|API Key|Authentication Modes/,
      'Python generated README must not document API key or generic SDKWork auth flows.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /Generator-owned Python transport SDK for the Craw Chat app API\./,
      'Python generated README must identify the generated workspace as a generator-owned Python transport SDK.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /set_auth_token/,
      'Python generated README must document bearer auth through set_auth_token(...).',
    );
  }
}

if (languageSet.has('swift')) {
  const generatedClientSource = readIfExists(
    'sdkwork-im-sdk-swift/generated/server-openapi/Sources/ImTransportClient.swift',
    failures,
    'Swift generated client source is missing: sdkwork-im-sdk-swift/generated/server-openapi/Sources/ImTransportClient.swift.',
  );
  const generatedHttpClientSource = readIfExists(
    'sdkwork-im-sdk-swift/generated/server-openapi/Sources/HTTP/HttpClient.swift',
    failures,
    'Swift generated http client source is missing: sdkwork-im-sdk-swift/generated/server-openapi/Sources/HTTP/HttpClient.swift.',
  );
  const generatedReadmeSource = readIfExists(
    'sdkwork-im-sdk-swift/generated/server-openapi/README.md',
    failures,
    'Swift generated README is missing: sdkwork-im-sdk-swift/generated/server-openapi/README.md.',
  );

  if (generatedClientSource) {
    assertAbsent(
      failures,
      generatedClientSource,
      /\bsetApiKey\s*\(/,
      'Swift generated client must not expose setApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedClientSource,
      /\bsetAccessToken\s*\(/,
      'Swift generated client must not expose setAccessToken(...).',
    );
    assertPresent(
      failures,
      generatedClientSource,
      /\bsetAuthToken\s*\(/,
      'Swift generated client must expose setAuthToken(...).',
    );
  }

  if (generatedHttpClientSource) {
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bsetApiKey\s*\(/,
      'Swift generated http client must not expose setApiKey(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bsetAccessToken\s*\(/,
      'Swift generated http client must not expose setAccessToken(...).',
    );
    assertAbsent(
      failures,
      generatedHttpClientSource,
      /\bapiKeyHeader\b|\bapiKeyUseBearer\b/,
      'Swift generated http client must stay bearer-only internally.',
    );
    assertPresent(
      failures,
      generatedHttpClientSource,
      /\bsetAuthToken\s*\(/,
      'Swift generated http client must expose setAuthToken(...).',
    );
  }

  if (generatedReadmeSource) {
    assertAbsent(
      failures,
      generatedReadmeSource,
      /Professional Swift SDK for SDKWork API\.|setApiKey|setAccessToken|API Key|Authentication Modes/,
      'Swift generated README must not document API key or generic SDKWork auth flows.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /Generator-owned Swift transport SDK for the Craw Chat app API\./,
      'Swift generated README must identify the generated workspace as a generator-owned Swift transport SDK.',
    );
    assertPresent(
      failures,
      generatedReadmeSource,
      /setAuthToken/,
      'Swift generated README must document bearer auth through setAuthToken(...).',
    );
  }
}

if (failures.length > 0) {
  console.error('[sdkwork-im-sdk] Auth surface alignment verification failed:');
  for (const entry of failures) {
    console.error(`- ${entry}`);
  }
  process.exit(1);
}

console.log('[sdkwork-im-sdk] Auth surface alignment verification passed.');

