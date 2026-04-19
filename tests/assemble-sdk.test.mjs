import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { pathToFileURL } from 'node:url';

const workspaceRoot = path.resolve(import.meta.dirname, '..');
const assembleScript = path.join(workspaceRoot, 'bin', 'assemble-sdk.mjs');
const assemblyPath = path.join(workspaceRoot, '.sdkwork-assembly.json');
const assembleSource = readFileSync(assembleScript, 'utf8');

async function runAssemble() {
  const originalWrite = process.stdout.write.bind(process.stdout);
  process.stdout.write = () => true;
  try {
    await import(`${pathToFileURL(assembleScript).href}?run=${Date.now()}-${Math.random()}`);
  } finally {
    process.stdout.write = originalWrite;
  }
}

function readAssembly() {
  return JSON.parse(readFileSync(assemblyPath, 'utf8'));
}

test('assemble-sdk resolves generator-owned tooling through sdk-paths.mjs', () => {
  assert.match(
    assembleSource,
    /sdk-paths\.mjs/,
  );
  assert.match(
    assembleSource,
    /resolveSdkworkGeneratorRoot/,
  );
});

test('assemble-sdk emits manifest-backed language package details', async () => {
  await runAssemble();
  const assembly = readAssembly();

  assert.equal(assembly.workspace, 'sdkwork-im-sdk');
  assert.equal(assembly.authoritySpec, 'openapi/craw-chat-app.openapi.yaml');
  assert.equal(assembly.derivedSpec, 'openapi/craw-chat-app.sdkgen.yaml');
  assert.deepEqual(assembly.derivedSpecs, {
    default: 'openapi/craw-chat-app.sdkgen.yaml',
    flutter: 'openapi/craw-chat-app.flutter.sdkgen.yaml',
  });
  assert.deepEqual(assembly.websocketTransport, {
    documented: true,
    generated: false,
  });
  assert.ok(Array.isArray(assembly.languages));

  const typescript = assembly.languages.find((entry) => entry.language === 'typescript');
  assert.ok(typescript, 'missing TypeScript assembly');
  assert.equal(
    typescript.manifestPath,
    'sdkwork-im-sdk-typescript/generated/server-openapi/package.json',
  );
  assert.equal(typescript.name, '@sdkwork-internal/im-sdk-generated');
  assert.ok(Array.isArray(typescript.packages));
  assert.deepEqual(
    typescript.packages.map((entry) => entry.layer),
    ['generated', 'composed', 'root'],
  );
  assert.equal(typescript.packages[0].private, true);
  assert.equal(
    typescript.packages[1].name,
    '@sdkwork/im-sdk',
  );
  assert.equal(typescript.packages[2].name, '@sdkwork/im-sdk');
  assert.equal(typescript.consumerPackage?.layer, 'root');
  assert.equal(typescript.consumerPackage?.name, '@sdkwork/im-sdk');
  assert.equal(typescript.entrypoints.types, './dist/index.d.ts');

  const flutter = assembly.languages.find((entry) => entry.language === 'flutter');
  assert.ok(flutter, 'missing Flutter assembly');
  assert.equal(
    flutter.manifestPath,
    'sdkwork-im-sdk-flutter/generated/server-openapi/pubspec.yaml',
  );
  assert.equal(flutter.name, 'im_sdk_generated');
  assert.ok(Array.isArray(flutter.packages));
  assert.deepEqual(
    flutter.packages.map((entry) => entry.layer),
    ['generated', 'composed'],
  );
  assert.equal(flutter.packages[1].name, 'im_sdk');
  assert.equal(flutter.entrypoints.library, 'lib/');

  const rust = assembly.languages.find((entry) => entry.language === 'rust');
  assert.ok(rust, 'missing Rust assembly');
  assert.equal(
    rust.manifestPath,
    'sdkwork-im-sdk-rust/generated/server-openapi/Cargo.toml',
  );
  assert.equal(rust.name, 'sdkwork-im-sdk-generated');
  assert.equal(rust.version, '0.1.1');
  assert.equal(rust.description, 'Generator-owned Rust transport SDK for the Craw Chat app API.');
  assert.ok(Array.isArray(rust.packages));
  assert.equal(rust.packages[0].name, 'sdkwork-im-sdk-generated');
  assert.equal(rust.packages[0].version, '0.1.1');
  assert.equal(
    rust.packages[0].description,
    'Generator-owned Rust transport SDK for the Craw Chat app API.',
  );

  const swift = assembly.languages.find((entry) => entry.language === 'swift');
  assert.ok(swift, 'missing Swift assembly');
  assert.equal(swift.name, 'ImSdkGenerated');
  assert.equal(swift.version, '0.1.1');
  assert.equal(swift.description, 'Generator-owned Swift transport SDK for the Craw Chat app API.');
  assert.equal(swift.packages[0].version, '0.1.1');
  assert.equal(
    swift.packages[0].description,
    'Generator-owned Swift transport SDK for the Craw Chat app API.',
  );
  assert.equal(swift.packages[1].name, 'ImSdk');
  assert.equal(
    swift.packages[1].description,
    'Manual-owned Swift semantic SDK boundary for IM',
  );
  assert.equal(swift.packages[1].status, 'reserved');

  const go = assembly.languages.find((entry) => entry.language === 'go');
  assert.ok(go, 'missing Go assembly');
  assert.equal(go.name, 'github.com/sdkwork/im-sdk-generated');
  assert.equal(go.version, '0.1.1');
  assert.equal(go.description, 'Generator-owned Go transport SDK for the Craw Chat app API.');
  assert.equal(go.packages[0].version, '0.1.1');
  assert.equal(
    go.packages[0].description,
    'Generator-owned Go transport SDK for the Craw Chat app API.',
  );
  assert.equal(
    go.packages[1].description,
    'Manual-owned Go semantic SDK boundary for IM',
  );
  assert.equal(go.packages[1].status, 'reserved');

  const java = assembly.languages.find((entry) => entry.language === 'java');
  assert.ok(java, 'missing Java assembly');
  assert.equal(
    java.packages[1].description,
    'Manual-owned Java semantic SDK boundary for IM',
  );
  assert.equal(java.packages[1].status, 'reserved');

  const csharp = assembly.languages.find((entry) => entry.language === 'csharp');
  assert.ok(csharp, 'missing C# assembly');
  assert.equal(
    csharp.packages[1].description,
    'Manual-owned C# semantic SDK boundary for IM',
  );
  assert.equal(csharp.packages[1].status, 'reserved');

  const kotlin = assembly.languages.find((entry) => entry.language === 'kotlin');
  assert.ok(kotlin, 'missing Kotlin assembly');
  assert.equal(
    kotlin.packages[1].description,
    'Manual-owned Kotlin semantic SDK boundary for IM',
  );
  assert.equal(kotlin.packages[1].status, 'reserved');

  const python = assembly.languages.find((entry) => entry.language === 'python');
  assert.ok(python, 'missing Python assembly');
  assert.equal(
    python.packages[1].description,
    'Manual-owned Python semantic SDK boundary for IM',
  );
  assert.equal(python.packages[1].status, 'reserved');
});

test('assemble-sdk preserves generatedAt when assembly content is unchanged', async () => {
  await runAssemble();
  const firstAssembly = readAssembly();

  await runAssemble();
  const secondAssembly = readAssembly();

  assert.equal(secondAssembly.generatedAt, firstAssembly.generatedAt);
});
