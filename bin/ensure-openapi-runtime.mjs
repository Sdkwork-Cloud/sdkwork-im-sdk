#!/usr/bin/env node

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    switch (arg) {
      case '--base-url':
        options.baseUrl = argv[++index];
        break;
      case '--host':
      case '--domain':
        options.host = argv[++index];
        break;
      case '--port':
        options.port = Number(argv[++index]);
        break;
      case '--scheme':
        options.scheme = argv[++index];
        break;
      case '--schema-url':
        options.schemaUrl = argv[++index];
        break;
      case '--admin-schema-url':
        options.adminSchemaUrl = argv[++index];
        break;
      case '--timeout-ms':
        options.timeoutMs = Number(argv[++index]);
        break;
      case '--repo-root':
        options.repoRoot = argv[++index];
        break;
      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        accept: 'application/json',
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function urlsReady(urls, attemptTimeoutMs) {
  for (const url of urls) {
    try {
      const response = await fetchWithTimeout(url, attemptTimeoutMs);
      if (!response.ok) {
        return false;
      }
    } catch {
      return false;
    }
  }

  return true;
}

async function waitForUrls(urls, timeoutMs) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await urlsReady(urls, 5000)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${urls.join(', ')}`);
}

function deriveBaseUrl({ baseUrl, scheme, host, port }) {
  if (baseUrl) {
    return baseUrl.replace(/\/+$/, '');
  }

  return `${scheme}://${host}:${port}`;
}

function deriveUrl(baseUrl, suffix, explicitUrl) {
  if (explicitUrl) {
    return explicitUrl;
  }
  return `${baseUrl}${suffix}`;
}

function killStartedRuntime(pid) {
  if (!pid) {
    return;
  }

  try {
    process.kill(pid);
  } catch {
    // ignore cleanup failures
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot =
    args.repoRoot || path.resolve(__dirname, '..', '..');
  const host = args.host || process.env.HOST || process.env.DOMAIN || '127.0.0.1';
  const port = args.port || Number(process.env.PORT || 3000);
  const scheme = args.scheme || process.env.SCHEME || 'http';
  const timeoutMs = args.timeoutMs || 60000;
  const baseUrl = deriveBaseUrl({
    baseUrl: args.baseUrl || process.env.BASE_URL,
    scheme,
    host,
    port,
  });
  const schemaUrl = deriveUrl(
    baseUrl,
    '/im/v3/openapi.json',
    args.schemaUrl || process.env.SCHEMA_URL || process.env.OPENAPI_REFRESH_URL,
  );
  const adminSchemaUrl = deriveUrl(
    baseUrl,
    '/admin/im/v3/openapi.json',
    args.adminSchemaUrl || process.env.ADMIN_SCHEMA_URL,
  );

  if (await urlsReady([schemaUrl, adminSchemaUrl], 3000)) {
    process.stdout.write(
      JSON.stringify({
        baseUrl,
        schemaUrl,
        adminSchemaUrl,
        startedRuntime: false,
      }),
    );
    return;
  }

  const child = spawn(
    process.execPath,
    [path.join(repoRoot, 'scripts', 'start-openapi-server.cjs')],
    {
      cwd: repoRoot,
      env: {
        ...process.env,
        HOST: host,
        PORT: String(port),
        JWT_SECRET:
          process.env.JWT_SECRET || 'openapi-runtime-helper-secret',
      },
      detached: true,
      stdio: 'ignore',
    },
  );

  child.unref();

  try {
    await waitForUrls([schemaUrl, adminSchemaUrl], timeoutMs);
    process.stdout.write(
      JSON.stringify({
        baseUrl,
        schemaUrl,
        adminSchemaUrl,
        startedRuntime: true,
        pid: child.pid,
      }),
    );
  } catch (error) {
    killStartedRuntime(child.pid);
    throw error;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
