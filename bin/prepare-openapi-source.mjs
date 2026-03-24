#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

function fail(message) {
  console.error(`[sdkwork-im-sdk] ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const parsed = {
    base: '',
    derived: '',
    preferDerived: false,
    refreshUrl: '',
    refreshTimeoutMs: 15000,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (current === '--base') {
      parsed.base = argv[index + 1] || '';
      index += 1;
      continue;
    }
    if (current === '--derived') {
      parsed.derived = argv[index + 1] || '';
      index += 1;
      continue;
    }
    if (current === '--prefer-derived') {
      parsed.preferDerived = true;
      continue;
    }
    if (current === '--refresh-url') {
      parsed.refreshUrl = argv[index + 1] || '';
      index += 1;
      continue;
    }
    if (current === '--refresh-timeout-ms') {
      const rawValue = argv[index + 1] || '';
      parsed.refreshTimeoutMs = Number.parseInt(rawValue, 10);
      index += 1;
      continue;
    }
    fail(`Unknown argument: ${current}`);
  }

  if (!parsed.base) {
    fail('Missing required argument: --base');
  }

  return parsed;
}

function ensureOpenApi3DocumentRaw(raw, label) {
  const trimmed = raw.trim();
  if (!trimmed) {
    fail(`Empty OpenAPI source: ${label}`);
  }

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    let parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch (error) {
      fail(
        `Invalid JSON OpenAPI source: ${label}\n${error instanceof Error ? error.message : String(error)}`,
      );
    }

    if (typeof parsed?.openapi !== 'string' || !parsed.openapi.startsWith('3.')) {
      fail(`Unsupported OpenAPI JSON source: ${label}`);
    }

    return raw;
  }

  const match = raw.match(/^\s*openapi\s*:\s*['"]?([^'"\n]+)['"]?/m);
  if (!match || !match[1] || !match[1].startsWith('3.')) {
    fail(`Unsupported OpenAPI YAML source: ${label}`);
  }

  return raw;
}

function ensureOpenApi3Document(filePath) {
  return ensureOpenApi3DocumentRaw(readFileSync(filePath, 'utf8'), filePath);
}

async function refreshOpenApiSource(refreshUrl, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(refreshUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        accept: 'application/json, application/yaml, text/yaml, text/plain;q=0.8, */*;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const raw = await response.text();
    return ensureOpenApi3DocumentRaw(raw, refreshUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[sdkwork-im-sdk] OpenAPI refresh skipped: ${message}`);
    return '';
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const basePath = path.resolve(args.base);
  if (!existsSync(basePath)) {
    fail(`Base OpenAPI file not found: ${basePath}`);
  }

  let baseSpecRaw = ensureOpenApi3Document(basePath);
  let selectedPath = basePath;

  if (args.derived) {
    const derivedPath = path.resolve(args.derived);
    let derivedRaw = baseSpecRaw;

    if (args.refreshUrl) {
      const refreshed = await refreshOpenApiSource(args.refreshUrl, args.refreshTimeoutMs);
      if (refreshed) {
        derivedRaw = refreshed;
        baseSpecRaw = refreshed;
      }
    }

    writeFileSync(basePath, baseSpecRaw, 'utf8');
    mkdirSync(path.dirname(derivedPath), { recursive: true });
    writeFileSync(derivedPath, derivedRaw, 'utf8');
    if (args.preferDerived) {
      selectedPath = derivedPath;
    }
  } else if (args.refreshUrl) {
    const refreshed = await refreshOpenApiSource(args.refreshUrl, args.refreshTimeoutMs);
    if (refreshed) {
      baseSpecRaw = refreshed;
      mkdirSync(path.dirname(basePath), { recursive: true });
      writeFileSync(basePath, baseSpecRaw, 'utf8');
    }
  }

  process.stdout.write(selectedPath);
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
