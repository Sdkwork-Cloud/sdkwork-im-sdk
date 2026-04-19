#!/usr/bin/env node
import { legacyReadmeForbiddenTerms } from './legacy-alias-terms.mjs';
import { verifyLanguageWorkspace } from './verify-language-workspace-shared.mjs';

verifyLanguageWorkspace({
  language: 'swift',
  workspace: 'sdkwork-im-sdk-swift',
  primaryClient: 'ImSdkClient',
  maturityTier: 'tier-b',
  requiredPackageLayers: ['generated', 'composed'],
  readmeRequiredTerms: [
    'ImSdkGenerated',
    'ImSdkClient',
    'Tier B',
    'transport package',
  ],
  readmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.swift,
    'setApiKey',
    'setAccessToken',
  ],
  generatedReadmeRequiredTerms: [
    'Generator-owned Swift transport SDK for the Craw Chat app API.',
    'The generated package identity is `ImSdkGenerated`.',
    'Craw Chat app routes use bearer authentication only.',
    'client.setAuthToken("your-bearer-token")',
  ],
  generatedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.swift,
    'setApiKey',
    'setAccessToken',
    'Professional Swift SDK for SDKWork API.',
    'Authentication Modes',
  ],
  composedReadmeRequiredTerms: [
    'manual-owned semantic reserve',
    'generator output must never land here',
    'future Swift business-facing helpers belong here',
  ],
  composedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.swift,
  ],
  expectedPackageDescriptions: {
    generated: 'Generator-owned Swift transport SDK for the Craw Chat app API.',
    composed: 'Manual-owned Swift semantic SDK boundary for IM',
  },
  expectedPackageFields: {
    composed: {
      version: '',
      status: 'reserved',
    },
  },
  expectedManifestFields: {
    generated: {
      productName: 'ImSdkGenerated',
      targetName: 'ImSdkGenerated',
    },
    composed: {
      productName: 'ImSdk',
      targetName: 'ImSdk',
    },
  },
});

