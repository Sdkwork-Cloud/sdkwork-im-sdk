import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { legacyReadmeForbiddenTerms } from '../bin/legacy-alias-terms.mjs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

const sharedVerifierSource = read('bin/verify-language-workspace-shared.mjs');
const typescriptWorkspaceVerifierSource = read('bin/verify-typescript-workspace.mjs');

assert.match(
  sharedVerifierSource,
  /readmeRequiredTerms/,
  'verify-language-workspace-shared.mjs must support readmeRequiredTerms for per-language README verification.',
);
assert.match(
  sharedVerifierSource,
  /generatedReadmeRequiredTerms/,
  'verify-language-workspace-shared.mjs must support generatedReadmeRequiredTerms for generated README verification.',
);
assert.match(
  sharedVerifierSource,
  /composedReadmeRequiredTerms/,
  'verify-language-workspace-shared.mjs must support composedReadmeRequiredTerms for composed README verification.',
);
assert.match(
  sharedVerifierSource,
  /readmeForbiddenTerms/,
  'verify-language-workspace-shared.mjs must support readmeForbiddenTerms for per-language README verification.',
);
assert.match(
  sharedVerifierSource,
  /generatedReadmeForbiddenTerms/,
  'verify-language-workspace-shared.mjs must support generatedReadmeForbiddenTerms for generated README verification.',
);
assert.match(
  sharedVerifierSource,
  /composedReadmeForbiddenTerms/,
  'verify-language-workspace-shared.mjs must support composedReadmeForbiddenTerms for composed README verification.',
);

assert.match(
  typescriptWorkspaceVerifierSource,
  /generatedReadmeRequiredTerms:\s*\[[\s\S]*@sdkwork-internal\/im-sdk-generated[\s\S]*\]/,
  'bin/verify-typescript-workspace.mjs must require @sdkwork-internal/im-sdk-generated in generated README verification.',
);
assert.match(
  typescriptWorkspaceVerifierSource,
  /composedReadmeRequiredTerms:\s*\[[\s\S]*@sdkwork-internal\/im-sdk-generated[\s\S]*\]/,
  'bin/verify-typescript-workspace.mjs must require @sdkwork-internal/im-sdk-generated in composed README verification.',
);
assert.match(
  typescriptWorkspaceVerifierSource,
  /composedReadmeForbiddenTerms:\s*\[[\s\S]*@sdkwork\/im-sdk-generated[\s\S]*\]/,
  'bin/verify-typescript-workspace.mjs must forbid @sdkwork/im-sdk-generated in composed README verification.',
);

const languageVerifierExpectations = [
  {
    path: 'bin/verify-typescript-workspace.mjs',
    legacyForbiddenGroup: 'typescript',
    markers: [
      'sdk.createTextMessage(...)',
      'sdk.send(...)',
      'sdk.uploadAndSendMessage(...)',
      'sdk.decodeMessage(...)',
      'createAiImageGenerationMessage',
      'createAiVideoGenerationMessage',
      'createAgentMessage',
      'sdk.sync.ack(...)',
      'context.ack()',
      'sdk.conversations.createAgentDialog(...)',
      'sdk.conversations.postText(...)',
      'sdk.session.resume(...)',
      'sdk.presence.getPresenceMe()',
      'sdk.realtime.listRealtimeEvents(...)',
      'sdk.device.register(...)',
      'sdk.inbox.getInbox()',
      'sdk.stream.open(...)',
      'sdk.media.uploadAndComplete(...)',
      'sdk.media.attachText(...)',
      'sdk.rtc.postJsonSignal(...)',
      'live.messages.on(...)',
      'live.messages.onConversation(...)',
      'live.data.on(...)',
      'live.signals.on(...)',
      'live.signals.onRtcSession(...)',
      'live.events.on(...)',
      'live.lifecycle.onStateChange(...)',
      'live.lifecycle.onError(...)',
      'live.lifecycle.getState()',
      'rtcMode',
      'signalingStreamId',
      'sdk.rtc.issueParticipantCredential(...)',
      'sdk.rtc.getRecordingArtifact(...)',
      'browser and Node.js',
      '@sdkwork-internal/im-sdk-generated',
      'verify-typescript-workspace-concurrency.mjs',
      'verify-typescript-live-contract.mjs',
      'runtime root exports',
      'dead auth scaffolding',
    ],
    forbiddenMarkers: [
      'live.onMessage(',
      'live.onConversationMessage(',
      'live.onData(',
      'live.onSignal(',
      'live.onRawEvent(',
      'live.onStateChange(',
      'live.onError(',
      'createAiImage(',
      'createAiVideo(',
      'participantIds',
      '`connecting`, `connected`, `error`, and `closed`',
      'sdk.generated.',
    ],
    generatedReadmeMarkers: [
      'Generator-owned TypeScript transport workspace',
      '@sdkwork/im-sdk',
      'ImSdkClient',
      'internal-only generated build workspace',
      '@sdkwork-internal/im-sdk-generated',
    ],
    generatedReadmeForbiddenMarkers: [
      '@sdkwork/im-sdk-generated',
      'standalone generated transport package',
      'npm install @sdkwork/im-sdk-generated',
      'Use `@sdkwork/im-sdk-generated` directly',
    ],
    composedReadmeMarkers: [
      'manual-owned authoring source',
      'assemble-single-package.mjs',
      'live.messages.on(...)',
      'live.events.on(...)',
      'live.lifecycle.onStateChange(...)',
      'live.lifecycle.onError(...)',
      '@sdkwork-internal/im-sdk-generated',
    ],
    composedReadmeForbiddenMarkers: [
      'live.onMessage(',
      'live.onRawEvent(',
      'live.onStateChange(',
      'live.onError(',
    ],
    packageDescriptions: [
      'Internal generated transport build workspace for the IM TypeScript SDK',
      'Internal composed authoring workspace for the IM TypeScript SDK',
      'Unified IM SDK package with embedded OpenAPI-generated transport and handwritten realtime/business modules',
    ],
  },
  {
    path: 'bin/verify-flutter-workspace.mjs',
    legacyForbiddenGroup: 'flutter',
    markers: [
      'sdk.createXxxMessage()',
      'sdk.send()',
      'sdk.decodeMessage()',
      'TypeScript',
      'im_sdk',
      'im_sdk_generated',
      'ImSdkClient',
      'AuthApi',
      'PortalApi',
      'sdk.auth',
      'sdk.portal',
      'client.auth',
      'client.portal',
      'WebSocket adapter',
    ],
    generatedReadmeMarkers: [
      'package:im_sdk_generated/im_sdk_generated.dart',
      'AuthApi',
      'PortalApi',
      'client.auth',
      'client.portal',
    ],
    generatedReadmeForbiddenMarkers: [
      'setApiKey',
      'setAccessToken',
      'Access-Token',
    ],
    composedReadmeMarkers: [
      'manual-owned consumer layer',
      'official Flutter app-consumer package',
      'package:im_sdk/im_sdk.dart',
      'AuthApi',
      'PortalApi',
      'sdk.auth',
      'sdk.portal',
      'client.auth',
      'client.portal',
      'WebSocket adapter',
    ],
    packageDescriptions: [
      'Generator-owned Flutter transport SDK for the Craw Chat app API.',
      'Composed IM Flutter SDK built on the generated im_sdk_generated package',
    ],
  },
  {
    path: 'bin/verify-rust-workspace.mjs',
    legacyForbiddenGroup: 'rust',
    markers: ['sdkwork-im-sdk-generated', 'im_sdk', 'ImSdkClient', 'Tier A', 'transport crate'],
    forbiddenMarkers: [
      'set_api_key',
      'set_access_token',
      'API Key',
    ],
    generatedReadmeMarkers: [
      'Generator-owned Rust transport SDK for the Craw Chat app API.',
      'The generated package identity is `sdkwork-im-sdk-generated`.',
      'Craw Chat app routes use bearer authentication only.',
      'client.set_auth_token("your-bearer-token")',
    ],
    generatedReadmeForbiddenMarkers: [
      'set_api_key',
      'set_access_token',
      'API Key',
      'Authentication Modes',
    ],
    composedReadmeMarkers: [
      'manual-owned semantic Rust layer',
      'ImSdkClient',
      'generator output must never land here',
      'session, realtime, devices, inbox, conversations, messages, media, streams, and rtc helpers live here',
      'Rust smoke tests live here',
    ],
    packageDescriptions: [
      'Generator-owned Rust transport SDK for the Craw Chat app API.',
      'Manual-owned IM Rust composed SDK crate.',
    ],
  },
  {
    path: 'bin/verify-java-workspace.mjs',
    legacyForbiddenGroup: 'java',
    markers: ['com.sdkwork:im-sdk-generated', 'ImSdkClient', 'Tier B', 'transport artifact'],
    forbiddenMarkers: ['setApiKey', 'setAccessToken'],
    generatedReadmeMarkers: [
      'Generator-owned Java transport SDK for the Craw Chat app API.',
      'The generated package identity is `com.sdkwork:im-sdk-generated`.',
      'Craw Chat app routes use bearer authentication only.',
      'client.setAuthToken("your-bearer-token");',
    ],
    generatedReadmeForbiddenMarkers: [
      'setApiKey',
      'setAccessToken',
      'Professional Java SDK for SDKWork API.',
      'Authentication Modes',
    ],
    composedReadmeMarkers: [
      'manual-owned semantic reserve',
      'generator output must never land here',
      'future Java business-facing helpers belong here',
    ],
    packageDescriptions: [
      'Generator-owned Java transport SDK for the Craw Chat app API.',
      'Manual-owned Java semantic SDK boundary for IM',
    ],
  },
  {
    path: 'bin/verify-csharp-workspace.mjs',
    legacyForbiddenGroup: 'csharp',
    markers: ['Sdkwork.Im.Sdk.Generated', 'ImSdkClient', 'Tier B', 'transport package'],
    forbiddenMarkers: ['SetApiKey', 'SetAccessToken'],
    generatedReadmeMarkers: [
      'Generator-owned C# transport SDK for the Craw Chat app API.',
      'The generated package identity is `Sdkwork.Im.Sdk.Generated`.',
      'Craw Chat app routes use bearer authentication only.',
      'client.SetAuthToken("your-bearer-token");',
    ],
    generatedReadmeForbiddenMarkers: [
      'SetApiKey',
      'SetAccessToken',
      'Professional C# SDK for SDKWork API.',
      'Authentication Modes',
    ],
    composedReadmeMarkers: [
      'manual-owned semantic reserve',
      'generator output must never land here',
      'future C# business-facing helpers belong here',
    ],
    packageDescriptions: [
      'Generator-owned C# transport SDK for the Craw Chat app API.',
      'Manual-owned C# semantic SDK boundary for IM',
    ],
  },
  {
    path: 'bin/verify-swift-workspace.mjs',
    legacyForbiddenGroup: 'swift',
    markers: ['ImSdkGenerated', 'ImSdkClient', 'Tier B', 'transport package'],
    forbiddenMarkers: ['setApiKey', 'setAccessToken'],
    generatedReadmeMarkers: [
      'Generator-owned Swift transport SDK for the Craw Chat app API.',
      'The generated package identity is `ImSdkGenerated`.',
      'Craw Chat app routes use bearer authentication only.',
      'client.setAuthToken("your-bearer-token")',
    ],
    generatedReadmeForbiddenMarkers: [
      'setApiKey',
      'setAccessToken',
      'Professional Swift SDK for SDKWork API.',
      'Authentication Modes',
    ],
    composedReadmeMarkers: [
      'manual-owned semantic reserve',
      'generator output must never land here',
      'future Swift business-facing helpers belong here',
    ],
    packageDescriptions: [
      'Generator-owned Swift transport SDK for the Craw Chat app API.',
      'Manual-owned Swift semantic SDK boundary for IM',
    ],
  },
  {
    path: 'bin/verify-kotlin-workspace.mjs',
    legacyForbiddenGroup: 'kotlin',
    markers: ['com.sdkwork:im-sdk-generated', 'ImSdkClient', 'Tier B', 'transport artifact'],
    forbiddenMarkers: ['setApiKey', 'setAccessToken'],
    generatedReadmeMarkers: [
      'Generator-owned Kotlin transport SDK for the Craw Chat app API.',
      'The generated package identity is `com.sdkwork:im-sdk-generated`.',
      'Craw Chat app routes use bearer authentication only.',
      'client.setAuthToken("your-bearer-token")',
    ],
    generatedReadmeForbiddenMarkers: [
      'setApiKey',
      'setAccessToken',
      'Professional Kotlin SDK for SDKWork API.',
      'Authentication Modes',
    ],
    composedReadmeMarkers: [
      'manual-owned semantic reserve',
      'generator output must never land here',
      'future Kotlin business-facing helpers belong here',
    ],
    packageDescriptions: [
      'Generator-owned Kotlin transport SDK for the Craw Chat app API.',
      'Manual-owned Kotlin semantic SDK boundary for IM',
    ],
  },
  {
    path: 'bin/verify-go-workspace.mjs',
    legacyForbiddenGroup: 'go',
    markers: ['github.com/sdkwork/im-sdk-generated', 'ImSdkClient', 'Tier B', 'transport module'],
    forbiddenMarkers: ['SetApiKey', 'SetAccessToken'],
    generatedReadmeMarkers: [
      'Generator-owned Go transport SDK for the Craw Chat app API.',
      'The generated package identity is `github.com/sdkwork/im-sdk-generated`.',
      'Craw Chat app routes use bearer authentication only.',
      'client.SetAuthToken("your-bearer-token")',
    ],
    generatedReadmeForbiddenMarkers: [
      'SetApiKey',
      'SetAccessToken',
      'Professional Go SDK for SDKWork API.',
      'Authentication Modes',
    ],
    composedReadmeMarkers: [
      'manual-owned semantic reserve',
      'generator output must never land here',
      'future Go business-facing helpers belong here',
    ],
    packageDescriptions: [
      'Generator-owned Go transport SDK for the Craw Chat app API.',
      'Manual-owned Go semantic SDK boundary for IM',
    ],
  },
  {
    path: 'bin/verify-python-workspace.mjs',
    legacyForbiddenGroup: 'python',
    markers: ['sdkwork-im-sdk-generated', 'ImSdkClient', 'Tier B', 'transport package'],
    forbiddenMarkers: ['set_api_key', 'set_access_token'],
    generatedReadmeMarkers: [
      'Generator-owned Python transport SDK for the Craw Chat app API.',
      'The generated package identity is `sdkwork-im-sdk-generated`.',
      'Craw Chat app routes use bearer authentication only.',
      'client.set_auth_token("your-bearer-token")',
    ],
    generatedReadmeForbiddenMarkers: [
      'set_api_key',
      'set_access_token',
      'Professional Python SDK for SDKWork API.',
      'Authentication Modes',
    ],
    composedReadmeMarkers: [
      'manual-owned semantic reserve',
      'generator output must never land here',
      'future Python business-facing helpers belong here',
    ],
    packageDescriptions: [
      'Generator-owned Python transport SDK for the Craw Chat app API.',
      'Manual-owned Python semantic SDK boundary for IM',
    ],
  },
];

for (const expectation of languageVerifierExpectations) {
  const source = read(expectation.path);

  if (expectation.markers) {
    assert.match(
      source,
      /readmeRequiredTerms/,
      `${expectation.path} must pass readmeRequiredTerms to the shared workspace verifier.`,
    );
  }

  for (const marker of expectation.markers || []) {
    assert.match(
      source,
      new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `${expectation.path} must require README marker ${marker}.`,
    );
  }

  if (expectation.legacyForbiddenGroup) {
    const legacySpreadPattern = new RegExp(
      `\\.\\.\\.legacyReadmeForbiddenTerms\\.${expectation.legacyForbiddenGroup}`,
    );
    assert.match(
      source,
      /legacyReadmeForbiddenTerms/,
      `${expectation.path} must import shared legacy alias forbidden terms.`,
    );
    for (const sectionLabel of [
      'readmeForbiddenTerms',
      'generatedReadmeForbiddenTerms',
      'composedReadmeForbiddenTerms',
    ]) {
      assert.match(
        source,
        new RegExp(`${sectionLabel}:[\\s\\S]*?${legacySpreadPattern.source}`),
        `${expectation.path} must source ${sectionLabel} legacy markers from legacyReadmeForbiddenTerms.${expectation.legacyForbiddenGroup}.`,
      );
    }
    assert.ok(
      Array.isArray(legacyReadmeForbiddenTerms[expectation.legacyForbiddenGroup])
      && legacyReadmeForbiddenTerms[expectation.legacyForbiddenGroup].length > 0,
      `${expectation.path} must use a non-empty legacy alias marker group.`,
    );
  }

  if (expectation.forbiddenMarkers) {
    assert.match(
      source,
      /readmeForbiddenTerms/,
      `${expectation.path} must pass readmeForbiddenTerms to the shared workspace verifier.`,
    );

    for (const marker of expectation.forbiddenMarkers) {
      assert.match(
        source,
        new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        `${expectation.path} must forbid README marker ${marker}.`,
      );
    }
  }

  if (expectation.generatedReadmeMarkers) {
    assert.match(
      source,
      /generatedReadmeRequiredTerms/,
      `${expectation.path} must pass generatedReadmeRequiredTerms to the shared workspace verifier.`,
    );

    for (const marker of expectation.generatedReadmeMarkers) {
      assert.match(
        source,
        new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        `${expectation.path} must require generated README marker ${marker}.`,
      );
    }
  }

  if (expectation.generatedReadmeForbiddenMarkers) {
    assert.match(
      source,
      /generatedReadmeForbiddenTerms/,
      `${expectation.path} must pass generatedReadmeForbiddenTerms to the shared workspace verifier.`,
    );

    for (const marker of expectation.generatedReadmeForbiddenMarkers) {
      assert.match(
        source,
        new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        `${expectation.path} must forbid generated README marker ${marker}.`,
      );
    }
  }

  if (expectation.composedReadmeMarkers) {
    assert.match(
      source,
      /composedReadmeRequiredTerms/,
      `${expectation.path} must pass composedReadmeRequiredTerms to the shared workspace verifier.`,
    );

    for (const marker of expectation.composedReadmeMarkers) {
      assert.match(
        source,
        new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        `${expectation.path} must require composed README marker ${marker}.`,
      );
    }
  }

  if (expectation.composedReadmeForbiddenMarkers) {
    assert.match(
      source,
      /composedReadmeForbiddenTerms/,
      `${expectation.path} must pass composedReadmeForbiddenTerms to the shared workspace verifier.`,
    );

    for (const marker of expectation.composedReadmeForbiddenMarkers) {
      assert.match(
        source,
        new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        `${expectation.path} must forbid composed README marker ${marker}.`,
      );
    }
  }

  if (expectation.packageDescriptions) {
    assert.match(
      source,
      /expectedPackageDescriptions/,
      `${expectation.path} must pass expectedPackageDescriptions to the shared workspace verifier.`,
    );

    for (const description of expectation.packageDescriptions) {
      assert.match(
        source,
        new RegExp(description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        `${expectation.path} must validate package description ${description}.`,
      );
    }
  }
}

console.log('language workspace README term contract test passed');
