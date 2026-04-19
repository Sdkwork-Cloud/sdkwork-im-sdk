import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  escapeRegExp,
  legacyAliasContentPatterns,
  legacyAliasPathPatterns,
  legacyAliasTerms,
  legacyGeneratedClientTerms,
  legacyReadmeForbiddenTerms,
} from '../bin/legacy-alias-terms.mjs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

const helperSource = read('bin/legacy-alias-terms.mjs');
const verifierSource = read('bin/verify-no-legacy-alias-surface.mjs');
const verifySdkSource = read('bin/verify-sdk.mjs');
const automationSource = read('bin/verify-sdk-automation.mjs');
const docsContractRunnerSource = read('bin/verify-docs-contract-tests.mjs');
const legacyWord = ['back', 'end'].join('');
const pascalLegacyWord = `${legacyWord.slice(0, 1).toUpperCase()}${legacyWord.slice(1)}`;
const legacyProductHyphenPrefix = ['craw', 'chat'].join('-');
const legacyProductPackageSuffix = `${legacyProductHyphenPrefix}-${legacyWord}-sdk`;

const expectedLegacyTerms = {
  typescriptPackage: `@sdkwork/${legacyProductPackageSuffix}`,
  hyphenPackage: `sdkwork-${legacyProductPackageSuffix}`,
  javaPackage: `com.sdkwork:${legacyProductPackageSuffix}`,
  dotNetPackage: `Sdkwork.Im.${pascalLegacyWord}Sdk`,
  goPackage: `github.com/sdkwork/${legacyProductPackageSuffix}`,
  swiftPackage: `Im${pascalLegacyWord}Sdk`,
  clientClass: `Sdkwork${pascalLegacyWord}Client`,
  generatedFactory: `createGenerated${pascalLegacyWord}Client`,
  genericClientClass: `${pascalLegacyWord}Client`,
  flutterPackageName: `${legacyWord}_sdk`,
  flutterPackageImport: `package:${legacyWord}_sdk/${legacyWord}_sdk.dart`,
  flutterClientFile: `${legacyWord}_client.dart`,
  flutterSdkFile: `${legacyWord}_sdk.dart`,
  clientLikeStem: `${legacyWord}-client-like`,
  generatedTypesStem: `generated-${legacyWord}-types`,
};

for (const [key, expectedValue] of Object.entries(expectedLegacyTerms)) {
  assert.equal(legacyAliasTerms[key], expectedValue, `legacy alias term ${key} must stay standardized`);
}

assert.deepEqual(legacyReadmeForbiddenTerms.typescript, [
  legacyAliasTerms.typescriptPackage,
  legacyAliasTerms.clientClass,
  legacyAliasTerms.generatedFactory,
  legacyGeneratedClientTerms.clientClass,
  legacyGeneratedClientTerms.factory,
]);
assert.deepEqual(legacyReadmeForbiddenTerms.flutter, [
  legacyAliasTerms.flutterPackageName,
  legacyAliasTerms.flutterPackageImport,
  legacyAliasTerms.genericClientClass,
]);
assert.deepEqual(legacyReadmeForbiddenTerms.rust, [legacyAliasTerms.hyphenPackage]);
assert.deepEqual(legacyReadmeForbiddenTerms.java, [
  legacyAliasTerms.javaPackage,
  legacyAliasTerms.clientClass,
]);
assert.deepEqual(legacyReadmeForbiddenTerms.csharp, [
  legacyAliasTerms.dotNetPackage,
  legacyAliasTerms.clientClass,
]);
assert.deepEqual(legacyReadmeForbiddenTerms.swift, [legacyAliasTerms.swiftPackage]);
assert.deepEqual(legacyReadmeForbiddenTerms.kotlin, [legacyAliasTerms.javaPackage]);
assert.deepEqual(legacyReadmeForbiddenTerms.go, [legacyAliasTerms.goPackage]);
assert.deepEqual(legacyReadmeForbiddenTerms.python, [legacyAliasTerms.hyphenPackage]);

assert.match(
  docsContractRunnerSource,
  /verify-no-legacy-alias-surface-contract\.test\.mjs/,
  'verify-docs-contract-tests.mjs must require verify-no-legacy-alias-surface-contract.test.mjs.',
);

assert.match(
  verifySdkSource,
  /verify-no-legacy-alias-surface\.mjs/,
  'verify-sdk.mjs must run verify-no-legacy-alias-surface.mjs.',
);

assert.match(
  automationSource,
  /verify-no-legacy-alias-surface\.mjs/,
  'verify-sdk-automation.mjs must guard verify-no-legacy-alias-surface.mjs wiring.',
);

assert.match(
  verifierSource,
  /legacy-alias-terms\.mjs/,
  'verify-no-legacy-alias-surface.mjs must source legacy alias markers from the shared helper.',
);
assert.match(
  verifierSource,
  /legacyAliasPathPatterns/,
  'verify-no-legacy-alias-surface.mjs must consume helper-provided legacy alias path patterns.',
);
assert.match(
  verifierSource,
  /legacyAliasContentPatterns/,
  'verify-no-legacy-alias-surface.mjs must consume helper-provided legacy alias content patterns.',
);

assert.match(
  verifierSource,
  /topLevelExcludedDirectories/,
  'verify-no-legacy-alias-surface.mjs must exclude top-level verifier/test directories from real-surface scanning.',
);
for (const excludedDirectory of ['bin', 'test', 'tests']) {
  assert.match(
    verifierSource,
    new RegExp(`['"\`]${excludedDirectory}['"\`]`),
    `verify-no-legacy-alias-surface.mjs must exclude top-level ${excludedDirectory} from scanning.`,
  );
}

for (const forbiddenLiteral of [
  legacyAliasTerms.typescriptPackage,
  legacyAliasTerms.hyphenPackage,
  legacyAliasTerms.javaPackage,
  legacyAliasTerms.dotNetPackage,
  legacyAliasTerms.goPackage,
  legacyAliasTerms.swiftPackage,
  legacyAliasTerms.clientClass,
  legacyAliasTerms.generatedFactory,
  legacyGeneratedClientTerms.clientClass,
  legacyGeneratedClientTerms.factory,
  legacyAliasTerms.flutterPackageImport,
  legacyAliasTerms.flutterPackageName,
]) {
  assert.doesNotMatch(
    helperSource,
    new RegExp(escapeRegExp(forbiddenLiteral)),
    `legacy alias helper must not embed raw legacy literal ${forbiddenLiteral}.`,
  );
}

const guardedPatternSources = [
  ...legacyAliasPathPatterns.map((pattern) => pattern.source),
  ...legacyAliasContentPatterns.map((pattern) => pattern.source),
].join('\n');

for (const guardedValue of [
  legacyAliasTerms.typescriptPackage,
  legacyAliasTerms.hyphenPackage,
  legacyAliasTerms.javaPackage,
  legacyAliasTerms.dotNetPackage,
  legacyAliasTerms.goPackage,
  legacyAliasTerms.swiftPackage,
  legacyAliasTerms.clientClass,
  legacyAliasTerms.generatedFactory,
  legacyGeneratedClientTerms.clientClass,
  legacyGeneratedClientTerms.factory,
  legacyAliasTerms.flutterPackageImport,
  legacyAliasTerms.flutterPackageName,
  legacyAliasTerms.flutterClientFile,
  legacyAliasTerms.flutterSdkFile,
  legacyAliasTerms.generatedTypesStem,
  legacyAliasTerms.clientLikeStem,
]) {
  const expectedPatternSource = new RegExp(escapeRegExp(guardedValue)).source;
  assert.ok(
    guardedPatternSources.includes(expectedPatternSource),
    `legacy alias helper must guard marker ${guardedValue}.`,
  );
}

console.log('no legacy alias surface contract test passed');
