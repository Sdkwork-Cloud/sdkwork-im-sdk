#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hardenFlutterGeneratedSdk } from './harden-flutter-generated-sdk.mjs';
import { hardenTypeScriptGeneratedSdk } from './harden-typescript-generated-sdk.mjs';

function fail(message) {
  console.error(`[sdkwork-im-sdk] ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const parsed = {
    languages: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (current === '--language') {
      const value = (argv[index + 1] || '').trim();
      if (!value) {
        fail('Missing value for --language');
      }
      parsed.languages.push(value);
      index += 1;
      continue;
    }

    fail(`Unknown argument: ${current}`);
  }

  return parsed;
}

function readText(filePath) {
  if (!existsSync(filePath)) {
    fail(`Missing required file: ${filePath}`);
  }
  return readFileSync(filePath, 'utf8');
}

function ensureFile(filePath, contents) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function yamlScalar(raw, key) {
  const match = raw.match(new RegExp(`^${key}:\\s*['"]?([^'"\\n]+)['"]?`, 'm'));
  return match ? match[1].trim() : '';
}

function yamlSectionMap(raw, section) {
  const lines = raw.split(/\r?\n/);
  const values = {};
  let active = false;

  for (const line of lines) {
    if (!active) {
      if (line.trim() === `${section}:`) {
        active = true;
      }
      continue;
    }

    if (!line.trim()) {
      continue;
    }

    if (!line.startsWith('  ')) {
      break;
    }

    if (line.startsWith('    ')) {
      continue;
    }

    const match = line.match(/^  ([A-Za-z0-9_.@/-]+):\s*(.+?)\s*$/);
    if (match) {
      values[match[1]] = match[2];
    }
  }

  return values;
}

function readPubspec(filePath) {
  const raw = readText(filePath);
  return {
    name: yamlScalar(raw, 'name'),
    version: yamlScalar(raw, 'version'),
    description: yamlScalar(raw, 'description'),
    publishTo: yamlScalar(raw, 'publish_to'),
    dependencies: yamlSectionMap(raw, 'dependencies'),
  };
}

function readPythonProject(filePath) {
  const raw = readText(filePath);
  const nameMatch = raw.match(/^name\s*=\s*"([^"\n]+)"/m);
  const versionMatch = raw.match(/^version\s*=\s*"([^"\n]+)"/m);
  return {
    name: nameMatch ? nameMatch[1] : '',
    version: versionMatch ? versionMatch[1] : '',
  };
}

function readPom(filePath) {
  const raw = readText(filePath);
  const artifactMatch = raw.match(/<artifactId>([^<]+)<\/artifactId>/);
  const versionMatch = raw.match(/<version>([^<]+)<\/version>/);
  return {
    name: artifactMatch ? artifactMatch[1] : '',
    version: versionMatch ? versionMatch[1] : '',
  };
}

function readGradle(filePath) {
  const raw = readText(filePath);
  const groupMatch = raw.match(/^group\s*=\s*"([^"\n]+)"/m);
  const versionMatch = raw.match(/^version\s*=\s*"([^"\n]+)"/m);
  return {
    name: groupMatch ? groupMatch[1] : '',
    version: versionMatch ? versionMatch[1] : '',
  };
}

function readSwiftPackage(filePath) {
  const raw = readText(filePath);
  const nameMatch = raw.match(/name:\s*"([^"\n]+)"/);
  return {
    name: nameMatch ? nameMatch[1] : '',
    version: '',
  };
}

function readGoModule(filePath) {
  const raw = readText(filePath);
  const match = raw.match(/^module\s+([^\s]+)$/m);
  return {
    name: match ? match[1] : '',
    version: '',
  };
}

function readCsproj(filePath) {
  const raw = readText(filePath);
  const nameMatch = raw.match(/<AssemblyName>([^<]+)<\/AssemblyName>/);
  const versionMatch = raw.match(/<Version>([^<]+)<\/Version>/);
  return {
    name: nameMatch ? nameMatch[1] : '',
    version: versionMatch ? versionMatch[1] : '',
  };
}

function renderDependencyList(dependencies) {
  if (!dependencies || dependencies.length === 0) {
    return '-';
  }
  return dependencies.map((entry) => `\`${entry}\``).join(', ');
}

function renderAdapterSdk(layer) {
  if (!layer?.sdk) {
    return '-';
  }

  const version = layer.sdkVersion ? `@${layer.sdkVersion}` : '';
  return `\`${layer.sdk}${version}\``;
}

function normalizeDependencies(map) {
  return Object.entries(map || {}).map(([name, version]) => `${name}@${version}`);
}

function readAuthorityContract(filePath) {
  const raw = readText(filePath);
  const trimmed = raw.trim();

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    return {
      openapiVersion:
        typeof parsed?.openapi === 'string' ? parsed.openapi : '',
      apiVersion:
        typeof parsed?.info?.version === 'string'
          ? parsed.info.version
          : '',
    };
  }

  const openapiVersionMatch = raw.match(/^\s*openapi:\s*['"]?([^'"\n]+)['"]?/m);
  const apiVersionMatch = raw.match(/^\s{2}version:\s*['"]?([^'"\n]+)['"]?/m);

  return {
    openapiVersion: openapiVersionMatch ? openapiVersionMatch[1] : '',
    apiVersion: apiVersionMatch ? apiVersionMatch[1] : '',
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const workspaceRoot = path.resolve(scriptDir, '..');
  const docsDir = path.join(workspaceRoot, 'docs');
  const authorityPath = path.join(workspaceRoot, 'openapi', 'openchat-im.openapi.yaml');
  const sdkgenPath = path.join(workspaceRoot, 'openapi', 'openchat-im.sdkgen.yaml');
  const assemblyPath = path.join(workspaceRoot, '.sdkwork-assembly.json');
  const compatibilityMatrixPath = path.join(docsDir, 'compatibility-matrix.md');
  const authority = readAuthorityContract(authorityPath);

  hardenTypeScriptGeneratedSdk(workspaceRoot);
  hardenFlutterGeneratedSdk(workspaceRoot);

  const generatedVersions = [
    readJson(path.join(workspaceRoot, 'sdkwork-im-sdk-typescript', 'generated', 'server-openapi', 'package.json'))
      .version,
    readPubspec(path.join(workspaceRoot, 'sdkwork-im-sdk-flutter', 'generated', 'server-openapi', 'pubspec.yaml'))
      .version,
    readPythonProject(
      path.join(workspaceRoot, 'sdkwork-im-sdk-python', 'generated', 'server-openapi', 'pyproject.toml'),
    ).version,
    readPom(path.join(workspaceRoot, 'sdkwork-im-sdk-java', 'generated', 'server-openapi', 'pom.xml')).version,
    readGradle(
      path.join(workspaceRoot, 'sdkwork-im-sdk-kotlin', 'generated', 'server-openapi', 'build.gradle.kts'),
    ).version,
    readCsproj(
      path.join(workspaceRoot, 'sdkwork-im-sdk-csharp', 'generated', 'server-openapi', 'Backend.csproj'),
    ).version,
  ].filter(Boolean);

  const workspaceVersion = generatedVersions[0] || authority.apiVersion || '0.1.0';

  const typescriptGenerated = readJson(
    path.join(workspaceRoot, 'sdkwork-im-sdk-typescript', 'generated', 'server-openapi', 'package.json'),
  );
  const typescriptAdapter = readJson(
    path.join(workspaceRoot, 'sdkwork-im-sdk-typescript', 'adapter-wukongim', 'package.json'),
  );
  const typescriptComposed = readJson(
    path.join(workspaceRoot, 'sdkwork-im-sdk-typescript', 'composed', 'package.json'),
  );

  const flutterGenerated = readPubspec(
    path.join(workspaceRoot, 'sdkwork-im-sdk-flutter', 'generated', 'server-openapi', 'pubspec.yaml'),
  );
  const flutterAdapter = readPubspec(
    path.join(workspaceRoot, 'sdkwork-im-sdk-flutter', 'adapter-wukongim', 'pubspec.yaml'),
  );
  const flutterComposed = readPubspec(
    path.join(workspaceRoot, 'sdkwork-im-sdk-flutter', 'composed', 'pubspec.yaml'),
  );

  const languages = [
    {
      language: 'typescript',
      realtime: 'first-class',
      workspaceDir: 'sdkwork-im-sdk-typescript',
      layers: {
        generated: {
          path: 'generated/server-openapi',
          present: true,
          packageName: typescriptGenerated.name,
          version: typescriptGenerated.version || workspaceVersion,
        },
        adapter: {
          path: 'adapter-wukongim',
          present: true,
          packageName: typescriptAdapter.name,
          version: typescriptAdapter.version || workspaceVersion,
          sdk: 'wukongimjssdk',
          sdkVersion: typescriptAdapter.dependencies?.wukongimjssdk || '',
          dependencies: normalizeDependencies(typescriptAdapter.dependencies),
        },
        composed: {
          path: 'composed',
          present: true,
          packageName: typescriptComposed.name,
          version: typescriptComposed.version || workspaceVersion,
          dependencies: normalizeDependencies(typescriptComposed.dependencies),
        },
      },
    },
    {
      language: 'flutter',
      realtime: 'first-class',
      workspaceDir: 'sdkwork-im-sdk-flutter',
      layers: {
        generated: {
          path: 'generated/server-openapi',
          present: true,
          packageName: flutterGenerated.name,
          version: flutterGenerated.version || workspaceVersion,
        },
        adapter: {
          path: 'adapter-wukongim',
          present: true,
          packageName: flutterAdapter.name,
          version: flutterAdapter.version || workspaceVersion,
          sdk: 'wukongimfluttersdk',
          sdkVersion: flutterAdapter.dependencies.wukongimfluttersdk || '',
          dependencies: normalizeDependencies(flutterAdapter.dependencies),
        },
        composed: {
          path: 'composed',
          present: true,
          packageName: flutterComposed.name,
          version: flutterComposed.version || workspaceVersion,
          dependencies: normalizeDependencies(flutterComposed.dependencies),
        },
      },
    },
    {
      language: 'python',
      realtime: 'generated-only',
      workspaceDir: 'sdkwork-im-sdk-python',
      layers: {
        generated: {
          path: 'generated/server-openapi',
          present: true,
          ...readPythonProject(
            path.join(workspaceRoot, 'sdkwork-im-sdk-python', 'generated', 'server-openapi', 'pyproject.toml'),
          ),
          version:
            readPythonProject(
              path.join(workspaceRoot, 'sdkwork-im-sdk-python', 'generated', 'server-openapi', 'pyproject.toml'),
            ).version || workspaceVersion,
        },
      },
    },
    {
      language: 'go',
      realtime: 'generated-only',
      workspaceDir: 'sdkwork-im-sdk-go',
      layers: {
        generated: {
          path: 'generated/server-openapi',
          present: true,
          ...readGoModule(path.join(workspaceRoot, 'sdkwork-im-sdk-go', 'generated', 'server-openapi', 'go.mod')),
          version: workspaceVersion,
        },
      },
    },
    {
      language: 'java',
      realtime: 'generated-only',
      workspaceDir: 'sdkwork-im-sdk-java',
      layers: {
        generated: {
          path: 'generated/server-openapi',
          present: true,
          ...readPom(path.join(workspaceRoot, 'sdkwork-im-sdk-java', 'generated', 'server-openapi', 'pom.xml')),
        },
      },
    },
    {
      language: 'kotlin',
      realtime: 'generated-only',
      workspaceDir: 'sdkwork-im-sdk-kotlin',
      layers: {
        generated: {
          path: 'generated/server-openapi',
          present: true,
          ...readGradle(
            path.join(workspaceRoot, 'sdkwork-im-sdk-kotlin', 'generated', 'server-openapi', 'build.gradle.kts'),
          ),
        },
      },
    },
    {
      language: 'swift',
      realtime: 'generated-only',
      workspaceDir: 'sdkwork-im-sdk-swift',
      layers: {
        generated: {
          path: 'generated/server-openapi',
          present: true,
          ...readSwiftPackage(
            path.join(workspaceRoot, 'sdkwork-im-sdk-swift', 'generated', 'server-openapi', 'Package.swift'),
          ),
          version: workspaceVersion,
        },
      },
    },
    {
      language: 'csharp',
      realtime: 'generated-only',
      workspaceDir: 'sdkwork-im-sdk-csharp',
      layers: {
        generated: {
          path: 'generated/server-openapi',
          present: true,
          ...readCsproj(
            path.join(workspaceRoot, 'sdkwork-im-sdk-csharp', 'generated', 'server-openapi', 'Backend.csproj'),
          ),
        },
      },
    },
  ].filter((entry) => args.languages.length === 0 || args.languages.includes(entry.language));

  const manifest = {
    assembledAt: new Date().toISOString(),
    workspace: 'sdkwork-im-sdk',
    workspaceVersion,
    openapi: {
      authorityPath: 'openapi/openchat-im.openapi.yaml',
      sdkgenPath: 'openapi/openchat-im.sdkgen.yaml',
      openapiVersion: authority.openapiVersion,
      apiVersion: authority.apiVersion,
      sdkgenExists: existsSync(sdkgenPath),
    },
    languages,
    compatibilityWrappers: [
      {
        wrapper: 'android',
        role: 'compatibility wrapper',
        recommendedWorkspace: 'sdkwork-im-sdk-kotlin',
      },
      {
        wrapper: 'ios',
        role: 'compatibility wrapper',
        recommendedWorkspace: 'sdkwork-im-sdk-swift',
      },
    ],
  };

  for (const language of manifest.languages) {
    ensureFile(
      path.join(workspaceRoot, language.workspaceDir, language.layers.generated.path, '.sdkwork-generated'),
      'generator-owned\n',
    );
  }

  for (const manualDir of [
    path.join(workspaceRoot, 'sdkwork-im-sdk-typescript', 'adapter-wukongim', '.manual-owned'),
    path.join(workspaceRoot, 'sdkwork-im-sdk-typescript', 'composed', '.manual-owned'),
    path.join(workspaceRoot, 'sdkwork-im-sdk-flutter', 'adapter-wukongim', '.manual-owned'),
    path.join(workspaceRoot, 'sdkwork-im-sdk-flutter', 'composed', '.manual-owned'),
  ]) {
    ensureFile(manualDir, 'manual-owned\n');
  }

  const compatibilityLines = [
    '# Compatibility Matrix',
    '',
    `Authority OpenAPI version: \`${manifest.openapi.openapiVersion}\``,
    `Authority API version: \`${manifest.openapi.apiVersion}\``,
    `Workspace SDK release: \`${manifest.workspaceVersion}\``,
    '',
    '| Language | Realtime | Generated Layer | Generated Version | Adapter SDK | Composed Dependencies |',
    '| --- | --- | --- | --- | --- | --- |',
  ];

  for (const language of languages) {
    compatibilityLines.push(
      `| ${language.language} | ${language.realtime} | \`${language.layers.generated.path}\` | \`${language.layers.generated.version || manifest.workspaceVersion}\` | ${renderAdapterSdk(language.layers.adapter)} | ${renderDependencyList(language.layers.composed?.dependencies)} |`,
    );
  }

  compatibilityLines.push(
    '',
    '## Compatibility Wrappers',
    '',
    '| Wrapper | Role | Recommended Workspace |',
    '| --- | --- | --- |',
  );

  for (const wrapper of manifest.compatibilityWrappers) {
    compatibilityLines.push(
      `| ${wrapper.wrapper} | ${wrapper.role} | \`${wrapper.recommendedWorkspace}\` |`,
    );
  }

  mkdirSync(docsDir, { recursive: true });
  writeFileSync(assemblyPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  writeFileSync(compatibilityMatrixPath, `${compatibilityLines.join('\n')}\n`, 'utf8');

  process.stdout.write(
    `[sdkwork-im-sdk] assembled ${manifest.languages.length} language workspaces using release ${manifest.workspaceVersion}\n`,
  );
}

main();
