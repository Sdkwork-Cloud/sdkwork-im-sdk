import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

const workspaceExpectations = [
  {
    path: 'sdkwork-im-sdk-typescript/README.md',
    required: [
      '@sdkwork/im-sdk',
      '@sdkwork-internal/im-sdk-generated',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'browser and Node.js',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
  {
    path: 'sdkwork-im-sdk-flutter/README.md',
    required: [
      'im_sdk',
      'im_sdk_generated',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
  {
    path: 'sdkwork-im-sdk-rust/README.md',
    required: [
      'sdkwork-im-sdk-generated',
      'im_sdk',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'Tier A',
      'transport crate',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
  {
    path: 'sdkwork-im-sdk-java/README.md',
    required: [
      'com.sdkwork:im-sdk-generated',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'Tier B',
      'transport artifact',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
  {
    path: 'sdkwork-im-sdk-csharp/README.md',
    required: [
      'Sdkwork.Im.Sdk.Generated',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'Tier B',
      'transport package',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
  {
    path: 'sdkwork-im-sdk-swift/README.md',
    required: [
      'ImSdkGenerated',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'Tier B',
      'transport package',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
  {
    path: 'sdkwork-im-sdk-kotlin/README.md',
    required: [
      'com.sdkwork:im-sdk-generated',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'Tier B',
      'transport artifact',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
  {
    path: 'sdkwork-im-sdk-go/README.md',
    required: [
      'github.com/sdkwork/im-sdk-generated',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'Tier B',
      'transport module',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
  {
    path: 'sdkwork-im-sdk-python/README.md',
    required: [
      'sdkwork-im-sdk-generated',
      'ImSdkClient',
      'generated/server-openapi',
      'composed',
      'Tier B',
      'transport package',
      'Release Snapshot Boundary',
      'state = generated_pending_publication',
      'generationStatus = generated',
      'releaseStatus = not_published',
      'plannedVersion = null',
      'versionStatus = version_unassigned_pending_freeze',
      'versionDecisionSourcePath = null',
    ],
    forbidden: ['template_only_pending_generation'],
  },
];

for (const expectation of workspaceExpectations) {
  const source = read(expectation.path);
  for (const needle of expectation.required) {
    assert.match(
      source,
      new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `${expectation.path} must include ${needle}.`,
    );
  }
  for (const needle of expectation.forbidden || []) {
    assert.doesNotMatch(
      source,
      new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `${expectation.path} must not include ${needle}.`,
    );
  }
}

console.log('multilanguage workspace README contract test passed');

