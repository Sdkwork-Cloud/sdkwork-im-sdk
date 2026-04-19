#!/usr/bin/env node
import { legacyReadmeForbiddenTerms } from './legacy-alias-terms.mjs';
import { verifyLanguageWorkspace } from './verify-language-workspace-shared.mjs';

verifyLanguageWorkspace({
  language: 'rust',
  workspace: 'sdkwork-im-sdk-rust',
  primaryClient: 'ImSdkClient',
  maturityTier: 'tier-a',
  requiredPackageLayers: ['generated', 'composed'],
  readmeRequiredTerms: [
    'sdkwork-im-sdk-generated',
    'im_sdk',
    'ImSdkClient',
    'Tier A',
    'transport crate',
  ],
  readmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.rust,
    'set_api_key',
    'set_access_token',
    'API Key',
  ],
  generatedReadmeRequiredTerms: [
    'Generator-owned Rust transport SDK for the Craw Chat app API.',
    'The generated package identity is `sdkwork-im-sdk-generated`.',
    'ImTransportClient',
    'Craw Chat app routes use bearer authentication only.',
    'client.set_auth_token("your-bearer-token")',
  ],
  generatedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.rust,
    'set_api_key',
    'set_access_token',
    'API Key',
    'Authentication Modes',
  ],
  composedReadmeRequiredTerms: [
    'manual-owned semantic Rust layer',
    'ImSdkClient',
    'generator output must never land here',
    'session, realtime, devices, inbox, conversations, messages, media, streams, and rtc helpers live here',
    'Rust smoke tests live here',
  ],
  composedReadmeForbiddenTerms: [
    ...legacyReadmeForbiddenTerms.rust,
  ],
  expectedPackageDescriptions: {
    generated: 'Generator-owned Rust transport SDK for the Craw Chat app API.',
    composed: 'Manual-owned IM Rust composed SDK crate.',
  },
  expectedPackageFields: {
    composed: {
      version: '0.1.0',
    },
  },
  expectedManifestFields: {
    generated: {
      library: 'src/lib.rs',
    },
    composed: {
      publish: false,
      library: 'src/lib.rs',
    },
  },
});

