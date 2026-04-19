#!/usr/bin/env node
import { legacyReadmeForbiddenTerms } from './legacy-alias-terms.mjs';
import { verifyLanguageWorkspace } from './verify-language-workspace-shared.mjs';

verifyLanguageWorkspace({
  language: 'java',
  workspace: 'sdkwork-im-sdk-java',
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
    ...legacyReadmeForbiddenTerms.java,
    'setApiKey',
    'setAccessToken',
  ],
  generatedReadmeRequiredTerms: [
    'Generator-owned Java transport SDK for the Craw Chat app API.',
    'The generated package identity is `com.sdkwork:im-sdk-generated`.',
    'Craw Chat app routes use bearer authentication only.',
    'client.setAuthToken("your-bearer-token");',
  ],
  generatedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.java,
    'setApiKey',
    'setAccessToken',
    'Professional Java SDK for SDKWork API.',
    'Authentication Modes',
  ],
  composedReadmeRequiredTerms: [
    'manual-owned semantic reserve',
    'generator output must never land here',
    'future Java business-facing helpers belong here',
  ],
  composedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.java,
  ],
  expectedPackageDescriptions: {
    generated: 'Generator-owned Java transport SDK for the Craw Chat app API.',
    composed: 'Manual-owned Java semantic SDK boundary for IM',
  },
  expectedPackageFields: {
    composed: {
      version: '',
      status: 'reserved',
    },
  },
  expectedManifestFields: {
    generated: {
      displayName: 'com.sdkwork:im-sdk-generated',
    },
    composed: {
      displayName: 'com.sdkwork:im-sdk',
    },
  },
});

