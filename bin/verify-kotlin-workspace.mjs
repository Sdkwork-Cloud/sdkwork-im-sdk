#!/usr/bin/env node
import { legacyReadmeForbiddenTerms } from './legacy-alias-terms.mjs';
import { verifyLanguageWorkspace } from './verify-language-workspace-shared.mjs';

verifyLanguageWorkspace({
  language: 'kotlin',
  workspace: 'sdkwork-im-sdk-kotlin',
  primaryClient: 'ImSdkClient',
  maturityTier: 'tier-b',
  requiredPackageLayers: ['generated', 'composed'],
  readmeRequiredTerms: [
    'com.sdkwork:im-sdk-generated',
    'ImSdkClient',
    'Tier B',
    'transport artifact',
  ],
  readmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.kotlin,
    'setApiKey',
    'setAccessToken',
  ],
  generatedReadmeRequiredTerms: [
    'Generator-owned Kotlin transport SDK for the Craw Chat app API.',
    'The generated package identity is `com.sdkwork:im-sdk-generated`.',
    'Craw Chat app routes use bearer authentication only.',
    'client.setAuthToken("your-bearer-token")',
  ],
  generatedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.kotlin,
    'setApiKey',
    'setAccessToken',
    'Professional Kotlin SDK for SDKWork API.',
    'Authentication Modes',
  ],
  composedReadmeRequiredTerms: [
    'manual-owned semantic reserve',
    'generator output must never land here',
    'future Kotlin business-facing helpers belong here',
  ],
  composedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.kotlin,
  ],
  expectedPackageDescriptions: {
    generated: 'Generator-owned Kotlin transport SDK for the Craw Chat app API.',
    composed: 'Manual-owned Kotlin semantic SDK boundary for IM',
  },
  expectedPackageFields: {
    composed: {
      version: '',
      status: 'reserved',
    },
  },
  expectedManifestFields: {
    generated: {
      group: 'com.sdkwork',
      archiveBaseName: 'im-sdk-generated',
    },
    composed: {
      group: 'com.sdkwork',
      archiveBaseName: 'im-sdk',
    },
  },
});

