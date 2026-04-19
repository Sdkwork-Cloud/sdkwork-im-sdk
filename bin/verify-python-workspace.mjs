#!/usr/bin/env node
import { legacyReadmeForbiddenTerms } from './legacy-alias-terms.mjs';
import { verifyLanguageWorkspace } from './verify-language-workspace-shared.mjs';

verifyLanguageWorkspace({
  language: 'python',
  workspace: 'sdkwork-im-sdk-python',
  primaryClient: 'ImSdkClient',
  maturityTier: 'tier-b',
  requiredPackageLayers: ['generated', 'composed'],
  readmeRequiredTerms: [
    'sdkwork-im-sdk-generated',
    'ImSdkClient',
    'Tier B',
    'transport package',
  ],
  readmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.python,
    'set_api_key',
    'set_access_token',
  ],
  generatedReadmeRequiredTerms: [
    'Generator-owned Python transport SDK for the Craw Chat app API.',
    'The generated package identity is `sdkwork-im-sdk-generated`.',
    'Craw Chat app routes use bearer authentication only.',
    'client.set_auth_token("your-bearer-token")',
  ],
  generatedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.python,
    'set_api_key',
    'set_access_token',
    'Professional Python SDK for SDKWork API.',
    'Authentication Modes',
  ],
  composedReadmeRequiredTerms: [
    'manual-owned semantic reserve',
    'generator output must never land here',
    'future Python business-facing helpers belong here',
  ],
  composedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.python,
  ],
  expectedPackageDescriptions: {
    generated: 'Generator-owned Python transport SDK for the Craw Chat app API.',
    composed: 'Manual-owned Python semantic SDK boundary for IM',
  },
  expectedPackageFields: {
    composed: {
      version: '',
      status: 'reserved',
    },
  },
  expectedManifestFields: {
    generated: {
      readme: 'README.md',
      requiresPython: '>=3.8',
    },
    composed: {
      readme: 'README.md',
      requiresPython: '>=3.8',
    },
  },
});

