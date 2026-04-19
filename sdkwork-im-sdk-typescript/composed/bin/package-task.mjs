#!/usr/bin/env node
import { existsSync, lstatSync, mkdirSync, realpathSync, rmSync, symlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function fail(message) {
  console.error(`[sdkwork-im-sdk] ${message}`);
  process.exit(1);
}

function run(step, args, cwd = packageRoot) {
  const result = spawnSync(process.execPath, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    fail(`${step} failed to start: ${result.error.message}`);
  }
  if (typeof result.status === 'number' && result.status !== 0) {
    fail(`${step} failed with exit code ${result.status}`);
  }
  if (result.signal) {
    fail(`${step} terminated with signal ${result.signal}`);
  }
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const generatorRoot = path.resolve(
  packageRoot,
  '..',
  '..',
  '..',
  '..',
  '..',
  '..',
  'sdk',
  'sdkwork-sdk-generator',
);
const typeScriptCliPath = path.join(generatorRoot, 'node_modules', 'typescript', 'bin', 'tsc');
const generatedPackageRoot = path.resolve(packageRoot, '..', 'generated', 'server-openapi');
const generatedPackageDistRoot = path.join(generatedPackageRoot, 'dist');
const generatedPackageSourceRoot = path.join(generatedPackageRoot, 'src');
const internalGeneratedLinkPath = path.join(packageRoot, '.generated');
const task = (process.argv[2] || '').trim();

function resolveExistingRealPath(targetPath) {
  try {
    lstatSync(targetPath);
    if (!existsSync(targetPath)) {
      return null;
    }
    return realpathSync(targetPath);
  } catch {
    return null;
  }
}

function pathEntryExists(targetPath) {
  try {
    lstatSync(targetPath);
    return true;
  } catch {
    return false;
  }
}

function ensureDirectoryLink(linkPath, targetPath) {
  const expectedTarget = realpathSync(targetPath);
  const currentTarget = resolveExistingRealPath(linkPath);
  if (currentTarget === expectedTarget) {
    return;
  }

  mkdirSync(path.dirname(linkPath), { recursive: true });
  if (pathEntryExists(linkPath)) {
    rmSync(linkPath, { recursive: true, force: true });
  }
  symlinkSync(targetPath, linkPath, process.platform === 'win32' ? 'junction' : 'dir');
}

function ensureLocalGeneratedWorkspaceLink(taskName) {
  if (!existsSync(path.join(generatedPackageRoot, 'package.json'))) {
    fail(`Generated TypeScript workspace is missing: ${generatedPackageRoot}`);
  }

  const runtimeArtifactsReady = existsSync(path.join(generatedPackageDistRoot, 'index.js'));
  const sourceArtifactsReady = existsSync(path.join(generatedPackageSourceRoot, 'index.ts'));
  let targetRoot = null;

  if (runtimeArtifactsReady) {
    targetRoot = generatedPackageDistRoot;
  } else if (taskName === 'typecheck' && sourceArtifactsReady) {
    targetRoot = generatedPackageSourceRoot;
  }

  if (!targetRoot) {
    fail(
      `Generated TypeScript workspace is not ready for ${taskName}. Expected built dist at ${generatedPackageDistRoot}.`,
    );
  }

  ensureDirectoryLink(internalGeneratedLinkPath, targetRoot);
}

ensureLocalGeneratedWorkspaceLink(task);

switch (task) {
  case 'typecheck':
    run('typescript:composed-typecheck', [typeScriptCliPath, '-p', 'tsconfig.build.json', '--noEmit']);
    break;
  case 'build':
    run('typescript:composed-build', [typeScriptCliPath, '-p', 'tsconfig.build.json']);
    run('typescript:composed-clean', [path.join(scriptDir, 'clean-dist.mjs')]);
    break;
  case 'test':
    run('typescript:composed-test', [path.join(packageRoot, 'test', 'im-client.test.mjs')]);
    break;
  default:
    fail(`Unsupported package task "${task}". Expected one of: typecheck, build, test.`);
}
