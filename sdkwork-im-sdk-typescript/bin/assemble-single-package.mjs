#!/usr/bin/env node
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const generatedPackageRoot = path.join(packageRoot, 'generated', 'server-openapi');
const composedPackageRoot = path.join(packageRoot, 'composed');
const generatedSourceRoot = path.join(generatedPackageRoot, 'src');
const composedSourceRoot = path.join(composedPackageRoot, 'src');
const composedTestRoot = path.join(composedPackageRoot, 'test');
const rootSourceRoot = path.join(packageRoot, 'src');
const rootGeneratedSourceRoot = path.join(rootSourceRoot, 'generated');
const rootTestRoot = path.join(packageRoot, 'test');
const rootNodeModulesRoot = path.join(packageRoot, 'node_modules');
const sourceSdkCommonRoot = path.join(generatedPackageRoot, 'node_modules', '@sdkwork', 'sdk-common');
const targetSdkCommonRoot = path.join(rootNodeModulesRoot, '@sdkwork', 'sdk-common');

function fail(message) {
  console.error(`[sdkwork-im-sdk] ${message}`);
  process.exit(1);
}

function expectedPackageTaskScript(task) {
  return `call "%npm_node_execpath%" ./bin/package-task.mjs ${task} || "$npm_node_execpath" ./bin/package-task.mjs ${task} || node ./bin/package-task.mjs ${task}`;
}

function ensureExists(absolutePath, description) {
  if (!existsSync(absolutePath)) {
    fail(`Missing ${description}: ${absolutePath}`);
  }
}

function resetDirectory(absolutePath) {
  rmSync(absolutePath, { recursive: true, force: true });
  mkdirSync(absolutePath, { recursive: true });
}

function ensureConcreteDirectory(absolutePath) {
  let stats = null;
  try {
    stats = lstatSync(absolutePath);
  } catch {
    stats = null;
  }

  if (stats) {
    if (stats.isSymbolicLink()) {
      unlinkSync(absolutePath);
    } else if (!stats.isDirectory()) {
      rmSync(absolutePath, { recursive: true, force: true });
    } else {
      return;
    }
  }

  mkdirSync(path.dirname(absolutePath), { recursive: true });
  mkdirSync(absolutePath, { recursive: true });
}

function copyDirectory(sourceRoot, targetRoot) {
  ensureExists(sourceRoot, 'source directory');
  rmSync(targetRoot, { recursive: true, force: true });
  mkdirSync(path.dirname(targetRoot), { recursive: true });
  cpSync(sourceRoot, targetRoot, { recursive: true });
}

function collectFiles(rootDirectory) {
  const files = [];
  const queue = [rootDirectory];

  while (queue.length > 0) {
    const currentDirectory = queue.shift();
    for (const entry of readdirSync(currentDirectory, { withFileTypes: true })) {
      const absolutePath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        queue.push(absolutePath);
        continue;
      }
      if (entry.isFile()) {
        files.push(absolutePath);
      }
    }
  }

  return files;
}

function resolveTypeScriptSpecifier(specifier, filePath) {
  if (!specifier.startsWith('.')) {
    return specifier;
  }
  if (/\.(?:[cm]?js|[cm]?ts|d\.ts|json)$/i.test(specifier)) {
    return specifier;
  }

  const absoluteBase = path.resolve(path.dirname(filePath), specifier);
  if (existsSync(`${absoluteBase}.ts`) || existsSync(`${absoluteBase}.mts`)) {
    return `${specifier}.js`;
  }
  if (existsSync(path.join(absoluteBase, 'index.ts')) || existsSync(path.join(absoluteBase, 'index.mts'))) {
    const normalized = specifier.replace(/\/+$/, '');
    return `${normalized}/index.js`;
  }

  return specifier;
}

function rewriteRelativeSpecifiers(rootDirectory) {
  for (const absolutePath of collectFiles(rootDirectory)) {
    if (!absolutePath.endsWith('.ts') && !absolutePath.endsWith('.mts')) {
      continue;
    }

    const source = readFileSync(absolutePath, 'utf8');
    const rewritten = source
      .replace(/(\bfrom\s*['"])(\.{1,2}\/[^'"]+)(['"])/g, (_match, prefix, specifier, suffix) => {
        return `${prefix}${resolveTypeScriptSpecifier(specifier, absolutePath)}${suffix}`;
      })
      .replace(/(\bimport\s*['"])(\.{1,2}\/[^'"]+)(['"])/g, (_match, prefix, specifier, suffix) => {
        return `${prefix}${resolveTypeScriptSpecifier(specifier, absolutePath)}${suffix}`;
      });

    if (rewritten !== source) {
      writeFileSync(absolutePath, rewritten, 'utf8');
    }
  }
}

function patchGeneratedTypeBridge() {
  const bridgePath = path.join(rootSourceRoot, 'generated-client-types.ts');
  ensureExists(bridgePath, 'root generated type bridge');
  const source = readFileSync(bridgePath, 'utf8')
    .replace(
      /\/\/ This bridge keeps generated type imports anchored[\s\S]+?package identity\./,
      '// This bridge keeps generated type knowledge in one place so the root SDK can expose generated contracts without leaking private source paths.',
    )
    .replaceAll("from '#generated-sdk';", "from './generated/index.js';");
  writeFileSync(bridgePath, source, 'utf8');
}

function patchSdkContext() {
  const composedSdkContextPath = path.join(composedSourceRoot, 'sdk-context.ts');
  const sdkContextPath = path.join(rootSourceRoot, 'sdk-context.ts');
  ensureExists(composedSdkContextPath, 'composed sdk context');
  const source = readFileSync(composedSdkContextPath, 'utf8').replaceAll(
    "from '#generated-sdk';",
    "from './generated/index.js';",
  );
  writeFileSync(sdkContextPath, source, 'utf8');
}

function patchSdkTypes() {
  const composedSdkPath = path.join(composedSourceRoot, 'sdk.ts');
  const sdkPath = path.join(rootSourceRoot, 'sdk.ts');
  ensureExists(composedSdkPath, 'composed sdk entrypoint');
  const source = readFileSync(composedSdkPath, 'utf8').replaceAll(
    "from '#generated-sdk';",
    "from './generated/index.js';",
  );
  writeFileSync(sdkPath, source, 'utf8');
}

function patchRootIndex() {
  const indexPath = path.join(rootSourceRoot, 'index.ts');
  writeFileSync(
    indexPath,
    `export * from './errors.js';
export * from './sdk.js';
export * from './types.js';
`,
    'utf8',
  );
}

function enforceGeneratedSdkBoundary() {
  const generatedSdkPath = path.join(rootGeneratedSourceRoot, 'sdk.ts');
  const generatedIndexPath = path.join(rootGeneratedSourceRoot, 'index.ts');
  const generatedCommonTypesPath = path.join(rootGeneratedSourceRoot, 'types', 'common.ts');

  const generatedSdkSource = readFileSync(generatedSdkPath, 'utf8');
  const normalizedGeneratedSdkSource = generatedSdkSource
    .replace(/\nexport \{ Im(?:Generated|Transport)Client as ImSdkClient \};\n?/g, '\n')
    .trimEnd()
    .concat('\n');
  if (normalizedGeneratedSdkSource !== generatedSdkSource) {
    writeFileSync(generatedSdkPath, normalizedGeneratedSdkSource, 'utf8');
  }

  const generatedIndexSource = readFileSync(generatedIndexPath, 'utf8');
  const normalizedGeneratedIndexSource = generatedIndexSource
    .replace(/\nexport \{ ImSdkClient \} from '\.\/sdk\.js';\n?/g, '\n')
    .replace(/\nexport type \{ ImSdkConfig \} from '\.\/types\/common\.js';\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()
    .concat('\n');
  if (normalizedGeneratedIndexSource !== generatedIndexSource) {
    writeFileSync(generatedIndexPath, normalizedGeneratedIndexSource, 'utf8');
  }

  const generatedCommonTypesSource = readFileSync(generatedCommonTypesPath, 'utf8');
  const normalizedGeneratedCommonTypesSource = generatedCommonTypesSource
    .replace(/\nexport type ImSdkConfig = ImGeneratedConfig;\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()
    .concat('\n');
  if (normalizedGeneratedCommonTypesSource !== generatedCommonTypesSource) {
    writeFileSync(generatedCommonTypesPath, normalizedGeneratedCommonTypesSource, 'utf8');
  }
}

function writeRootPackageManifest() {
  const generatedPackageJsonPath = path.join(generatedPackageRoot, 'package.json');
  const composedPackageJsonPath = path.join(composedPackageRoot, 'package.json');
  const generatedPackageJson = JSON.parse(readFileSync(generatedPackageJsonPath, 'utf8'));
  const composedPackageJson = JSON.parse(readFileSync(composedPackageJsonPath, 'utf8'));

  const manifest = {
    name: '@sdkwork/im-sdk',
    version: composedPackageJson.version || generatedPackageJson.version || '0.1.0',
    description: 'Unified IM SDK package with embedded OpenAPI-generated transport and handwritten realtime/business modules',
    type: 'module',
    main: './dist/index.js',
    module: './dist/index.js',
    types: './dist/index.d.ts',
    exports: {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
        default: './dist/index.js',
      },
    },
    sideEffects: false,
    files: [
      'dist',
    ],
    dependencies: {
      '@sdkwork/sdk-common': generatedPackageJson.dependencies?.['@sdkwork/sdk-common'] || '^1.0.2',
    },
    scripts: {
      assemble: expectedPackageTaskScript('assemble'),
      clean: expectedPackageTaskScript('clean'),
      typecheck: expectedPackageTaskScript('typecheck'),
      build: expectedPackageTaskScript('build'),
      smoke: expectedPackageTaskScript('smoke'),
      test: expectedPackageTaskScript('test'),
    },
  };

  writeFileSync(path.join(packageRoot, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

function copySdkCommonRuntime() {
  if (existsSync(targetSdkCommonRoot)) {
    return;
  }

  ensureExists(sourceSdkCommonRoot, 'sdk-common runtime package');
  ensureConcreteDirectory(rootNodeModulesRoot);
  mkdirSync(path.dirname(targetSdkCommonRoot), { recursive: true });
  cpSync(sourceSdkCommonRoot, targetSdkCommonRoot, { recursive: true });
}

resetDirectory(rootSourceRoot);
resetDirectory(rootTestRoot);
copyDirectory(composedSourceRoot, rootSourceRoot);
copyDirectory(generatedSourceRoot, rootGeneratedSourceRoot);
copyDirectory(composedTestRoot, rootTestRoot);
rewriteRelativeSpecifiers(rootGeneratedSourceRoot);
patchGeneratedTypeBridge();
patchSdkContext();
patchSdkTypes();
patchRootIndex();
enforceGeneratedSdkBoundary();
writeRootPackageManifest();
copySdkCommonRuntime();

console.log('[sdkwork-im-sdk] TypeScript single-package assembly completed.');
