#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const sharedCore = path.resolve(scriptDir, '../../../bin/package-publish-core.mjs');

const result = spawnSync(
  'node',
  [sharedCore, '--language', 'flutter', '--project-dir', projectDir, ...process.argv.slice(2)],
  { stdio: 'inherit', shell: process.platform === 'win32' },
);

process.exit(result.status ?? 1);
