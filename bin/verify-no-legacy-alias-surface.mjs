#!/usr/bin/env node
import { Dirent, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { legacyAliasContentPatterns, legacyAliasPathPatterns } from './legacy-alias-terms.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');

const topLevelExcludedDirectories = new Set([
  'bin',
  'test',
  'tests',
  '.sdkwork',
  '.tmp',
  'node_modules',
  '.git',
]);

const excludedPathSegments = new Set([
  'node_modules',
  '.git',
  '.sdkwork',
  '.tmp',
  '.dart_tool',
]);

const textFileExtensions = new Set([
  '.cjs',
  '.cs',
  '.csproj',
  '.css',
  '.dart',
  '.d.ts',
  '.go',
  '.gradle',
  '.java',
  '.js',
  '.json',
  '.kts',
  '.kt',
  '.lock',
  '.map',
  '.md',
  '.mjs',
  '.props',
  '.ps1',
  '.py',
  '.rb',
  '.sh',
  '.swift',
  '.targets',
  '.toml',
  '.ts',
  '.txt',
  '.xml',
  '.yaml',
  '.yml',
]);

function fail(message) {
  console.error(`[sdkwork-im-sdk] ${message}`);
  process.exit(1);
}

function isTextFile(filePath) {
  const extension = path.extname(filePath);
  return textFileExtensions.has(extension);
}

function shouldSkipDirectory(relativeDirectoryPath) {
  const normalizedPath = relativeDirectoryPath.replaceAll('\\', '/');
  const segments = normalizedPath.split('/').filter(Boolean);
  if (segments.length === 0) {
    return false;
  }
  if (segments.length === 1 && topLevelExcludedDirectories.has(segments[0])) {
    return true;
  }
  return segments.some((segment) => excludedPathSegments.has(segment));
}

function collectFiles(directoryPath, files = []) {
  const relativeDirectoryPath = path.relative(workspaceRoot, directoryPath);
  if (shouldSkipDirectory(relativeDirectoryPath)) {
    return files;
  }

  for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = path.join(directoryPath, entry.name);
    const relativeEntryPath = path.relative(workspaceRoot, entryPath).replaceAll('\\', '/');

    if (entry instanceof Dirent && entry.isDirectory()) {
      if (shouldSkipDirectory(relativeEntryPath)) {
        continue;
      }
      collectFiles(entryPath, files);
      continue;
    }

    files.push({
      absolutePath: entryPath,
      relativePath: relativeEntryPath,
    });
  }

  return files;
}

const failures = [];
const files = collectFiles(workspaceRoot);

for (const file of files) {
  for (const pattern of legacyAliasPathPatterns) {
    if (pattern.test(file.relativePath)) {
      failures.push(`Legacy alias path token is not allowed: ${file.relativePath}`);
    }
  }

  if (!isTextFile(file.absolutePath)) {
    continue;
  }

  const source = readFileSync(file.absolutePath, 'utf8');
  for (const pattern of legacyAliasContentPatterns) {
    if (pattern.test(source)) {
      failures.push(
        `Legacy alias token ${pattern} is not allowed in real workspace surface: ${file.relativePath}`,
      );
    }
  }
}

if (failures.length > 0) {
  fail(failures.join('\n'));
}

console.log('[sdkwork-im-sdk] Legacy alias surface verification passed.');
