#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

function fail(language, message) {
  console.error(`[sdkwork-im-sdk] ${language} workspace verification failed: ${message}`);
  process.exit(1);
}

function formatValue(value) {
  return JSON.stringify(value);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readText(filePath) {
  return readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
}

function extractPattern(source, pattern) {
  const match = source.match(pattern);
  return match ? match[1].trim() : undefined;
}

function normalizeQuotedValue(value) {
  if (value === undefined) {
    return undefined;
  }

  return String(value)
    .trim()
    .replace(/^['"](.*)['"]$/, '$1');
}

function extractYamlField(source, fieldName) {
  return normalizeQuotedValue(
    extractPattern(source, new RegExp(`^${escapeRegExp(fieldName)}:\\s*(.+)$`, 'm')),
  );
}

function extractXmlTag(source, tagName) {
  return extractPattern(source, new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`));
}

function extractTomlSection(source, sectionName) {
  return extractPattern(
    source,
    new RegExp(`\\[${escapeRegExp(sectionName)}\\]([\\s\\S]*?)(?=\\n\\[|$)`),
  ) || '';
}

function extractTomlStringField(source, fieldName) {
  return extractPattern(source, new RegExp(`^\\s*${escapeRegExp(fieldName)}\\s*=\\s*"([^"]*)"`, 'm'));
}

function extractTomlBooleanField(source, fieldName) {
  const rawValue = extractPattern(
    source,
    new RegExp(`^\\s*${escapeRegExp(fieldName)}\\s*=\\s*(true|false)`, 'm'),
  );
  if (rawValue === undefined) {
    return undefined;
  }

  return rawValue === 'true';
}

function readManifestMetadata(manifestPath) {
  const source = readText(manifestPath);
  const manifestFileName = path.basename(manifestPath);
  const lowerFileName = manifestFileName.toLowerCase();

  if (lowerFileName === 'package.json') {
    const manifest = JSON.parse(source);
    return {
      name: manifest.name,
      version: manifest.version,
      description: manifest.description,
      private: Boolean(manifest.private),
      main: manifest.main,
      module: manifest.module,
      types: manifest.types,
    };
  }

  if (lowerFileName === 'pubspec.yaml') {
    return {
      name: extractYamlField(source, 'name'),
      version: extractYamlField(source, 'version'),
      description: extractYamlField(source, 'description'),
    };
  }

  if (lowerFileName === 'cargo.toml') {
    const packageSection = extractTomlSection(source, 'package');
    const librarySection = extractTomlSection(source, 'lib');
    return {
      name: extractTomlStringField(packageSection, 'name'),
      version: extractTomlStringField(packageSection, 'version'),
      description: extractTomlStringField(packageSection, 'description'),
      publish: extractTomlBooleanField(packageSection, 'publish'),
      library: extractTomlStringField(librarySection, 'path'),
    };
  }

  if (lowerFileName === 'pom.xml') {
    const groupId = extractXmlTag(source, 'groupId');
    const artifactId = extractXmlTag(source, 'artifactId');
    return {
      name: groupId && artifactId ? `${groupId}:${artifactId}` : undefined,
      version: extractXmlTag(source, 'version'),
      description: extractXmlTag(source, 'description'),
      displayName: extractXmlTag(source, 'name'),
    };
  }

  if (lowerFileName.endsWith('.csproj')) {
    return {
      name: extractXmlTag(source, 'PackageId') || extractXmlTag(source, 'AssemblyName'),
      version: extractXmlTag(source, 'Version'),
      description: extractXmlTag(source, 'Description'),
      assemblyName: extractXmlTag(source, 'AssemblyName'),
      rootNamespace: extractXmlTag(source, 'RootNamespace'),
    };
  }

  if (lowerFileName === 'package.swift') {
    return {
      name: extractPattern(source, /Package\(\s*name:\s*"([^"]+)"/s),
      productName: extractPattern(source, /\.library\(\s*name:\s*"([^"]+)"/s),
      targetName: extractPattern(source, /\.target\(\s*name:\s*"([^"]+)"/s),
    };
  }

  if (lowerFileName === 'build.gradle.kts') {
    const group = extractPattern(source, /^\s*group\s*=\s*"([^"]*)"$/m);
    const archiveBaseName = extractPattern(source, /^\s*archiveBaseName\.set\("([^"]*)"\)\s*$/m);
    return {
      name: group && archiveBaseName ? `${group}:${archiveBaseName}` : undefined,
      group,
      archiveBaseName,
      version: extractPattern(source, /^\s*version\s*=\s*"([^"]*)"$/m),
      description: extractPattern(source, /^\s*description\s*=\s*"([^"]*)"$/m),
    };
  }

  if (lowerFileName === 'go.mod') {
    return {
      name: extractPattern(source, /^\s*module\s+(.+)\s*$/m),
      goVersion: extractPattern(source, /^\s*go\s+(.+)\s*$/m),
    };
  }

  if (lowerFileName === 'pyproject.toml') {
    const projectSection = extractTomlSection(source, 'project');
    return {
      name: extractTomlStringField(projectSection, 'name'),
      version: extractTomlStringField(projectSection, 'version'),
      description: extractTomlStringField(projectSection, 'description'),
      readme: extractTomlStringField(projectSection, 'readme'),
      requiresPython: extractTomlStringField(projectSection, 'requires-python'),
    };
  }

  fail('shared', `Unsupported manifest type: ${manifestPath}`);
}

function assertConsumerPackage(language, entry, expected) {
  if (!expected) {
    return;
  }
  if (!entry.consumerPackage) {
    fail(language, 'Assembly entry must record consumerPackage metadata.');
  }
  for (const [field, expectedValue] of Object.entries(expected)) {
    if (entry.consumerPackage?.[field] !== expectedValue) {
      fail(
        language,
        `Assembly consumerPackage ${field} mismatch: expected ${expectedValue}, received ${entry.consumerPackage?.[field]}.`,
      );
    }
  }
}

function assertConsumerPackageAlignment(language, entry) {
  if (!entry.consumerPackage) {
    return;
  }

  if (!entry.consumerPackage.layer) {
    fail(language, 'Assembly consumerPackage must record its package layer.');
  }

  const consumerPackageLayer = Array.isArray(entry.packages)
    ? entry.packages.find((candidate) => candidate.layer === entry.consumerPackage.layer)
    : null;

  if (!consumerPackageLayer) {
    fail(
      language,
      `Assembly consumerPackage layer ${entry.consumerPackage.layer} must exist in packages metadata.`,
    );
  }

  for (const field of ['packagePath', 'manifestPath', 'name', 'version', 'description', 'private']) {
    if (
      entry.consumerPackage[field] !== undefined &&
      consumerPackageLayer[field] !== entry.consumerPackage[field]
    ) {
      fail(
        language,
        `Assembly consumerPackage ${field} mismatch with ${entry.consumerPackage.layer} package layer: expected ${formatValue(entry.consumerPackage[field])}, received ${formatValue(consumerPackageLayer[field])}.`,
      );
    }
  }

  if (
    entry.consumerPackage.entrypoints !== undefined &&
    !isDeepStrictEqual(consumerPackageLayer.entrypoints, entry.consumerPackage.entrypoints)
  ) {
    fail(
      language,
      `Assembly consumerPackage entrypoints mismatch with ${entry.consumerPackage.layer} package layer: expected ${formatValue(entry.consumerPackage.entrypoints)}, received ${formatValue(consumerPackageLayer.entrypoints)}.`,
    );
  }
}

function assertRequiredPackageLayers(language, entry, requiredPackageLayers = []) {
  for (const requiredLayer of requiredPackageLayers) {
    if (!entry.packages?.some((candidate) => candidate.layer === requiredLayer)) {
      fail(language, `Assembly entry must record the ${requiredLayer} package layer.`);
    }
  }
}

function assertReadmeRequiredTerms(language, readmeSource, readmeRequiredTerms = []) {
  for (const requiredTerm of readmeRequiredTerms) {
    if (!readmeSource.includes(requiredTerm)) {
      fail(language, `README must include the language-specific marker ${requiredTerm}.`);
    }
  }
}

function assertReadmeForbiddenTerms(language, readmeSource, readmeForbiddenTerms = []) {
  for (const forbiddenTerm of readmeForbiddenTerms) {
    if (readmeSource.includes(forbiddenTerm)) {
      fail(language, `README must not include the language-specific marker ${forbiddenTerm}.`);
    }
  }
}

function assertReleaseSnapshotTerms(language, readmeSource) {
  for (const requiredTerm of [
    'Release Snapshot Boundary',
    'state = generated_pending_publication',
    'generationStatus = generated',
    'releaseStatus = not_published',
    'plannedVersion = null',
    'versionStatus = version_unassigned_pending_freeze',
    'versionDecisionSourcePath = null',
  ]) {
    if (!readmeSource.includes(requiredTerm)) {
      fail(language, `README must include the release snapshot marker ${requiredTerm}.`);
    }
  }

  if (readmeSource.includes('template_only_pending_generation')) {
    fail(language, 'README must not retain the template_only_pending_generation release state.');
  }
}

function assertScopedReadmeTerms(
  language,
  readmePath,
  readmeLabel,
  requiredTerms = [],
  forbiddenTerms = [],
) {
  if (!requiredTerms.length && !forbiddenTerms.length) {
    return;
  }
  if (!existsSync(readmePath)) {
    fail(language, `Missing ${readmeLabel}: ${readmePath}`);
  }

  const readmeSource = readFileSync(readmePath, 'utf8');
  for (const requiredTerm of requiredTerms) {
    if (!readmeSource.includes(requiredTerm)) {
      fail(language, `${readmeLabel} must include the language-specific marker ${requiredTerm}.`);
    }
  }
  for (const forbiddenTerm of forbiddenTerms) {
    if (readmeSource.includes(forbiddenTerm)) {
      fail(language, `${readmeLabel} must not include the language-specific marker ${forbiddenTerm}.`);
    }
  }
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function assertGeneratedSdkMetadata(language, generatedSdkMetadataPath, expectedSdkType = 'app') {
  if (!existsSync(generatedSdkMetadataPath)) {
    fail(language, `Missing generated sdk metadata: ${generatedSdkMetadataPath}`);
  }

  const generatedSdkMetadata = readJson(generatedSdkMetadataPath);

  if (generatedSdkMetadata.language !== language) {
    fail(
      language,
      `Generated sdkwork-sdk.json language mismatch: expected ${language}, received ${generatedSdkMetadata.language}.`,
    );
  }

  if (generatedSdkMetadata.sdkType !== expectedSdkType) {
    fail(
      language,
      `Generated sdkwork-sdk.json sdkType mismatch: expected ${expectedSdkType}, received ${generatedSdkMetadata.sdkType}.`,
    );
  }

  return generatedSdkMetadata;
}

function assertGeneratedAssemblyAlignment(
  language,
  entry,
  generatedSdkMetadata,
  expectedGeneratedDescription,
) {
  const generatedPackage = Array.isArray(entry.packages)
    ? entry.packages.find((candidate) => candidate.layer === 'generated')
    : null;

  if (!generatedPackage) {
    fail(language, 'Assembly entry must record the generated package layer.');
  }

  if (entry.generatedPath !== generatedPackage.packagePath) {
    fail(
      language,
      `Assembly generatedPath mismatch: expected ${generatedPackage.packagePath}, received ${entry.generatedPath}.`,
    );
  }

  if (entry.manifestPath !== generatedPackage.manifestPath) {
    fail(
      language,
      `Assembly manifestPath mismatch: expected ${generatedPackage.manifestPath}, received ${entry.manifestPath}.`,
    );
  }

  if (entry.name !== generatedPackage.name) {
    fail(
      language,
      `Assembly generated package name mismatch: expected ${generatedPackage.name}, received ${entry.name}.`,
    );
  }

  if (entry.version !== generatedPackage.version) {
    fail(
      language,
      `Assembly generated package version mismatch: expected ${generatedPackage.version}, received ${entry.version}.`,
    );
  }

  if (generatedSdkMetadata.packageName !== generatedPackage.name) {
    fail(
      language,
      `Generated sdkwork-sdk.json packageName mismatch: expected ${generatedPackage.name}, received ${generatedSdkMetadata.packageName}.`,
    );
  }

  if (generatedSdkMetadata.version !== generatedPackage.version) {
    fail(
      language,
      `Generated sdkwork-sdk.json version mismatch: expected ${generatedPackage.version}, received ${generatedSdkMetadata.version}.`,
    );
  }

  if (expectedGeneratedDescription) {
    if (entry.description !== expectedGeneratedDescription) {
      fail(
        language,
        `Assembly generated description mismatch: expected ${expectedGeneratedDescription}, received ${entry.description}.`,
      );
    }
    if (generatedPackage.description !== expectedGeneratedDescription) {
      fail(
        language,
        `Assembly generated package description mismatch: expected ${expectedGeneratedDescription}, received ${generatedPackage.description}.`,
      );
    }
    if (generatedSdkMetadata.description !== expectedGeneratedDescription) {
      fail(
        language,
        `Generated sdkwork-sdk.json description mismatch: expected ${expectedGeneratedDescription}, received ${generatedSdkMetadata.description}.`,
      );
    }
  }
}

function assertPackageDescriptions(language, entry, expectedPackageDescriptions = {}) {
  for (const [layer, expectedDescription] of Object.entries(expectedPackageDescriptions)) {
    const packageEntry = Array.isArray(entry.packages)
      ? entry.packages.find((candidate) => candidate.layer === layer)
      : null;

    if (!packageEntry) {
      fail(language, `Assembly entry must record the ${layer} package layer for description validation.`);
    }

    if (packageEntry.description !== expectedDescription) {
      fail(
        language,
        `Assembly ${layer} package description mismatch: expected ${expectedDescription}, received ${packageEntry.description}.`,
      );
    }
  }
}

function assertPackageFieldExpectations(language, entry, expectedPackageFields = {}) {
  for (const [layer, fieldExpectations] of Object.entries(expectedPackageFields)) {
    const packageEntry = Array.isArray(entry.packages)
      ? entry.packages.find((candidate) => candidate.layer === layer)
      : null;

    if (!packageEntry) {
      fail(language, `Assembly entry must record the ${layer} package layer for field validation.`);
    }

    for (const [field, expectedValue] of Object.entries(fieldExpectations || {})) {
      if (!isDeepStrictEqual(packageEntry[field], expectedValue)) {
        fail(
          language,
          `Assembly ${layer} package ${field} mismatch: expected ${formatValue(expectedValue)}, received ${formatValue(packageEntry[field])}.`,
        );
      }
    }
  }
}

function assertPackageManifestAlignment(
  language,
  workspaceRoot,
  entry,
  expectedManifestFields = {},
) {
  for (const packageEntry of Array.isArray(entry.packages) ? entry.packages : []) {
    const manifestAbsolutePath = path.join(workspaceRoot, packageEntry.manifestPath);
    if (!existsSync(manifestAbsolutePath)) {
      fail(language, `Missing ${packageEntry.layer} package manifest: ${manifestAbsolutePath}`);
    }

    const manifestMetadata = readManifestMetadata(manifestAbsolutePath);

    for (const field of ['name', 'version', 'description', 'private']) {
      if (
        manifestMetadata[field] !== undefined
        && packageEntry[field] !== undefined
        && !isDeepStrictEqual(manifestMetadata[field], packageEntry[field])
      ) {
        fail(
          language,
          `Manifest ${packageEntry.layer} package ${field} mismatch: expected ${formatValue(packageEntry[field])}, received ${formatValue(manifestMetadata[field])}.`,
        );
      }
    }

    for (const [field, expectedValue] of Object.entries(packageEntry.entrypoints || {})) {
      if (
        manifestMetadata[field] !== undefined
        && !isDeepStrictEqual(manifestMetadata[field], expectedValue)
      ) {
        fail(
          language,
          `Manifest ${packageEntry.layer} package ${field} mismatch: expected ${formatValue(expectedValue)}, received ${formatValue(manifestMetadata[field])}.`,
        );
      }
    }

    for (const [field, expectedValue] of Object.entries(expectedManifestFields[packageEntry.layer] || {})) {
      if (!isDeepStrictEqual(manifestMetadata[field], expectedValue)) {
        fail(
          language,
          `Manifest ${packageEntry.layer} package ${field} mismatch: expected ${formatValue(expectedValue)}, received ${formatValue(manifestMetadata[field])}.`,
        );
      }
    }
  }
}

export function verifyLanguageWorkspace(config) {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const workspaceRoot = path.resolve(scriptDir, '..');
  const workspacePath = path.join(workspaceRoot, config.workspace);
  const readmePath = path.join(workspacePath, 'README.md');
  const generatedPath = path.join(workspacePath, 'generated', 'server-openapi');
  const generatedSdkMetadataPath = path.join(generatedPath, 'sdkwork-sdk.json');
  const generatedReadmePath = path.join(generatedPath, 'README.md');
  const composedPath = path.join(workspacePath, 'composed');
  const composedReadmePath = path.join(composedPath, 'README.md');
  const assemblyPath = path.join(workspaceRoot, '.sdkwork-assembly.json');

  for (const [label, targetPath] of [
    ['workspace', workspacePath],
    ['README', readmePath],
    ['generated boundary', generatedPath],
    ['composed boundary', composedPath],
    ['assembly metadata', assemblyPath],
  ]) {
    if (!existsSync(targetPath)) {
      fail(config.language, `Missing ${label}: ${targetPath}`);
    }
  }

  const readmeSource = readFileSync(readmePath, 'utf8');
  if (!/generated\/server-openapi/.test(readmeSource)) {
    fail(config.language, 'README must document generated/server-openapi as the generator-owned boundary.');
  }
  if (!/\bcomposed\b/.test(readmeSource)) {
    fail(config.language, 'README must document composed as the manual-owned boundary.');
  }
  if (!/sdk-gen/.test(readmeSource) || !/sdk-verify/.test(readmeSource)) {
    fail(config.language, 'README must document sdk-gen and sdk-verify entrypoints.');
  }
  assertReleaseSnapshotTerms(config.language, readmeSource);
  assertReadmeRequiredTerms(config.language, readmeSource, config.readmeRequiredTerms);
  assertReadmeForbiddenTerms(config.language, readmeSource, config.readmeForbiddenTerms);
  assertScopedReadmeTerms(
    config.language,
    generatedReadmePath,
    'Generated README',
    config.generatedReadmeRequiredTerms,
    config.generatedReadmeForbiddenTerms,
  );
  assertScopedReadmeTerms(
    config.language,
    composedReadmePath,
    'Composed README',
    config.composedReadmeRequiredTerms,
    config.composedReadmeForbiddenTerms,
  );
  const generatedSdkMetadata = assertGeneratedSdkMetadata(
    config.language,
    generatedSdkMetadataPath,
    config.generatedSdkType,
  );

  const assembly = JSON.parse(readFileSync(assemblyPath, 'utf8'));
  const entry = Array.isArray(assembly.languages)
    ? assembly.languages.find((candidate) => candidate.language === config.language)
    : null;
  if (!entry) {
    fail(config.language, '.sdkwork-assembly.json is missing the language entry.');
  }
  if (entry.workspace !== config.workspace) {
    fail(config.language, `Assembly workspace mismatch: expected ${config.workspace}, received ${entry.workspace}.`);
  }
  if (entry.primaryClient !== config.primaryClient) {
    fail(config.language, `Assembly primary client mismatch: expected ${config.primaryClient}, received ${entry.primaryClient}.`);
  }
  if (entry.maturityTier !== config.maturityTier) {
    fail(config.language, `Assembly maturity tier mismatch: expected ${config.maturityTier}, received ${entry.maturityTier}.`);
  }
  if (!Array.isArray(entry.packages) || entry.packages.length < 2) {
    fail(config.language, 'Assembly entry must record generated and composed package layers.');
  }
  assertRequiredPackageLayers(config.language, entry, config.requiredPackageLayers);
  assertConsumerPackageAlignment(config.language, entry);
  assertConsumerPackage(config.language, entry, config.consumerPackage);
  assertGeneratedAssemblyAlignment(
    config.language,
    entry,
    generatedSdkMetadata,
    config.expectedPackageDescriptions?.generated,
  );
  assertPackageDescriptions(config.language, entry, config.expectedPackageDescriptions);
  assertPackageFieldExpectations(config.language, entry, config.expectedPackageFields);
  assertPackageManifestAlignment(
    config.language,
    workspaceRoot,
    entry,
    config.expectedManifestFields,
  );

  console.log(`[sdkwork-im-sdk] ${config.language} workspace verification passed.`);
}
