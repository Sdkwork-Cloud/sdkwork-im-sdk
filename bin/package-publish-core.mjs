#!/usr/bin/env node
import { existsSync, renameSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function fail(message) {
  console.error(`[sdkwork-im-sdk] ${message}`);
  process.exit(1);
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.error) {
    throw new Error(result.error.message);
  }
  if ((result.status ?? 1) !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(' ')}`);
  }
}

function parseArgs(argv) {
  const parsed = {
    language: '',
    projectDir: '',
    action: 'check',
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (current === '--language') {
      parsed.language = argv[index + 1] || '';
      index += 1;
      continue;
    }
    if (current === '--project-dir') {
      parsed.projectDir = argv[index + 1] || '';
      index += 1;
      continue;
    }
    if (current === '--action') {
      parsed.action = argv[index + 1] || parsed.action;
      index += 1;
      continue;
    }
    if (current === '--dry-run') {
      parsed.dryRun = true;
      continue;
    }
    fail(`Unknown argument: ${current}`);
  }

  if (!parsed.language || !parsed.projectDir) {
    fail('Missing required arguments: --language and --project-dir');
  }

  return parsed;
}

function runTypeScript(projectDir, action, dryRun) {
  const packageJson = path.join(projectDir, 'package.json');
  if (!existsSync(packageJson)) {
    fail(`package.json not found: ${packageJson}`);
  }

  run('npm', ['run', 'build'], projectDir);

  if (action === 'check' || dryRun) {
    run('npm', ['pack', '--dry-run'], projectDir);
    return;
  }

  if (action === 'build') {
    return;
  }

  run('npm', ['publish', '--access', 'public'], projectDir);
}

function runFlutter(projectDir, action, dryRun) {
  const pubspec = path.join(projectDir, 'pubspec.yaml');
  if (!existsSync(pubspec)) {
    fail(`pubspec.yaml not found: ${pubspec}`);
  }

  run('dart', ['pub', 'get'], projectDir);
  if (action === 'check' || action === 'build' || dryRun) {
    run('dart', ['pub', 'publish', '--dry-run'], projectDir);
    return;
  }

  withIgnoredFlutterOverrides(projectDir, () => {
    run('dart', ['pub', 'publish', '--force'], projectDir);
  });
}

function withIgnoredFlutterOverrides(projectDir, callback) {
  const overridesPath = path.join(projectDir, 'pubspec_overrides.yaml');
  if (!existsSync(overridesPath)) {
    callback();
    return;
  }

  const hiddenOverridesPath = path.join(
    projectDir,
    '.pubspec_overrides.publish-check.yaml',
  );

  renameSync(overridesPath, hiddenOverridesPath);
  try {
    callback();
  } finally {
    if (existsSync(hiddenOverridesPath)) {
      renameSync(hiddenOverridesPath, overridesPath);
    }
  }
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const projectDir = path.resolve(args.projectDir);

    if (args.language === 'typescript') {
      runTypeScript(projectDir, args.action, args.dryRun);
      return;
    }
    if (args.language === 'flutter') {
      runFlutter(projectDir, args.action, args.dryRun);
      return;
    }

    fail(`Unsupported package publish language: ${args.language}`);
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
}

main();
