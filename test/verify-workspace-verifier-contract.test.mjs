import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

const legacyTypeToken = ['back', 'end'].join('');
const legacyGeneratedConfigPattern = new RegExp(`TypeScript generated ${legacyTypeToken} config`);
const legacyPathHelperPattern = new RegExp(`\\b${legacyTypeToken}ApiPath\\b`);
const legacyResolutionPattern = new RegExp(`${legacyTypeToken} resolution`);
const legacyGeneratedTypesPattern = new RegExp(
  `types\\.ts must source generated ${legacyTypeToken} types through \\.\\/generated-client-types\\.js\\.`,
);

const sharedVerifierSource = read('bin/verify-language-workspace-shared.mjs');
const typescriptVerifierSource = read('bin/verify-typescript-workspace.mjs');
const flutterVerifierSource = read('bin/verify-flutter-workspace.mjs');
const rustVerifierSource = read('bin/verify-rust-workspace.mjs');
const javaVerifierSource = read('bin/verify-java-workspace.mjs');
const csharpVerifierSource = read('bin/verify-csharp-workspace.mjs');
const swiftVerifierSource = read('bin/verify-swift-workspace.mjs');
const kotlinVerifierSource = read('bin/verify-kotlin-workspace.mjs');
const goVerifierSource = read('bin/verify-go-workspace.mjs');
const pythonVerifierSource = read('bin/verify-python-workspace.mjs');
const authSurfaceVerifierSource = read('bin/verify-auth-surface-alignment.mjs');
const verifySdkSource = read('bin/verify-sdk.mjs');
const typescriptWorkspaceConcurrencyPsSource = read('bin/verify-typescript-workspace-concurrency.ps1');
const typescriptUsageSurfaceVerifierSource = read('bin/verify-typescript-usage-surface.mjs');
const typescriptPublicApiBoundaryVerifierSource = read('bin/verify-typescript-public-api-boundary.mjs');

assert.match(
  sharedVerifierSource,
  /consumerPackage/,
  'Shared language workspace verifier must support consumerPackage validation.',
);
assert.match(
  sharedVerifierSource,
  /expectedPackageFields/,
  'Shared language workspace verifier must support explicit per-layer package field validation.',
);
assert.match(
  sharedVerifierSource,
  /expectedManifestFields/,
  'Shared language workspace verifier must support explicit per-layer manifest field validation.',
);
assert.match(
  sharedVerifierSource,
  /expectedPackageLayers|requiredPackageLayers/,
  'Shared language workspace verifier must support explicit package-layer validation.',
);
assert.match(
  sharedVerifierSource,
  /Generated sdkwork-sdk\.json sdkType mismatch: expected/,
  'Shared language workspace verifier must enforce app-facing generated sdkType metadata.',
);
assert.match(
  sharedVerifierSource,
  /Generated sdkwork-sdk\.json language mismatch: expected/,
  'Shared language workspace verifier must enforce generated sdk metadata language alignment.',
);
assert.match(
  sharedVerifierSource,
  /Generated sdkwork-sdk\.json packageName mismatch: expected/,
  'Shared language workspace verifier must enforce generated sdk metadata packageName alignment with assembly.',
);
assert.match(
  sharedVerifierSource,
  /Generated sdkwork-sdk\.json version mismatch: expected/,
  'Shared language workspace verifier must enforce generated sdk metadata version alignment with assembly.',
);
assert.match(
  sharedVerifierSource,
  /Generated sdkwork-sdk\.json description mismatch: expected/,
  'Shared language workspace verifier must enforce generated sdk metadata description alignment with assembly.',
);
assert.match(
  sharedVerifierSource,
  /Assembly generated description mismatch: expected/,
  'Shared language workspace verifier must enforce generated entry description alignment.',
);
assert.match(
  sharedVerifierSource,
  /Assembly generated package description mismatch: expected/,
  'Shared language workspace verifier must enforce generated package description alignment.',
);
assert.match(
  sharedVerifierSource,
  /Assembly .* package description mismatch: expected/,
  'Shared language workspace verifier must enforce per-layer package description alignment.',
);
assert.match(
  sharedVerifierSource,
  /Assembly consumerPackage must record its package layer\./,
  'Shared language workspace verifier must require consumerPackage layer metadata.',
);
assert.match(
  sharedVerifierSource,
  /Assembly consumerPackage .* mismatch with .* package layer: expected/,
  'Shared language workspace verifier must align consumerPackage metadata with its package-layer entry.',
);
assert.match(
  sharedVerifierSource,
  /Assembly .* package .* mismatch: expected/,
  'Shared language workspace verifier must enforce per-layer package field expectations.',
);
assert.match(
  sharedVerifierSource,
  /readManifestMetadata/,
  'Shared language workspace verifier must read real package manifest files.',
);
for (const marker of ['archiveBaseName', 'goVersion', 'requiresPython', 'readme']) {
  assert.match(
    sharedVerifierSource,
    new RegExp(marker),
    `Shared language workspace verifier must expose manifest metadata field ${marker}.`,
  );
}
assert.match(
  sharedVerifierSource,
  /Missing .* package manifest: /,
  'Shared language workspace verifier must fail when a declared package manifest is missing.',
);
assert.match(
  sharedVerifierSource,
  /Manifest .* package .* mismatch: expected/,
  'Shared language workspace verifier must enforce manifest metadata alignment.',
);
assert.match(
  sharedVerifierSource,
  /Assembly generated package name mismatch: expected/,
  'Shared language workspace verifier must enforce assembly generated package identity alignment.',
);
for (const marker of [
  'Release Snapshot Boundary',
  'state = generated_pending_publication',
  'generationStatus = generated',
  'releaseStatus = not_published',
  'plannedVersion = null',
  'versionStatus = version_unassigned_pending_freeze',
  'versionDecisionSourcePath = null',
  'template_only_pending_generation',
]) {
  assert.match(
    sharedVerifierSource,
    new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `Shared language workspace verifier must enforce release marker ${marker}.`,
  );
}

assert.match(
  typescriptVerifierSource,
  /verifyLanguageWorkspace/,
  'TypeScript workspace verifier must reuse shared workspace assembly validation.',
);
assert.match(
  typescriptVerifierSource,
  /consumerPackage:[\s\S]*@sdkwork\/im-sdk/,
  'TypeScript workspace verifier must validate @sdkwork/im-sdk as the consumer package.',
);
assert.match(
  typescriptVerifierSource,
  /requiredPackageLayers:[\s\S]*root/,
  'TypeScript workspace verifier must validate the assembled root package layer.',
);
assert.match(
  typescriptVerifierSource,
  /expectedPackageDescriptions:[\s\S]*Internal generated transport build workspace for the IM TypeScript SDK[\s\S]*Internal composed authoring workspace for the IM TypeScript SDK[\s\S]*Unified IM SDK package with embedded OpenAPI-generated transport and handwritten realtime\/business modules/,
  'TypeScript workspace verifier must validate generated, composed, and root package descriptions.',
);
assert.match(
  typescriptVerifierSource,
  /consumerPackage:[\s\S]*description:[\s\S]*Unified IM SDK package with embedded OpenAPI-generated transport and handwritten realtime\/business modules/,
  'TypeScript workspace verifier must validate the root consumer package description.',
);
assert.match(
  typescriptVerifierSource,
  /expectedPackageFields:[\s\S]*generated:[\s\S]*private:[\s\S]*true[\s\S]*composed:[\s\S]*private:[\s\S]*true[\s\S]*version:[\s\S]*0\.1\.0[\s\S]*root:[\s\S]*private:[\s\S]*false[\s\S]*version:[\s\S]*0\.1\.0/,
  'TypeScript workspace verifier must validate package visibility and version fields across generated, composed, and root layers.',
);
assert.match(
  typescriptVerifierSource,
  /consumerPackage:[\s\S]*layer:[\s\S]*root[\s\S]*version:[\s\S]*0\.1\.0[\s\S]*private:[\s\S]*false/,
  'TypeScript workspace verifier must validate root consumer package layer, version, and visibility.',
);
assert.match(
  typescriptVerifierSource,
  /expectedManifestFields:[\s\S]*generated:[\s\S]*main:[\s\S]*\.\/dist\/index\.cjs[\s\S]*module:[\s\S]*\.\/dist\/index\.js[\s\S]*types:[\s\S]*\.\/dist\/index\.d\.ts[\s\S]*root:[\s\S]*main:[\s\S]*\.\/dist\/index\.js/,
  'TypeScript workspace verifier must validate manifest entrypoints across generated, composed, and root packages.',
);

assert.match(
  flutterVerifierSource,
  /verifyLanguageWorkspace/,
  'Flutter workspace verifier must reuse shared workspace assembly validation.',
);
assert.match(
  flutterVerifierSource,
  /consumerPackage:[\s\S]*im_sdk/,
  'Flutter workspace verifier must validate im_sdk as the consumer package.',
);
assert.match(
  flutterVerifierSource,
  /expectedPackageDescriptions:[\s\S]*Generator-owned Flutter transport SDK for the Craw Chat app API\.[\s\S]*Composed IM Flutter SDK built on the generated im_sdk_generated package/,
  'Flutter workspace verifier must validate generated and composed package descriptions.',
);
assert.match(
  flutterVerifierSource,
  /consumerPackage:[\s\S]*description:[\s\S]*Composed IM Flutter SDK built on the generated im_sdk_generated package/,
  'Flutter workspace verifier must validate the composed consumer package description.',
);
assert.match(
  flutterVerifierSource,
  /expectedPackageFields:[\s\S]*composed:[\s\S]*version:[\s\S]*0\.1\.0/,
  'Flutter workspace verifier must validate the composed package version field.',
);
assert.match(
  flutterVerifierSource,
  /consumerPackage:[\s\S]*layer:[\s\S]*composed[\s\S]*version:[\s\S]*0\.1\.0/,
  'Flutter workspace verifier must validate the composed consumer package layer and version.',
);

assert.match(
  rustVerifierSource,
  /requiredPackageLayers:[\s\S]*generated[\s\S]*composed/,
  'Rust workspace verifier must require generated and composed package layers.',
);
assert.match(
  rustVerifierSource,
  /expectedPackageFields:[\s\S]*composed:[\s\S]*version:[\s\S]*0\.1\.0/,
  'Rust workspace verifier must validate the composed package version field.',
);
assert.match(
  rustVerifierSource,
  /expectedManifestFields:[\s\S]*generated:[\s\S]*library:[\s\S]*src\/lib\.rs[\s\S]*composed:[\s\S]*publish:[\s\S]*false[\s\S]*library:[\s\S]*src\/lib\.rs/,
  'Rust workspace verifier must validate generated and composed Cargo manifest fields.',
);

assert.match(
  javaVerifierSource,
  /requiredPackageLayers:[\s\S]*generated[\s\S]*composed/,
  'Java workspace verifier must require generated and composed package layers.',
);
assert.match(
  javaVerifierSource,
  /expectedPackageFields:[\s\S]*composed:[\s\S]*version:[\s\S]*''[\s\S]*status:[\s\S]*'reserved'/,
  'Java workspace verifier must validate reserved composed package version and status fields.',
);
assert.match(
  javaVerifierSource,
  /expectedManifestFields:[\s\S]*generated:[\s\S]*displayName:[\s\S]*com\.sdkwork:im-sdk-generated[\s\S]*composed:[\s\S]*displayName:[\s\S]*com\.sdkwork:im-sdk/,
  'Java workspace verifier must validate generated and reserved composed pom display names.',
);
assert.match(
  csharpVerifierSource,
  /expectedManifestFields:[\s\S]*generated:[\s\S]*assemblyName:[\s\S]*Sdkwork\.Im\.Sdk\.Generated[\s\S]*rootNamespace:[\s\S]*Sdkwork\.Im\.Sdk\.Generated[\s\S]*composed:[\s\S]*assemblyName:[\s\S]*Sdkwork\.Im\.Sdk/,
  'C# workspace verifier must validate generated and reserved composed csproj manifest fields.',
);
assert.match(
  swiftVerifierSource,
  /expectedManifestFields:[\s\S]*generated:[\s\S]*productName:[\s\S]*ImSdkGenerated[\s\S]*targetName:[\s\S]*ImSdkGenerated[\s\S]*composed:[\s\S]*productName:[\s\S]*ImSdk[\s\S]*targetName:[\s\S]*ImSdk/,
  'Swift workspace verifier must validate generated and reserved composed Package.swift manifest fields.',
);
assert.match(
  kotlinVerifierSource,
  /expectedManifestFields:[\s\S]*generated:[\s\S]*group:[\s\S]*com\.sdkwork[\s\S]*archiveBaseName:[\s\S]*im-sdk-generated[\s\S]*composed:[\s\S]*group:[\s\S]*com\.sdkwork[\s\S]*archiveBaseName:[\s\S]*im-sdk/,
  'Kotlin workspace verifier must validate generated and reserved composed Gradle manifest fields.',
);
assert.match(
  goVerifierSource,
  /expectedManifestFields:[\s\S]*generated:[\s\S]*goVersion:[\s\S]*1\.21[\s\S]*composed:[\s\S]*goVersion:[\s\S]*1\.21/,
  'Go workspace verifier must validate generated and reserved composed go.mod fields.',
);
assert.match(
  pythonVerifierSource,
  /expectedManifestFields:[\s\S]*generated:[\s\S]*readme:[\s\S]*README\.md[\s\S]*requiresPython:[\s\S]*>=3\.8[\s\S]*composed:[\s\S]*readme:[\s\S]*README\.md[\s\S]*requiresPython:[\s\S]*>=3\.8/,
  'Python workspace verifier must validate generated and reserved composed pyproject fields.',
);

for (const marker of [
  'apiPath',
  'TypeScript generated config must not expose apiKey.',
  'TypeScript generated config must not expose accessToken.',
  'TypeScript generated config must not expose authMode.',
  'TypeScript generated config must expose authToken.',
  'C# generated client must not expose SetApiKey(...).',
  'Java generated client must not expose setApiKey(...).',
  'Kotlin generated client must not expose setApiKey(...).',
  'Go generated config must not expose ApiKey.',
  'Go generated config must not expose AccessToken.',
  'Python generated client must not expose set_api_key(...).',
  'Swift generated client must not expose setApiKey(...).',
]) {
  assert.match(
    authSurfaceVerifierSource,
    new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `Auth surface verifier must use standardized wording: ${marker}`,
  );
}
for (const marker of [
  "'csharp'",
  "'java'",
  "'kotlin'",
  "'go'",
  "'python'",
  "'swift'",
]) {
  assert.match(
    authSurfaceVerifierSource,
    new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `Auth surface verifier must support ${marker} language coverage.`,
  );
}
assert.match(
  verifySdkSource,
  /verify-auth-surface-alignment\.mjs/,
  'verify-sdk must execute auth surface alignment verification.',
);
assert.match(
  typescriptWorkspaceConcurrencyPsSource,
  /Wait-Process/,
  'TypeScript workspace concurrency PowerShell verifier must use Wait-Process for stable child-process waiting.',
);
assert.doesNotMatch(
  typescriptWorkspaceConcurrencyPsSource,
  /WaitForExit\(/,
  'TypeScript workspace concurrency PowerShell verifier must not use fragile WaitForExit(timeout) calls.',
);
assert.doesNotMatch(
  authSurfaceVerifierSource,
  legacyGeneratedConfigPattern,
  'Auth surface verifier must not use legacy transport-specific generated config wording.',
);
assert.doesNotMatch(
  authSurfaceVerifierSource,
  legacyPathHelperPattern,
  'Auth surface verifier must not require the legacy transport-specific path helper export.',
);

for (const marker of [
  'generated client resolution accepts flat constructor options',
  'generated client resolution does not read generatedConfig from public constructor options',
]) {
  assert.match(
    typescriptUsageSurfaceVerifierSource,
    new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `TypeScript usage surface verifier must use standardized wording: ${marker}`,
  );
}
assert.doesNotMatch(
  typescriptUsageSurfaceVerifierSource,
  legacyResolutionPattern,
  'TypeScript usage surface verifier must not use legacy transport-specific resolution wording.',
);

assert.match(
  typescriptPublicApiBoundaryVerifierSource,
  /types\.ts must source generated client types through \.\/generated-client-types\.js\./,
  'TypeScript public API boundary verifier must use generated client type wording.',
);
assert.doesNotMatch(
  typescriptPublicApiBoundaryVerifierSource,
  legacyGeneratedTypesPattern,
  'TypeScript public API boundary verifier must not use legacy transport-specific generated type wording.',
);

console.log('workspace verifier contract test passed');
