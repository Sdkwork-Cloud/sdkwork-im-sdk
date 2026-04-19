import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(testDir, '..');
const repoRoot = path.resolve(workspaceRoot, '..', '..');
const removedFlutterGenericClientName = ['Im', 'Client'].join('');
const removedFlutterDocsPrimaryClientPattern = new RegExp(
  `Flutter primary client: \`${removedFlutterGenericClientName}\``,
);
const removedFlutterPrimaryClientPattern = new RegExp(
  `primary client: \`${removedFlutterGenericClientName}\``,
);
const removedFlutterShippedClientPattern = new RegExp(
  `\`${removedFlutterGenericClientName}\` ships today`,
);
const removedFlutterGenericClientPattern = new RegExp(removedFlutterGenericClientName);

function readWorkspace(relativePath) {
  return readFileSync(path.join(workspaceRoot, relativePath), 'utf8');
}

function readRepo(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

const sdksOverviewSource = readRepo('sdks/README.md');
const appWorkspaceMatrixRow =
  sdksOverviewSource.match(/\| `sdkwork-im-sdk` \|[^\n]+/)?.[0] ?? '';

assert.notEqual(
  appWorkspaceMatrixRow,
  '',
  'sdks/README.md must keep a workspace matrix row for sdkwork-im-sdk',
);
assert.match(
  appWorkspaceMatrixRow,
  /@sdkwork\/im-sdk/,
  'sdks/README.md must list @sdkwork/im-sdk as the app TypeScript consumer package',
);
assert.match(
  appWorkspaceMatrixRow,
  /@sdkwork-internal\/im-sdk-generated/,
  'sdks/README.md must list @sdkwork-internal/im-sdk-generated as the internal app TypeScript generated package',
);
assert.match(
  appWorkspaceMatrixRow,
  /im_sdk_generated/,
  'sdks/README.md must keep im_sdk_generated as the Flutter generated transport package',
);
assert.doesNotMatch(
  appWorkspaceMatrixRow,
  /@sdkwork\/im-sdk-generated/,
  'sdks/README.md must not list @sdkwork/im-sdk-generated in the app SDK workspace row',
);

const publicDocsSyncSource = readWorkspace('docs/sites/README.md');
assert.match(
  publicDocsSyncSource,
  /Flutter primary client: `ImSdkClient`/,
  'docs/sites/README.md must standardize the Flutter primary client as ImSdkClient',
);
assert.doesNotMatch(
  publicDocsSyncSource,
  removedFlutterDocsPrimaryClientPattern,
  'docs/sites/README.md must not keep the removed Flutter generic client name',
);

const packageStandardsSource = readWorkspace('docs/package-standards.md');
const flutterStandardSection =
  packageStandardsSource.match(/## Flutter Standard[\s\S]*?(?=\n## Tier B Reserve Standard)/)?.[0] ??
  '';
const tierBReserveSection =
  packageStandardsSource.match(/## Tier B Reserve Standard[\s\S]*?(?=\n## Shared Naming Rules)/)?.[0] ??
  '';

assert.notEqual(
  flutterStandardSection,
  '',
  'docs/package-standards.md must keep a dedicated Flutter Standard section',
);
assert.match(
  flutterStandardSection,
  /primary client: `ImSdkClient`/,
  'docs/package-standards.md must standardize the Flutter primary client as ImSdkClient',
);
assert.doesNotMatch(
  flutterStandardSection,
  removedFlutterPrimaryClientPattern,
  'docs/package-standards.md must not keep the removed Flutter generic client name',
);
assert.notEqual(
  tierBReserveSection,
  '',
  'docs/package-standards.md must keep a dedicated Tier B Reserve Standard section',
);
assert.match(
  tierBReserveSection,
  /composed boundary must exist as a real manifest-backed package boundary/,
  'docs/package-standards.md must define manifest-backed reserved composed boundaries for Tier B languages',
);
assert.match(
  tierBReserveSection,
  /composed boundary status stays `reserved` in `\.sdkwork-assembly\.json`/,
  'docs/package-standards.md must define reserved status persistence for Tier B composed boundaries',
);
assert.match(
  tierBReserveSection,
  /Java reserved composed package: `com\.sdkwork:im-sdk`/,
  'docs/package-standards.md must document the Java reserved composed package identity',
);
assert.match(
  tierBReserveSection,
  /C# reserved composed package: `Sdkwork\.Im\.Sdk`/,
  'docs/package-standards.md must document the C# reserved composed package identity',
);
assert.match(
  tierBReserveSection,
  /Swift reserved composed package: `ImSdk`/,
  'docs/package-standards.md must document the Swift reserved composed package identity',
);
assert.match(
  tierBReserveSection,
  /Go reserved composed package: `github\.com\/sdkwork\/im-sdk`/,
  'docs/package-standards.md must document the Go reserved composed package identity',
);

const capabilityMatrixSource = readWorkspace('docs/multilanguage-capability-matrix.md');
const flutterCapabilityRow = capabilityMatrixSource.match(/\| Flutter \|[^\n]+/)?.[0] ?? '';
const tierBCapabilitySection =
  capabilityMatrixSource.match(/## Tier B[\s\S]*?(?=\n## Matrix)/)?.[0] ?? '';

assert.notEqual(
  flutterCapabilityRow,
  '',
  'docs/multilanguage-capability-matrix.md must keep a Flutter matrix row',
);
assert.match(
  flutterCapabilityRow,
  /`ImSdkClient` ships today/,
  'docs/multilanguage-capability-matrix.md must record ImSdkClient as the shipped Flutter client',
);
assert.doesNotMatch(
  flutterCapabilityRow,
  removedFlutterShippedClientPattern,
  'docs/multilanguage-capability-matrix.md must not claim the removed generic Flutter client still ships today',
);
assert.match(
  tierBCapabilitySection,
  /manifest-backed reserved `composed` boundary/,
  'docs/multilanguage-capability-matrix.md must describe Tier B as a manifest-backed reserved composed boundary',
);
assert.match(
  tierBCapabilitySection,
  /`status = reserved` in `\.sdkwork-assembly\.json`/,
  'docs/multilanguage-capability-matrix.md must document reserved Tier B assembly status',
);

const auditReportSource = readWorkspace('docs/multilanguage-audit-report.md');
const flutterAuditSection =
  auditReportSource.match(/## Flutter[\s\S]*?(?=\n## Rust)/)?.[0] ?? '';
const tierBReserveAuditSection =
  auditReportSource.match(/## Tier B Reserve Baseline[\s\S]*?(?=\n## TypeScript)/)?.[0] ?? '';

assert.notEqual(
  flutterAuditSection,
  '',
  'docs/multilanguage-audit-report.md must keep a Flutter audit section',
);
assert.match(
  flutterAuditSection,
  /client naming correctness: `ImSdkClient` remains correct/,
  'docs/multilanguage-audit-report.md must record ImSdkClient as the correct Flutter client name',
);
assert.doesNotMatch(
  flutterAuditSection,
  removedFlutterGenericClientPattern,
  'docs/multilanguage-audit-report.md must not retain the removed Flutter generic client name',
);
assert.notEqual(
  tierBReserveAuditSection,
  '',
  'docs/multilanguage-audit-report.md must keep a Tier B reserve baseline section',
);
assert.match(
  tierBReserveAuditSection,
  /manifest-backed `composed` package boundary/,
  'docs/multilanguage-audit-report.md must document manifest-backed Tier B reserve boundaries',
);
assert.match(
  tierBReserveAuditSection,
  /empty semantic version and `status = reserved` in[\s\S]*`\.sdkwork-assembly\.json`/,
  'docs/multilanguage-audit-report.md must document reserved Tier B version and status rules',
);

const generatorStandardSource = readWorkspace('docs/multilanguage-generator-standard.md');
const tierBReserveGeneratorSection =
  generatorStandardSource.match(/Tier B reserve rule:[\s\S]*?(?=\nSpecial rule for TypeScript:)/)?.[0] ?? '';
assert.notEqual(
  tierBReserveGeneratorSection,
  '',
  'docs/multilanguage-generator-standard.md must keep a Tier B reserve rule section',
);
assert.match(
  tierBReserveGeneratorSection,
  /real manifest-backed reserved/,
  'docs/multilanguage-generator-standard.md must require real manifest-backed reserved Tier B boundaries',
);
assert.match(
  tierBReserveGeneratorSection,
  /`status = reserved` until promotion/,
  'docs/multilanguage-generator-standard.md must require reserved assembly status until semantic promotion',
);

const generationOwnershipSource = readRepo('docs/sites/sdk/generation-and-ownership.md');
assert.match(
  generationOwnershipSource,
  /ImSdkClient/,
  'docs/sites/sdk/generation-and-ownership.md must use ImSdkClient when describing semantic client names',
);
assert.doesNotMatch(
  generationOwnershipSource,
  removedFlutterGenericClientPattern,
  'docs/sites/sdk/generation-and-ownership.md must not use the removed generic client name',
);

const workspaceReadmeSource = readWorkspace('README.md');
const workspaceReleaseSection =
  workspaceReadmeSource.match(/## Release[\s\S]*?(?=\n## Workspace Layout)/)?.[0] ?? '';

assert.notEqual(
  workspaceReleaseSection,
  '',
  'sdks/sdkwork-im-sdk/README.md must keep a release status section',
);
assert.match(
  workspaceReleaseSection,
  /Release Snapshot Boundary/,
  'sdks/sdkwork-im-sdk/README.md must describe the current state as a release snapshot, not a placeholder',
);
assert.match(
  workspaceReleaseSection,
  /state = generated_pending_publication/,
  'sdks/sdkwork-im-sdk/README.md must record the generated_pending_publication catalog state',
);
assert.match(
  workspaceReleaseSection,
  /generationStatus = generated/,
  'sdks/sdkwork-im-sdk/README.md must record generationStatus = generated',
);
assert.doesNotMatch(
  workspaceReleaseSection,
  /template_only_pending_generation/,
  'sdks/sdkwork-im-sdk/README.md must not retain the template_only_pending_generation state',
);

const flutterWorkspaceReadmeSource = readWorkspace('sdkwork-im-sdk-flutter/README.md');
const flutterReleaseSection =
  flutterWorkspaceReadmeSource.match(/## Release[\s\S]*?$/)?.[0] ?? '';

assert.notEqual(
  flutterReleaseSection,
  '',
  'sdkwork-im-sdk-flutter/README.md must keep a release status section',
);
assert.match(
  flutterReleaseSection,
  /Release Snapshot Boundary/,
  'sdkwork-im-sdk-flutter/README.md must describe the current state as a release snapshot, not a placeholder',
);
assert.match(
  flutterReleaseSection,
  /generationStatus = generated/,
  'sdkwork-im-sdk-flutter/README.md must record generationStatus = generated',
);
assert.match(
  flutterReleaseSection,
  /releaseStatus = not_published/,
  'sdkwork-im-sdk-flutter/README.md must record releaseStatus = not_published',
);
assert.doesNotMatch(
  flutterReleaseSection,
  /template_only_pending_generation/,
  'sdkwork-im-sdk-flutter/README.md must not retain the template_only_pending_generation state',
);

const typescriptGeneratedReadmeSource = readWorkspace(
  'sdkwork-im-sdk-typescript/generated/server-openapi/README.md',
);
assert.match(
  typescriptGeneratedReadmeSource,
  /@sdkwork-internal\/im-sdk-generated/,
  'sdkwork-im-sdk-typescript/generated/server-openapi/README.md must state the internal generated package identity explicitly',
);

const typescriptComposedReadmeSource = readWorkspace(
  'sdkwork-im-sdk-typescript/composed/README.md',
);
assert.match(
  typescriptComposedReadmeSource,
  /@sdkwork-internal\/im-sdk-generated/,
  'sdkwork-im-sdk-typescript/composed/README.md must point maintainers at the internal generated package identity explicitly',
);

console.log('doc standardization contract test passed');

