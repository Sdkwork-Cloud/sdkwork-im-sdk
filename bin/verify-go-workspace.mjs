#!/usr/bin/env node
import { legacyReadmeForbiddenTerms } from './legacy-alias-terms.mjs';
import { verifyLanguageWorkspace } from './verify-language-workspace-shared.mjs';

verifyLanguageWorkspace({
  language: 'go',
  workspace: 'sdkwork-im-sdk-go',
  primaryClient: 'ImSdkClient',
  maturityTier: 'tier-b',
  requiredPackageLayers: ['generated', 'composed'],
  readmeRequiredTerms: [
    'github.com/sdkwork/im-sdk-generated',
    'ImSdkClient',
    'Tier B',
    'transport module',
  ],
  readmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.go,
    'SetApiKey',
    'SetAccessToken',
  ],
  generatedReadmeRequiredTerms: [
    'Generator-owned Go transport SDK for the Craw Chat app API.',
    'The generated package identity is `github.com/sdkwork/im-sdk-generated`.',
    'Craw Chat app routes use bearer authentication only.',
    'client.SetAuthToken("your-bearer-token")',
  ],
  generatedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.go,
    'SetApiKey',
    'SetAccessToken',
    'Professional Go SDK for SDKWork API.',
    'Authentication Modes',
  ],
  composedReadmeRequiredTerms: [
    'manual-owned semantic reserve',
    'generator output must never land here',
    'future Go business-facing helpers belong here',
  ],
  composedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.go,
  ],
  expectedPackageDescriptions: {
    generated: 'Generator-owned Go transport SDK for the Craw Chat app API.',
    composed: 'Manual-owned Go semantic SDK boundary for IM',
  },
  expectedPackageFields: {
    composed: {
      version: '',
      status: 'reserved',
    },
  },
  expectedManifestFields: {
    generated: {
      goVersion: '1.21',
    },
    composed: {
      goVersion: '1.21',
    },
  },
});

