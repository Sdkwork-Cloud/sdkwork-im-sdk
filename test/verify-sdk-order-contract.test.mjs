import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

const verifySdkSource = read('bin/verify-sdk.mjs');

const assembleIndex = verifySdkSource.indexOf("workspace:assemble");
const typescriptWorkspaceIndex = verifySdkSource.indexOf("typescript:workspace");
const flutterWorkspaceIndex = verifySdkSource.indexOf("flutter:workspace");
const rustWorkspaceIndex = verifySdkSource.indexOf("rust:workspace");
const javaWorkspaceIndex = verifySdkSource.indexOf("java:workspace");

assert.notEqual(assembleIndex, -1, 'verify-sdk.mjs must invoke assemble-sdk.mjs.');
for (const [label, index] of [
  ['typescript:workspace', typescriptWorkspaceIndex],
  ['flutter:workspace', flutterWorkspaceIndex],
  ['rust:workspace', rustWorkspaceIndex],
  ['java:workspace', javaWorkspaceIndex],
]) {
  assert.notEqual(index, -1, `verify-sdk.mjs must keep ${label}.`);
  assert.ok(
    assembleIndex < index,
    `verify-sdk.mjs must assemble metadata before ${label} so verifiers inspect the final assembly.`,
  );
}

console.log('verify-sdk order contract test passed');
