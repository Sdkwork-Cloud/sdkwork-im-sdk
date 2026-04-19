#!/usr/bin/env node
import { legacyReadmeForbiddenTerms } from './legacy-alias-terms.mjs';
import { verifyLanguageWorkspace } from './verify-language-workspace-shared.mjs';

verifyLanguageWorkspace({
  language: 'csharp',
  workspace: 'sdkwork-im-sdk-csharp',
  primaryClient: 'ImSdkClient',
  maturityTier: 'tier-b',
  requiredPackageLayers: ['generated', 'composed'],
  readmeRequiredTerms: [
    'Sdkwork.Im.Sdk.Generated',
    'ImSdkClient',
    'Tier B',
    'transport package',
  ],
  readmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.csharp,
    'SetApiKey',
    'SetAccessToken',
  ],
  generatedReadmeRequiredTerms: [
    'Generator-owned C# transport SDK for the Craw Chat app API.',
    'The generated package identity is `Sdkwork.Im.Sdk.Generated`.',
    'Craw Chat app routes use bearer authentication only.',
    'client.SetAuthToken("your-bearer-token");',
  ],
  generatedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.csharp,
    'SetApiKey',
    'SetAccessToken',
    'Professional C# SDK for SDKWork API.',
    'Authentication Modes',
  ],
  composedReadmeRequiredTerms: [
    'manual-owned semantic reserve',
    'generator output must never land here',
    'future C# business-facing helpers belong here',
  ],
  composedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.csharp,
  ],
  expectedPackageDescriptions: {
    generated: 'Generator-owned C# transport SDK for the Craw Chat app API.',
    composed: 'Manual-owned C# semantic SDK boundary for IM',
  },
  expectedPackageFields: {
    composed: {
      version: '',
      status: 'reserved',
    },
  },
  expectedManifestFields: {
    generated: {
      assemblyName: 'Sdkwork.Im.Sdk.Generated',
      rootNamespace: 'Sdkwork.Im.Sdk.Generated',
    },
    composed: {
      assemblyName: 'Sdkwork.Im.Sdk',
      rootNamespace: 'Sdkwork.Im.Sdk',
    },
  },
});

