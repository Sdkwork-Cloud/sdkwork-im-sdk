#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { legacyGeneratedClientTerms } from './legacy-alias-terms.mjs';

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
      const value = (argv[index + 1] || '').trim().toLowerCase();
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

function normalizeNewlines(value) {
  return value.replace(/\r?\n/g, '\n');
}

function ensureParentDirectory(filePath) {
  mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeIfChanged(filePath, content) {
  const nextContent = normalizeNewlines(content);
  const currentContent = existsSync(filePath) ? normalizeNewlines(readFileSync(filePath, 'utf8')) : null;
  if (currentContent === nextContent) {
    return;
  }
  ensureParentDirectory(filePath);
  writeFileSync(filePath, nextContent, 'utf8');
}

function writeJsonIfChanged(filePath, value) {
  writeIfChanged(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function removeIfExists(targetPath) {
  if (!existsSync(targetPath)) {
    return;
  }
  rmSync(targetPath, { recursive: true, force: true });
}

const INTERNAL_TYPESCRIPT_GENERATED_PACKAGE_NAME = '@sdkwork-internal/im-sdk-generated';
const APP_FACING_SDK_METADATA_TYPE = 'app';
const LEGACY_GENERATOR_TYPE = ['back', 'end'].join('');
const INTERNAL_TYPESCRIPT_GENERATED_DESCRIPTION =
  'Internal generated transport build workspace for the IM TypeScript SDK';
const GENERATED_PACKAGE_NAME_BY_LANGUAGE = {
  typescript: INTERNAL_TYPESCRIPT_GENERATED_PACKAGE_NAME,
  flutter: 'im_sdk_generated',
  rust: 'sdkwork-im-sdk-generated',
  java: 'com.sdkwork:im-sdk-generated',
  csharp: 'Sdkwork.Im.Sdk.Generated',
  swift: 'ImSdkGenerated',
  kotlin: 'com.sdkwork:im-sdk-generated',
  go: 'github.com/sdkwork/im-sdk-generated',
  python: 'sdkwork-im-sdk-generated',
};
const GENERATED_TRANSPORT_DESCRIPTION_BY_LANGUAGE = {
  flutter: 'Generator-owned Flutter transport SDK for the Craw Chat app API.',
  rust: 'Generator-owned Rust transport SDK for the Craw Chat app API.',
  java: 'Generator-owned Java transport SDK for the Craw Chat app API.',
  csharp: 'Generator-owned C# transport SDK for the Craw Chat app API.',
  swift: 'Generator-owned Swift transport SDK for the Craw Chat app API.',
  kotlin: 'Generator-owned Kotlin transport SDK for the Craw Chat app API.',
  go: 'Generator-owned Go transport SDK for the Craw Chat app API.',
  python: 'Generator-owned Python transport SDK for the Craw Chat app API.',
};
const GENERATED_TRANSPORT_GROUPS = [
  'auth',
  'portal',
  'session',
  'presence',
  'realtime',
  'device',
  'inbox',
  'conversation',
  'message',
  'media',
  'stream',
  'rtc',
];

function getGeneratedDescription(language) {
  if (language === 'typescript') {
    return INTERNAL_TYPESCRIPT_GENERATED_DESCRIPTION;
  }
  const description = GENERATED_TRANSPORT_DESCRIPTION_BY_LANGUAGE[language];
  if (!description) {
    fail(`Missing generated transport description for ${language}.`);
  }
  return description;
}

function getGeneratedPackageName(language) {
  const packageName = GENERATED_PACKAGE_NAME_BY_LANGUAGE[language];
  if (!packageName) {
    fail(`Missing generated package name for ${language}.`);
  }
  return packageName;
}

function transformFileIfExists(filePath, transform) {
  if (!existsSync(filePath)) {
    return;
  }
  const currentSource = normalizeNewlines(readFileSync(filePath, 'utf8'));
  const nextSource = normalizeNewlines(transform(currentSource));
  writeIfChanged(filePath, nextSource);
}

function replaceRequired(source, pattern, replacement, label) {
  if (!pattern.test(source)) {
    fail(`Unable to normalize ${label}.`);
  }
  return source.replace(pattern, replacement);
}

function replaceBetween(source, startMarker, endMarker, replacement, label) {
  const startIndex = source.indexOf(startMarker);
  if (startIndex === -1) {
    fail(`Unable to normalize ${label}.`);
  }
  const endIndex = source.indexOf(endMarker, startIndex);
  if (endIndex === -1) {
    fail(`Unable to normalize ${label}.`);
  }
  return `${source.slice(0, startIndex)}${replacement}${source.slice(endIndex)}`;
}

function replaceBetweenIfPresent(source, startMarker, endMarker, replacement, label) {
  const startIndex = source.indexOf(startMarker);
  if (startIndex === -1) {
    return source;
  }
  const endIndex = source.indexOf(endMarker, startIndex);
  if (endIndex === -1) {
    fail(`Unable to normalize ${label}.`);
  }
  return `${source.slice(0, startIndex)}${replacement}${source.slice(endIndex)}`;
}

function setYamlDescription(filePath, description) {
  transformFileIfExists(filePath, (source) =>
    replaceRequired(source, /^description:\s.*$/m, `description: ${description}`, `${filePath} description`),
  );
}

function setTomlDescription(filePath, description) {
  transformFileIfExists(filePath, (source) =>
    replaceRequired(source, /^\s*description\s*=\s*"[^"]*"$/m, `description = "${description}"`, `${filePath} description`),
  );
}

function setXmlDescription(filePath, tagName, description) {
  transformFileIfExists(filePath, (source) =>
    replaceRequired(
      source,
      new RegExp(`<${tagName}>[^<]*<\\/${tagName}>`),
      `<${tagName}>${description}</${tagName}>`,
      `${filePath} ${tagName}`,
    ),
  );
}

function setGradleDescription(filePath, description) {
  transformFileIfExists(filePath, (source) => {
    if (/^\s*description\s*=\s*"[^"]*"\s*$/m.test(source)) {
      return source.replace(/^\s*description\s*=\s*"[^"]*"\s*$/m, `description = "${description}"`);
    }
    if (!/^\s*version\s*=\s*"[^"]*"\s*$/m.test(source)) {
      fail(`Unable to normalize ${filePath} description.`);
    }
    return source.replace(
      /^(\s*version\s*=\s*"[^"]*"\s*)$/m,
      `$1\n\ndescription = "${description}"`,
    );
  });
}

function syncGeneratedManifestDescription(language, generatedRoot) {
  const description = getGeneratedDescription(language);
  switch (language) {
    case 'typescript':
      return;
    case 'flutter':
      setYamlDescription(path.join(generatedRoot, 'pubspec.yaml'), description);
      return;
    case 'rust':
      setTomlDescription(path.join(generatedRoot, 'Cargo.toml'), description);
      return;
    case 'java':
      setXmlDescription(path.join(generatedRoot, 'pom.xml'), 'description', description);
      return;
    case 'csharp':
      setXmlDescription(
        path.join(generatedRoot, 'Sdkwork.Im.Sdk.Generated.csproj'),
        'Description',
        description,
      );
      return;
    case 'kotlin':
      setGradleDescription(path.join(generatedRoot, 'build.gradle.kts'), description);
      return;
    case 'python':
      setTomlDescription(path.join(generatedRoot, 'pyproject.toml'), description);
      return;
    case 'swift':
    case 'go':
      return;
    default:
      fail(`Unsupported generated manifest description normalization for ${language}.`);
  }
}

function renderGeneratedTransportGroups(renderAccessor) {
  return GENERATED_TRANSPORT_GROUPS.map((groupName) => `- \`${renderAccessor(groupName)}\``).join('\n');
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderGeneratedRegenerationContract() {
  return `## Regeneration Contract

- Generator-owned files are tracked in \`.sdkwork/sdkwork-generator-manifest.json\`.
- Each run also writes \`.sdkwork/sdkwork-generator-changes.json\`.
- Apply mode also writes \`.sdkwork/sdkwork-generator-report.json\`.
- Put hand-written wrappers, adapters, and orchestration in \`custom/\`.
- Files scaffolded under \`custom/\` are created once and preserved across regenerations.
- If a generated-owned file was modified locally, its previous content is copied to \`.sdkwork/manual-backups/\` before overwrite or removal.
`;
}

function renderGeneratedTransportReadme(config) {
  return `# ${config.heading}

${getGeneratedDescription(config.language)}

## Boundary

This package is the low-level generated transport boundary for the Craw Chat app API.
Prefer the app-facing ${config.consumerPackage} and \`ImSdkClient\` for most
application code. Use this package directly only when you explicitly need raw
generated transport modules.

The generated package identity is ${config.packageIdentity}.

## Authentication

Craw Chat app routes use bearer authentication only.

\`\`\`${config.codeFence}
${config.authSnippet}
\`\`\`

## API Modules

${renderGeneratedTransportGroups(config.renderAccessor)}

${renderGeneratedRegenerationContract()}`;
}

function renderTypeScriptIndex() {
  return `export { ImTransportClient, createTransportClient } from './sdk';
export * from './types';
export * from './api';
`;
}

function renderTypeScriptSdk() {
  return `import { HttpClient, createHttpClient } from './http/client';
import type { ImGeneratedConfig } from './types/common';
import type { AuthTokenManager } from '@sdkwork/sdk-common';

import { AuthApi, createAuthApi } from './api/auth';
import { PortalApi, createPortalApi } from './api/portal';
import { SessionApi, createSessionApi } from './api/session';
import { PresenceApi, createPresenceApi } from './api/presence';
import { RealtimeApi, createRealtimeApi } from './api/realtime';
import { DeviceApi, createDeviceApi } from './api/device';
import { InboxApi, createInboxApi } from './api/inbox';
import { ConversationApi, createConversationApi } from './api/conversation';
import { MessageApi, createMessageApi } from './api/message';
import { MediaApi, createMediaApi } from './api/media';
import { StreamApi, createStreamApi } from './api/stream';
import { RtcApi, createRtcApi } from './api/rtc';

export class ImTransportClient {
  private readonly httpClient: HttpClient;

  public readonly auth: AuthApi;
  public readonly portal: PortalApi;
  public readonly session: SessionApi;
  public readonly presence: PresenceApi;
  public readonly realtime: RealtimeApi;
  public readonly device: DeviceApi;
  public readonly inbox: InboxApi;
  public readonly conversation: ConversationApi;
  public readonly message: MessageApi;
  public readonly media: MediaApi;
  public readonly stream: StreamApi;
  public readonly rtc: RtcApi;

  constructor(config: ImGeneratedConfig) {
    this.httpClient = createHttpClient(config);
    this.auth = createAuthApi(this.httpClient);
    this.portal = createPortalApi(this.httpClient);
    this.session = createSessionApi(this.httpClient);
    this.presence = createPresenceApi(this.httpClient);
    this.realtime = createRealtimeApi(this.httpClient);
    this.device = createDeviceApi(this.httpClient);
    this.inbox = createInboxApi(this.httpClient);
    this.conversation = createConversationApi(this.httpClient);
    this.message = createMessageApi(this.httpClient);
    this.media = createMediaApi(this.httpClient);
    this.stream = createStreamApi(this.httpClient);
    this.rtc = createRtcApi(this.httpClient);
  }

  setAuthToken(token: string): this {
    this.httpClient.setAuthToken(token);
    return this;
  }

  setTokenManager(manager: AuthTokenManager): this {
    this.httpClient.setTokenManager(manager);
    return this;
  }
}

export function createTransportClient(config: ImGeneratedConfig): ImTransportClient {
  return new ImTransportClient(config);
}

export default ImTransportClient;
`;
}

function renderTypeScriptHttpClient() {
  return `import type { ImGeneratedConfig } from '../types/common';
import type { RequestOptions, QueryParams } from '@sdkwork/sdk-common';
import type { AuthTokenManager } from '@sdkwork/sdk-common';
import { BaseHttpClient, withRetry } from '@sdkwork/sdk-common';

type HttpRequestOptions = RequestOptions & {
  body?: unknown;
  headers?: Record<string, string>;
  contentType?: string;
};

export class HttpClient extends BaseHttpClient {
  constructor(config: ImGeneratedConfig) {
    super(config as any);
  }

  private getInternalAuthConfig(): any {
    const self = this as any;
    self.authConfig = self.authConfig || {};
    return self.authConfig;
  }

  private buildRequestHeaders(
    headers?: Record<string, string>,
    contentType?: string,
  ): Record<string, string> | undefined {
    const mergedHeaders = {
      ...(headers ?? {}),
    };

    if (contentType && contentType.toLowerCase() !== 'multipart/form-data') {
      mergedHeaders['Content-Type'] = contentType;
    }

    return Object.keys(mergedHeaders).length > 0 ? mergedHeaders : undefined;
  }

  private buildRequestBody(body: unknown, contentType?: string): unknown {
    if (body == null) {
      return body;
    }

    const normalizedContentType = (contentType ?? '').toLowerCase();
    if (normalizedContentType === 'application/x-www-form-urlencoded') {
      return this.encodeFormBody(body);
    }

    return body;
  }

  private encodeFormBody(body: unknown): string {
    if (body instanceof URLSearchParams) {
      return body.toString();
    }
    if (typeof body === 'string') {
      return body;
    }

    const params = new URLSearchParams();
    if (body instanceof Map) {
      for (const [key, value] of body.entries()) {
        this.appendFormValue(params, String(key), value);
      }
      return params.toString();
    }
    if (typeof body === 'object') {
      for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
        this.appendFormValue(params, key, value);
      }
      return params.toString();
    }

    params.append('value', String(body));
    return params.toString();
  }

  private appendFormValue(params: URLSearchParams, key: string, value: unknown): void {
    if (value == null) {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => this.appendFormValue(params, key, item));
      return;
    }
    if (value instanceof Date) {
      params.append(key, value.toISOString());
      return;
    }
    if (typeof value === 'object') {
      params.append(key, JSON.stringify(value));
      return;
    }
    params.append(key, String(value));
  }

  setAuthToken(token: string): void {
    super.setAuthToken(token);
  }

  setTokenManager(manager: AuthTokenManager): void {
    const baseProto = Object.getPrototypeOf(HttpClient.prototype) as {
      setTokenManager?: (this: HttpClient, m: AuthTokenManager) => void;
    };
    if (typeof baseProto.setTokenManager === 'function') {
      baseProto.setTokenManager.call(this, manager);
      return;
    }
    this.getInternalAuthConfig().tokenManager = manager;
  }

  async request<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    const execute = (this as any).execute;
    if (typeof execute !== 'function') {
      throw new Error('BaseHttpClient execute method is not available');
    }
    const { body, headers, contentType, method = 'GET', ...rest } = options;
    return withRetry(
      () =>
        execute.call(this, {
          url: path,
          method,
          ...rest,
          body: this.buildRequestBody(body, contentType),
          headers: this.buildRequestHeaders(headers, body == null ? undefined : contentType),
        }),
      { maxRetries: 3 },
    );
  }

  async get<T>(path: string, params?: QueryParams, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(path, { method: 'GET', params, headers });
  }

  async post<T>(
    path: string,
    body?: unknown,
    params?: QueryParams,
    headers?: Record<string, string>,
    contentType?: string,
  ): Promise<T> {
    return this.request<T>(path, { method: 'POST', body, params, headers, contentType });
  }

  async put<T>(
    path: string,
    body?: unknown,
    params?: QueryParams,
    headers?: Record<string, string>,
    contentType?: string,
  ): Promise<T> {
    return this.request<T>(path, { method: 'PUT', body, params, headers, contentType });
  }

  async delete<T>(path: string, params?: QueryParams, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(path, { method: 'DELETE', params, headers });
  }

  async patch<T>(
    path: string,
    body?: unknown,
    params?: QueryParams,
    headers?: Record<string, string>,
    contentType?: string,
  ): Promise<T> {
    return this.request<T>(path, { method: 'PATCH', body, params, headers, contentType });
  }
}

export function createHttpClient(config: ImGeneratedConfig): HttpClient {
  return new HttpClient(config);
}
`;
}

function renderTypeScriptCommonTypes() {
  return `export interface BasePlusVO {
  id?: string | number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface BasePlusEntity extends BasePlusVO {
  deleted?: boolean;
}

export interface QueryListForm {
  keyword?: string;
  status?: string | number;
  startTime?: string;
  endTime?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export type { Page, PageResult, RequestConfig, RequestOptions, QueryParams } from '@sdkwork/sdk-common';
export { DEFAULT_TIMEOUT, SUCCESS_CODES } from '@sdkwork/sdk-common';
import type { AuthTokenManager } from '@sdkwork/sdk-common';
export type { AuthTokenManager };

export interface ImGeneratedConfig {
  baseUrl: string;
  authToken?: string;
  tokenManager?: AuthTokenManager;
  timeout?: number;
  headers?: Record<string, string>;
}
`;
}

function renderTypeScriptReadme() {
  return `# sdkwork-im-sdk-typescript/generated/server-openapi

Generator-owned TypeScript transport workspace for the Craw Chat app API.

This directory is an internal-only generated build workspace. It exists so the
public root package \`@sdkwork/im-sdk\` can assemble generated transport
output into the single consumer-facing TypeScript SDK.

The internal generated package identity is
\`@sdkwork-internal/im-sdk-generated\`.

## Consumer Direction

Application code must start from \`@sdkwork/im-sdk\` and \`ImSdkClient\`.

This workspace is internal. It does not define a second public client contract.
Its low-level transport entrypoints are \`ImTransportClient\` and
\`createTransportClient\` for generator assembly and internal verification only.

## Workspace Boundary

- this directory is generator-owned
- it is not a second TypeScript consumer package
- it is not a publish target
- Internal generator subpaths are not part of the supported public API.
- the workspace normalization wrapper strips generator-only auth scaffolding and
  source-tree build residue before verification and packaging

## Transport Shape

Generated transport remains bearer-only:

\`\`\`typescript
const client = new ImTransportClient({
  baseUrl: 'http://127.0.0.1:18090',
});

client.setAuthToken('your-bearer-token');
// Sends: Authorization: Bearer <token>
\`\`\`

Route groups currently exposed from the generated transport:

- \`client.auth\`
- \`client.portal\`
- \`client.session\`
- \`client.presence\`
- \`client.realtime\`
- \`client.device\`
- \`client.inbox\`
- \`client.conversation\`
- \`client.message\`
- \`client.media\`
- \`client.stream\`
- \`client.rtc\`

## Regeneration Contract

- generator-owned files are tracked in \`.sdkwork/sdkwork-generator-manifest.json\`
- each run also writes \`.sdkwork/sdkwork-generator-changes.json\`
- apply mode also writes \`.sdkwork/sdkwork-generator-report.json\`
- hand-written wrappers, adapters, and orchestration belong in \`custom/\`
- files scaffolded under \`custom/\` are created once and preserved across regenerations
- if a generated-owned file was modified locally, its previous content is copied
  to \`.sdkwork/manual-backups/\` before overwrite or removal
`;
}

function normalizeTypeScriptWorkspaceMetadata(generatedRoot) {
  const packageJsonPath = path.join(generatedRoot, 'package.json');
  if (existsSync(packageJsonPath)) {
    const packageJson = readJson(packageJsonPath);
    packageJson.name = INTERNAL_TYPESCRIPT_GENERATED_PACKAGE_NAME;
    packageJson.description = INTERNAL_TYPESCRIPT_GENERATED_DESCRIPTION;
    packageJson.private = true;
    if (Array.isArray(packageJson.keywords)) {
      packageJson.keywords = packageJson.keywords.map((keyword) =>
        keyword === LEGACY_GENERATOR_TYPE ? 'internal' : keyword,
      );
    }
    writeJsonIfChanged(packageJsonPath, packageJson);
  }

  const packageLockPath = path.join(generatedRoot, 'package-lock.json');
  if (existsSync(packageLockPath)) {
    const packageLock = readJson(packageLockPath);
    packageLock.name = INTERNAL_TYPESCRIPT_GENERATED_PACKAGE_NAME;
    if (packageLock.packages?.['']) {
      packageLock.packages[''].name = INTERNAL_TYPESCRIPT_GENERATED_PACKAGE_NAME;
    }
    writeJsonIfChanged(packageLockPath, packageLock);
  }

  const sdkworkSdkJsonPath = path.join(generatedRoot, 'sdkwork-sdk.json');
  if (existsSync(sdkworkSdkJsonPath)) {
    const sdkworkSdkJson = readJson(sdkworkSdkJsonPath);
    sdkworkSdkJson.packageName = INTERNAL_TYPESCRIPT_GENERATED_PACKAGE_NAME;
    sdkworkSdkJson.sdkType = APP_FACING_SDK_METADATA_TYPE;
    sdkworkSdkJson.description = INTERNAL_TYPESCRIPT_GENERATED_DESCRIPTION;
    writeJsonIfChanged(sdkworkSdkJsonPath, sdkworkSdkJson);
  }
}

function rewriteGeneratedMetadataJson(value, generatedPackageName) {
  if (Array.isArray(value)) {
    return value.map((entry) => rewriteGeneratedMetadataJson(entry, generatedPackageName));
  }
  if (!value || typeof value !== 'object') {
    return value;
  }

  const nextValue = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (key === 'packageName') {
      nextValue[key] = generatedPackageName;
      continue;
    }
    if (key === 'sdkType') {
      nextValue[key] = APP_FACING_SDK_METADATA_TYPE;
      continue;
    }
    nextValue[key] = rewriteGeneratedMetadataJson(entryValue, generatedPackageName);
  }
  return nextValue;
}

function normalizeGeneratorStateMetadata(generatedRoot, generatedPackageName) {
  const metadataFileNames = [
    'sdkwork-generator-changes.json',
    'sdkwork-generator-manifest.json',
    'sdkwork-generator-report.json',
  ];

  for (const metadataFileName of metadataFileNames) {
    const metadataPath = path.join(generatedRoot, '.sdkwork', metadataFileName);
    if (!existsSync(metadataPath)) {
      continue;
    }
    const metadataJson = readJson(metadataPath);
    writeJsonIfChanged(
      metadataPath,
      rewriteGeneratedMetadataJson(metadataJson, generatedPackageName),
    );
  }
}

function normalizeGeneratedSdkMetadata(generatedRoot, language) {
  const sdkworkSdkJsonPath = path.join(generatedRoot, 'sdkwork-sdk.json');
  if (!existsSync(sdkworkSdkJsonPath)) {
    return;
  }

  const generatedPackageName = getGeneratedPackageName(language);
  const sdkworkSdkJson = readJson(sdkworkSdkJsonPath);
  sdkworkSdkJson.packageName = generatedPackageName;
  sdkworkSdkJson.sdkType = APP_FACING_SDK_METADATA_TYPE;
  sdkworkSdkJson.description = getGeneratedDescription(language);
  writeJsonIfChanged(sdkworkSdkJsonPath, sdkworkSdkJson);
  normalizeGeneratorStateMetadata(generatedRoot, generatedPackageName);
}

function renderFlutterGeneratedClient() {
  return `import 'package:sdkwork_common_flutter/sdkwork_common_flutter.dart';
import 'src/http/client.dart';
import 'src/api/auth.dart';
import 'src/api/portal.dart';
import 'src/api/session.dart';
import 'src/api/presence.dart';
import 'src/api/realtime.dart';
import 'src/api/device.dart';
import 'src/api/inbox.dart';
import 'src/api/conversation.dart';
import 'src/api/message.dart';
import 'src/api/media.dart';
import 'src/api/stream.dart';
import 'src/api/rtc.dart';

class ImGeneratedConfig {
  final String baseUrl;
  final String? authToken;
  final Map<String, String> headers;
  final int timeout;

  const ImGeneratedConfig({
    required this.baseUrl,
    this.authToken,
    this.headers = const <String, String>{},
    this.timeout = 30000,
  });

  SdkConfig toSdkConfig() {
    return SdkConfig(
      baseUrl: baseUrl,
      timeout: timeout,
      headers: headers,
      authToken: authToken,
    );
  }
}

class ImTransportClient {
  final HttpClient _httpClient;

  late final AuthApi auth;
  late final PortalApi portal;
  late final SessionApi session;
  late final PresenceApi presence;
  late final RealtimeApi realtime;
  late final DeviceApi device;
  late final InboxApi inbox;
  late final ConversationApi conversation;
  late final MessageApi message;
  late final MediaApi media;
  late final StreamApi stream;
  late final RtcApi rtc;

  ImTransportClient({
    required ImGeneratedConfig config,
  }) : _httpClient = HttpClient(config: config.toSdkConfig()) {
    auth = AuthApi(_httpClient);
    portal = PortalApi(_httpClient);
    session = SessionApi(_httpClient);
    presence = PresenceApi(_httpClient);
    realtime = RealtimeApi(_httpClient);
    device = DeviceApi(_httpClient);
    inbox = InboxApi(_httpClient);
    conversation = ConversationApi(_httpClient);
    message = MessageApi(_httpClient);
    media = MediaApi(_httpClient);
    stream = StreamApi(_httpClient);
    rtc = RtcApi(_httpClient);
  }

  factory ImTransportClient.withBaseUrl({
    required String baseUrl,
    String? authToken,
    Map<String, String>? headers,
    int timeout = 30000,
  }) {
    return ImTransportClient(
      config: ImGeneratedConfig(
        baseUrl: baseUrl,
        authToken: authToken,
        headers: headers ?? const <String, String>{},
        timeout: timeout,
      ),
    );
  }

  void setAuthToken(String token) {
    _httpClient.setAuthToken(token);
  }

  void setHeader(String key, String value) {
    _httpClient.setHeader(key, value);
  }
}
`;
}

function renderFlutterReadme() {
  return `# im_sdk_generated

Generator-owned Flutter transport SDK for the Craw Chat app API.

## Boundary

This package is the low-level generated transport boundary for the Craw Chat app API.
Prefer the app-facing package \`im_sdk\` and \`ImSdkClient\` for most application
code. Use this package directly only when you explicitly need raw generated
transport modules.

The generated package identity is \`im_sdk_generated\`.

## Quick Start

\`\`\`dart
import 'package:im_sdk_generated/im_sdk_generated.dart';

final client = ImTransportClient(
  config: const ImGeneratedConfig(
    baseUrl: 'http://127.0.0.1:18090',
    authToken: 'your-bearer-token',
  ),
);

final result = await client.inbox.getInbox();
print(result);
\`\`\`

## Authentication

Craw Chat app routes use bearer authentication only.

\`\`\`dart
final client = ImTransportClient.withBaseUrl(
  baseUrl: 'http://127.0.0.1:18090',
);

client.setAuthToken('your-bearer-token');
// Sends: Authorization: Bearer <token>
\`\`\`

## Configuration

\`\`\`dart
final client = ImTransportClient(
  config: const ImGeneratedConfig(
    baseUrl: 'http://127.0.0.1:18090',
    timeout: 30000,
    headers: <String, String>{
      'X-Custom-Header': 'value',
    },
  ),
);
\`\`\`

## API Modules

- \`client.auth\` - portal authentication API
- \`client.portal\` - tenant portal snapshot API
- \`client.session\` - session API
- \`client.presence\` - presence API
- \`client.realtime\` - realtime API
- \`client.device\` - device API
- \`client.inbox\` - inbox API
- \`client.conversation\` - conversation API
- \`client.message\` - message API
- \`client.media\` - media API
- \`client.stream\` - stream API
- \`client.rtc\` - rtc API

## Publishing

This SDK includes cross-platform publish scripts in \`bin/\`:

- \`bin/publish-core.mjs\`
- \`bin/publish.sh\`
- \`bin/publish.ps1\`

## License

MIT

## Package Boundary

- Use only the package root entrypoint: \`package:im_sdk_generated/im_sdk_generated.dart\`.
- The package root exports \`AuthApi\` and \`PortalApi\` alongside the rest of the generated transport APIs.
- Generated \`src/\` imports are not part of the supported public API.
- Treat this package as the generator-owned transport boundary, not as the preferred Flutter app-consumer entrypoint.
- Prefer \`package:im_sdk/im_sdk.dart\` when you want the official Flutter SDK surface.
- \`im_sdk\` re-exports \`im_sdk_generated\`, so most app consumers do not need a second direct dependency on the generated transport package.
- \`ImTransportClient\` now mounts \`client.auth\` and \`client.portal\` from the generated package root.
- Realtime websocket runtime remains outside generated delivery; this generated package is HTTP coordination only today.
- The workspace normalization wrapper strips generator-only auth scaffolding and source-tree build residue before verification and packaging.

## Regeneration Contract

- Generator-owned files are tracked in \`.sdkwork/sdkwork-generator-manifest.json\`.
- Each run also writes \`.sdkwork/sdkwork-generator-changes.json\` so automation can inspect created, updated, deleted, unchanged, scaffolded, and backed-up files plus the classified impact areas, verification plan, and execution decision for the latest generation.
- Apply mode also writes \`.sdkwork/sdkwork-generator-report.json\` with the full execution report, including \`schemaVersion\`, \`generator\`, stable artifact paths, and the execution handoff commands that match CLI \`--json\` output.
- CLI JSON output also includes an execution handoff with concrete next commands, including reviewed apply commands for dry-run flows.
- Put hand-written wrappers, adapters, and orchestration in \`custom/\`.
- Files scaffolded under \`custom/\` are created once and preserved across regenerations.
- If a generated-owned file was modified locally, its previous content is copied to \`.sdkwork/manual-backups/\` before overwrite or removal.
`;
}

function renderRustReadme() {
  return renderGeneratedTransportReadme({
    language: 'rust',
    heading: 'sdkwork-im-sdk-generated',
    consumerPackage: 'crate \`im-sdk\`',
    packageIdentity: '\`sdkwork-im-sdk-generated\`',
    codeFence: 'rust',
    authSnippet: `use sdkwork_im_sdk_generated::{ImTransportClient, SdkworkConfig};

let client = ImTransportClient::new(SdkworkConfig::new("http://127.0.0.1:18090"))?;
client.set_auth_token("your-bearer-token");
// Sends: Authorization: Bearer <token>`,
    renderAccessor: (groupName) => `client.${groupName}()`,
  });
}

function normalizeRustGeneratedClientSource(source) {
  return source.replace(
    new RegExp(`\\b${legacyGeneratedClientTerms.clientClass}\\b`, 'g'),
    'ImTransportClient',
  );
}

function normalizeRustGeneratedLibSource(source) {
  return source.replace(
    new RegExp(`pub use client::${legacyGeneratedClientTerms.clientClass};`, 'g'),
    'pub use client::ImTransportClient;',
  );
}

function renderJavaGeneratedClient() {
  return `package com.sdkwork.im.generated;

import com.sdkwork.common.core.Types;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.api.AuthApi;
import com.sdkwork.im.generated.api.PortalApi;
import com.sdkwork.im.generated.api.SessionApi;
import com.sdkwork.im.generated.api.PresenceApi;
import com.sdkwork.im.generated.api.RealtimeApi;
import com.sdkwork.im.generated.api.DeviceApi;
import com.sdkwork.im.generated.api.InboxApi;
import com.sdkwork.im.generated.api.ConversationApi;
import com.sdkwork.im.generated.api.MessageApi;
import com.sdkwork.im.generated.api.MediaApi;
import com.sdkwork.im.generated.api.StreamApi;
import com.sdkwork.im.generated.api.RtcApi;

public class ImTransportClient {
    private final HttpClient httpClient;
    private AuthApi auth;
    private PortalApi portal;
    private SessionApi session;
    private PresenceApi presence;
    private RealtimeApi realtime;
    private DeviceApi device;
    private InboxApi inbox;
    private ConversationApi conversation;
    private MessageApi message;
    private MediaApi media;
    private StreamApi stream;
    private RtcApi rtc;

    public ImTransportClient(String baseUrl) {
        this.httpClient = new HttpClient(baseUrl);
        this.auth = new AuthApi(httpClient);
        this.portal = new PortalApi(httpClient);
        this.session = new SessionApi(httpClient);
        this.presence = new PresenceApi(httpClient);
        this.realtime = new RealtimeApi(httpClient);
        this.device = new DeviceApi(httpClient);
        this.inbox = new InboxApi(httpClient);
        this.conversation = new ConversationApi(httpClient);
        this.message = new MessageApi(httpClient);
        this.media = new MediaApi(httpClient);
        this.stream = new StreamApi(httpClient);
        this.rtc = new RtcApi(httpClient);
    }

    public ImTransportClient(Types.SdkConfig config) {
        this.httpClient = new HttpClient(config);
        this.auth = new AuthApi(httpClient);
        this.portal = new PortalApi(httpClient);
        this.session = new SessionApi(httpClient);
        this.presence = new PresenceApi(httpClient);
        this.realtime = new RealtimeApi(httpClient);
        this.device = new DeviceApi(httpClient);
        this.inbox = new InboxApi(httpClient);
        this.conversation = new ConversationApi(httpClient);
        this.message = new MessageApi(httpClient);
        this.media = new MediaApi(httpClient);
        this.stream = new StreamApi(httpClient);
        this.rtc = new RtcApi(httpClient);
    }

    public AuthApi getAuth() {
        return this.auth;
    }

    public PortalApi getPortal() {
        return this.portal;
    }

    public SessionApi getSession() {
        return this.session;
    }

    public PresenceApi getPresence() {
        return this.presence;
    }

    public RealtimeApi getRealtime() {
        return this.realtime;
    }

    public DeviceApi getDevice() {
        return this.device;
    }

    public InboxApi getInbox() {
        return this.inbox;
    }

    public ConversationApi getConversation() {
        return this.conversation;
    }

    public MessageApi getMessage() {
        return this.message;
    }

    public MediaApi getMedia() {
        return this.media;
    }

    public StreamApi getStream() {
        return this.stream;
    }

    public RtcApi getRtc() {
        return this.rtc;
    }

    public ImTransportClient setAuthToken(String token) {
        httpClient.setAuthToken(token);
        return this;
    }

    public ImTransportClient setHeader(String key, String value) {
        httpClient.setHeader(key, value);
        return this;
    }

    public HttpClient getHttpClient() {
        return httpClient;
    }
}
`;
}

function renderJavaReadme() {
  return renderGeneratedTransportReadme({
    language: 'java',
    heading: 'com.sdkwork:im-sdk-generated',
    consumerPackage: 'artifact \`com.sdkwork:im-sdk\`',
    packageIdentity: '\`com.sdkwork:im-sdk-generated\`',
    codeFence: 'java',
    authSnippet: `import com.sdkwork.common.core.Types;
import com.sdkwork.im.generated.ImTransportClient;

Types.SdkConfig config = new Types.SdkConfig("http://127.0.0.1:18090");
ImTransportClient client = new ImTransportClient(config);
client.setAuthToken("your-bearer-token");
// Sends: Authorization: Bearer <token>`,
    renderAccessor: (groupName) => `client.get${capitalize(groupName)}()`,
  });
}

function normalizeJavaHttpClientSource(source) {
  let nextSource = source;
  nextSource = nextSource.replace(
    /    private static final String API_KEY_HEADER = "Authorization";\n    private static final boolean API_KEY_USE_BEARER = true;\n\n/,
    '',
  );
  nextSource = replaceBetweenIfPresent(
    nextSource,
    `    public void setApiKey(String apiKey) {
`,
    `    public void setHeader(String key, String value) {
`,
    `    public void setAuthToken(String token) {
        headers.remove("Access-Token");
        headers.put("Authorization", "Bearer " + token);
    }

`,
    'Java generated http client bearer auth methods',
  );
  return nextSource;
}

function renderCsharpGeneratedClient() {
  return `using System;
using SDKwork.Common.Core;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;
using Sdkwork.Im.Sdk.Generated.Api;

namespace Sdkwork.Im.Sdk.Generated
{
    public class ImTransportClient
    {
        private readonly SdkHttpClient _httpClient;

        public AuthApi Auth { get; }
        public PortalApi Portal { get; }
        public SessionApi Session { get; }
        public PresenceApi Presence { get; }
        public RealtimeApi Realtime { get; }
        public DeviceApi Device { get; }
        public InboxApi Inbox { get; }
        public ConversationApi Conversation { get; }
        public MessageApi Message { get; }
        public MediaApi Media { get; }
        public StreamApi Stream { get; }
        public RtcApi Rtc { get; }

        public ImTransportClient(string baseUrl)
        {
            _httpClient = new SdkHttpClient(baseUrl);
            Auth = new AuthApi(_httpClient);
            Portal = new PortalApi(_httpClient);
            Session = new SessionApi(_httpClient);
            Presence = new PresenceApi(_httpClient);
            Realtime = new RealtimeApi(_httpClient);
            Device = new DeviceApi(_httpClient);
            Inbox = new InboxApi(_httpClient);
            Conversation = new ConversationApi(_httpClient);
            Message = new MessageApi(_httpClient);
            Media = new MediaApi(_httpClient);
            Stream = new StreamApi(_httpClient);
            Rtc = new RtcApi(_httpClient);
        }

        public ImTransportClient(SdkConfig config)
        {
            _httpClient = new SdkHttpClient(config);
            Auth = new AuthApi(_httpClient);
            Portal = new PortalApi(_httpClient);
            Session = new SessionApi(_httpClient);
            Presence = new PresenceApi(_httpClient);
            Realtime = new RealtimeApi(_httpClient);
            Device = new DeviceApi(_httpClient);
            Inbox = new InboxApi(_httpClient);
            Conversation = new ConversationApi(_httpClient);
            Message = new MessageApi(_httpClient);
            Media = new MediaApi(_httpClient);
            Stream = new StreamApi(_httpClient);
            Rtc = new RtcApi(_httpClient);
        }

        public ImTransportClient SetAuthToken(string token)
        {
            _httpClient.SetAuthToken(token);
            return this;
        }

        public ImTransportClient SetHeader(string key, string value)
        {
            _httpClient.SetHeader(key, value);
            return this;
        }
    }
}
`;
}

function renderCsharpReadme() {
  return renderGeneratedTransportReadme({
    language: 'csharp',
    heading: 'Sdkwork.Im.Sdk.Generated',
    consumerPackage: 'NuGet package \`Sdkwork.Im.Sdk\`',
    packageIdentity: '\`Sdkwork.Im.Sdk.Generated\`',
    codeFence: 'csharp',
    authSnippet: `using SDKwork.Common.Core;
using Sdkwork.Im.Sdk.Generated;

var client = new ImTransportClient(new SdkConfig("http://127.0.0.1:18090"));
client.SetAuthToken("your-bearer-token");
// Sends: Authorization: Bearer <token>`,
    renderAccessor: (groupName) => `client.${capitalize(groupName)}`,
  });
}

function normalizeCsharpHttpClientSource(source) {
  let nextSource = source;
  nextSource = nextSource.replace(
    /        private const string ApiKeyHeader = "Authorization";\n        private static readonly bool ApiKeyUseBearer = true;\n\n/,
    '',
  );
  nextSource = replaceBetweenIfPresent(
    nextSource,
    `        public void SetApiKey(string apiKey)
`,
    `        public void SetHeader(string key, string value)
`,
    `        public void SetAuthToken(string token)
        {
            if (_client.DefaultRequestHeaders.Contains("Access-Token"))
            {
                _client.DefaultRequestHeaders.Remove("Access-Token");
            }
            _client.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

`,
    'C# generated http client bearer auth methods',
  );
  return nextSource;
}

function renderKotlinGeneratedClient() {
  return `package com.sdkwork.im.generated

import com.sdkwork.common.core.SdkConfig
import com.sdkwork.im.generated.http.HttpClient
import com.sdkwork.im.generated.api.AuthApi
import com.sdkwork.im.generated.api.PortalApi
import com.sdkwork.im.generated.api.SessionApi
import com.sdkwork.im.generated.api.PresenceApi
import com.sdkwork.im.generated.api.RealtimeApi
import com.sdkwork.im.generated.api.DeviceApi
import com.sdkwork.im.generated.api.InboxApi
import com.sdkwork.im.generated.api.ConversationApi
import com.sdkwork.im.generated.api.MessageApi
import com.sdkwork.im.generated.api.MediaApi
import com.sdkwork.im.generated.api.StreamApi
import com.sdkwork.im.generated.api.RtcApi

class ImTransportClient {
    private val httpClient: HttpClient

    lateinit var auth: AuthApi
    lateinit var portal: PortalApi
    lateinit var session: SessionApi
    lateinit var presence: PresenceApi
    lateinit var realtime: RealtimeApi
    lateinit var device: DeviceApi
    lateinit var inbox: InboxApi
    lateinit var conversation: ConversationApi
    lateinit var message: MessageApi
    lateinit var media: MediaApi
    lateinit var stream: StreamApi
    lateinit var rtc: RtcApi

    constructor(baseUrl: String) {
        this.httpClient = HttpClient(baseUrl)
        auth = AuthApi(httpClient)
        portal = PortalApi(httpClient)
        session = SessionApi(httpClient)
        presence = PresenceApi(httpClient)
        realtime = RealtimeApi(httpClient)
        device = DeviceApi(httpClient)
        inbox = InboxApi(httpClient)
        conversation = ConversationApi(httpClient)
        message = MessageApi(httpClient)
        media = MediaApi(httpClient)
        stream = StreamApi(httpClient)
        rtc = RtcApi(httpClient)
    }

    constructor(config: SdkConfig) {
        this.httpClient = HttpClient(config)
        auth = AuthApi(httpClient)
        portal = PortalApi(httpClient)
        session = SessionApi(httpClient)
        presence = PresenceApi(httpClient)
        realtime = RealtimeApi(httpClient)
        device = DeviceApi(httpClient)
        inbox = InboxApi(httpClient)
        conversation = ConversationApi(httpClient)
        message = MessageApi(httpClient)
        media = MediaApi(httpClient)
        stream = StreamApi(httpClient)
        rtc = RtcApi(httpClient)
    }

    fun setAuthToken(token: String): ImTransportClient {
        httpClient.setAuthToken(token)
        return this
    }

    fun setHeader(key: String, value: String): ImTransportClient {
        httpClient.setHeader(key, value)
        return this
    }
}
`;
}

function renderKotlinReadme() {
  return renderGeneratedTransportReadme({
    language: 'kotlin',
    heading: 'com.sdkwork:im-sdk-generated',
    consumerPackage: 'artifact \`com.sdkwork:im-sdk\`',
    packageIdentity: '\`com.sdkwork:im-sdk-generated\`',
    codeFence: 'kotlin',
    authSnippet: `import com.sdkwork.common.core.SdkConfig
import com.sdkwork.im.generated.ImTransportClient

val client = ImTransportClient(SdkConfig(baseUrl = "http://127.0.0.1:18090"))
client.setAuthToken("your-bearer-token")
// Sends: Authorization: Bearer <token>`,
    renderAccessor: (groupName) => `client.${groupName}`,
  });
}

function normalizeKotlinHttpClientSource(source) {
  let nextSource = source;
  nextSource = nextSource.replace(
    /    companion object \{\n        private const val API_KEY_HEADER = "Authorization"\n        private const val API_KEY_USE_BEARER = true\n    \}\n\n/,
    '',
  );
  nextSource = replaceBetweenIfPresent(
    nextSource,
    `    fun setApiKey(apiKey: String) {
`,
    `    fun setHeader(key: String, value: String) {
`,
    `    fun setAuthToken(token: String) {
        headers.remove("Access-Token")
        headers["Authorization"] = "Bearer $token"
    }

`,
    'Kotlin generated http client bearer auth methods',
  );
  return nextSource;
}

function renderGoGeneratedClient() {
  return `package generated

import (
    "github.com/sdkwork/im-sdk-generated/api"
    sdkhttp "github.com/sdkwork/im-sdk-generated/http"
)

type ImTransportClient struct {
    http *sdkhttp.Client
    Auth *api.AuthApi
    Portal *api.PortalApi
    Session *api.SessionApi
    Presence *api.PresenceApi
    Realtime *api.RealtimeApi
    Device *api.DeviceApi
    Inbox *api.InboxApi
    Conversation *api.ConversationApi
    Message *api.MessageApi
    Media *api.MediaApi
    Stream *api.StreamApi
    Rtc *api.RtcApi
}

func NewImTransportClient(baseURL string) *ImTransportClient {
    cfg := sdkhttp.NewDefaultConfig(baseURL)
    return NewImTransportClientWithConfig(cfg)
}

func NewImTransportClientWithConfig(config sdkhttp.Config) *ImTransportClient {
    client := sdkhttp.NewClient(config)
    return &ImTransportClient{
        http: client,
        Auth: api.NewAuthApi(client),
        Portal: api.NewPortalApi(client),
        Session: api.NewSessionApi(client),
        Presence: api.NewPresenceApi(client),
        Realtime: api.NewRealtimeApi(client),
        Device: api.NewDeviceApi(client),
        Inbox: api.NewInboxApi(client),
        Conversation: api.NewConversationApi(client),
        Message: api.NewMessageApi(client),
        Media: api.NewMediaApi(client),
        Stream: api.NewStreamApi(client),
        Rtc: api.NewRtcApi(client),
    }
}

func (c *ImTransportClient) SetAuthToken(token string) *ImTransportClient {
    c.http.SetAuthToken(token)
    return c
}

func (c *ImTransportClient) SetHeader(key string, value string) *ImTransportClient {
    c.http.SetHeader(key, value)
    return c
}

func (c *ImTransportClient) Http() *sdkhttp.Client {
    return c.http
}
`;
}

function renderGoReadme() {
  return renderGeneratedTransportReadme({
    language: 'go',
    heading: 'github.com/sdkwork/im-sdk-generated',
    consumerPackage: 'module \`github.com/sdkwork/im-sdk\`',
    packageIdentity: '\`github.com/sdkwork/im-sdk-generated\`',
    codeFence: 'go',
    authSnippet: `import (
    generated "github.com/sdkwork/im-sdk-generated"
    sdkhttp "github.com/sdkwork/im-sdk-generated/http"
)

cfg := sdkhttp.NewDefaultConfig("http://127.0.0.1:18090")
client := generated.NewImTransportClientWithConfig(cfg)
client.SetAuthToken("your-bearer-token")
// Sends: Authorization: Bearer <token>`,
    renderAccessor: (groupName) => `client.${capitalize(groupName)}`,
  });
}

function normalizeGoHttpClientSource(source) {
  let nextSource = source;
  if (/ApiKey\s+string/.test(nextSource) || /AccessToken\s+string/.test(nextSource)) {
    nextSource = replaceRequired(
      nextSource,
      /(?:const \(\n    defaultApiKeyHeader = "Authorization"\n    defaultApiKeyUseBearer = true\n\)\n\n)?\/\/ Config wraps sdk-common Go config and adds SDK auth fields\.\ntype Config struct \{\n    common\.SdkConfig\n    ApiKey      string\n    AuthToken   string\n    AccessToken string\n\}\n/,
      `// Config wraps sdk-common Go config and adds bearer auth fields.
type Config struct {
    common.SdkConfig
    AuthToken string
}
`,
      'Go generated http client config auth fields',
    );
  }
  if (/config\.ApiKey != ""/.test(nextSource) || /config\.AccessToken != ""/.test(nextSource)) {
    nextSource = replaceRequired(
      nextSource,
      /    if config\.ApiKey != "" \{\n        client\.SetApiKey\(config\.ApiKey\)\n    \}\n    if config\.AuthToken != "" \{\n        client\.SetAuthToken\(config\.AuthToken\)\n    \}\n    if config\.AccessToken != "" \{\n        client\.SetAccessToken\(config\.AccessToken\)\n    \}\n\n    return client/,
      `    if config.AuthToken != "" {
        client.SetAuthToken(config.AuthToken)
    }

    return client`,
      'Go generated http client config application',
    );
  }
  nextSource = replaceBetweenIfPresent(
    nextSource,
    `func (c *Client) SetApiKey(apiKey string) {
`,
    `func (c *Client) SetHeader(key, value string) {
`,
    `func (c *Client) SetAuthToken(token string) {
    delete(c.headers, "Access-Token")
    c.headers["Authorization"] = "Bearer " + token
}

`,
    'Go generated http client bearer auth methods',
  );
  return nextSource;
}

function renderPythonGeneratedClient() {
  return `from .http_client import HttpClient, SdkConfig
from .api.auth import AuthApi
from .api.portal import PortalApi
from .api.session import SessionApi
from .api.presence import PresenceApi
from .api.realtime import RealtimeApi
from .api.device import DeviceApi
from .api.inbox import InboxApi
from .api.conversation import ConversationApi
from .api.message import MessageApi
from .api.media import MediaApi
from .api.stream import StreamApi
from .api.rtc import RtcApi


class ImTransportClient:
    """Generated transport client for the Craw Chat app API."""

    def __init__(self, config: SdkConfig):
        self._client = HttpClient(config)
        self.auth: AuthApi
        self.portal: PortalApi
        self.session: SessionApi
        self.presence: PresenceApi
        self.realtime: RealtimeApi
        self.device: DeviceApi
        self.inbox: InboxApi
        self.conversation: ConversationApi
        self.message: MessageApi
        self.media: MediaApi
        self.stream: StreamApi
        self.rtc: RtcApi

        self.auth = AuthApi(self._client)
        self.portal = PortalApi(self._client)
        self.session = SessionApi(self._client)
        self.presence = PresenceApi(self._client)
        self.realtime = RealtimeApi(self._client)
        self.device = DeviceApi(self._client)
        self.inbox = InboxApi(self._client)
        self.conversation = ConversationApi(self._client)
        self.message = MessageApi(self._client)
        self.media = MediaApi(self._client)
        self.stream = StreamApi(self._client)
        self.rtc = RtcApi(self._client)

    def set_auth_token(self, token: str) -> 'ImTransportClient':
        self._client.set_auth_token(token)
        return self

    def set_header(self, key: str, value: str) -> 'ImTransportClient':
        self._client.set_header(key, value)
        return self

    @property
    def http(self) -> HttpClient:
        return self._client


def create_transport_client(config: SdkConfig) -> ImTransportClient:
    return ImTransportClient(config)
`;
}

function renderPythonPackageInit() {
  return `from .client import ImTransportClient, create_transport_client
from .http_client import HttpClient, SdkConfig
from .models import *
from .api import *

__version__ = "0.1.1"

__all__ = [
    'ImTransportClient',
    'create_transport_client',
    'HttpClient',
    'SdkConfig',
]
`;
}

function renderPythonHttpClient() {
  return `from sdkwork.common.core.types import SdkConfig as CommonSdkConfig
from sdkwork.common.http import BaseHttpClient

SdkConfig = CommonSdkConfig


class HttpClient(BaseHttpClient):
    """
    SDK HTTP client wrapper based on sdkwork-common.

    Auth headers:
    - auth_token -> Authorization: Bearer {auth_token}
    """

    def _update_auth_headers(self) -> None:
        if self._session is None:
            return

        self._session.headers.pop('Authorization', None)
        self._session.headers.pop('Access-Token', None)
        self._session.headers.pop('X-API-Key', None)

        if self._auth_token:
            self._session.headers['Authorization'] = f'Bearer {self._auth_token}'

    def set_auth_token(self, token: str) -> 'HttpClient':
        self._auth_token = token
        self._api_key = None
        self._access_token = None
        self._update_auth_headers()
        return self

    def set_header(self, key: str, value: str) -> 'HttpClient':
        self.headers[key] = value
        if self._session is not None:
            self._session.headers[key] = value
        return self
`;
}

function renderPythonReadme() {
  return renderGeneratedTransportReadme({
    language: 'python',
    heading: 'sdkwork-im-sdk-generated',
    consumerPackage: 'package \`sdkwork-im-sdk\`',
    packageIdentity: '\`sdkwork-im-sdk-generated\`',
    codeFence: 'python',
    authSnippet: `from sdkwork_im_sdk_generated import ImTransportClient, SdkConfig

client = ImTransportClient(SdkConfig(base_url="http://127.0.0.1:18090"))
client.set_auth_token("your-bearer-token")
# Sends: Authorization: Bearer <token>`,
    renderAccessor: (groupName) => `client.${groupName}`,
  });
}

function renderFlutterGeneratedEntrypoint() {
  return `export 'transport_client.dart';
export 'src/models.dart';
export 'src/api/api.dart';
`;
}

function renderSwiftGeneratedClient() {
  return `import Foundation
import SDKworkCommon

public class ImTransportClient {
    private let httpClient: HttpClient
    public let auth: AuthApi
    public let portal: PortalApi
    public let session: SessionApi
    public let presence: PresenceApi
    public let realtime: RealtimeApi
    public let device: DeviceApi
    public let inbox: InboxApi
    public let conversation: ConversationApi
    public let message: MessageApi
    public let media: MediaApi
    public let stream: StreamApi
    public let rtc: RtcApi

    public init(baseURL: String) {
        self.httpClient = HttpClient(baseURL: baseURL)
        self.auth = AuthApi(client: httpClient)
        self.portal = PortalApi(client: httpClient)
        self.session = SessionApi(client: httpClient)
        self.presence = PresenceApi(client: httpClient)
        self.realtime = RealtimeApi(client: httpClient)
        self.device = DeviceApi(client: httpClient)
        self.inbox = InboxApi(client: httpClient)
        self.conversation = ConversationApi(client: httpClient)
        self.message = MessageApi(client: httpClient)
        self.media = MediaApi(client: httpClient)
        self.stream = StreamApi(client: httpClient)
        self.rtc = RtcApi(client: httpClient)
    }

    public init(config: SdkConfig) {
        self.httpClient = HttpClient(config: config)
        self.auth = AuthApi(client: httpClient)
        self.portal = PortalApi(client: httpClient)
        self.session = SessionApi(client: httpClient)
        self.presence = PresenceApi(client: httpClient)
        self.realtime = RealtimeApi(client: httpClient)
        self.device = DeviceApi(client: httpClient)
        self.inbox = InboxApi(client: httpClient)
        self.conversation = ConversationApi(client: httpClient)
        self.message = MessageApi(client: httpClient)
        self.media = MediaApi(client: httpClient)
        self.stream = StreamApi(client: httpClient)
        self.rtc = RtcApi(client: httpClient)
    }

    public func setAuthToken(_ token: String) -> ImTransportClient {
        httpClient.setAuthToken(token)
        return self
    }

    public func setHeader(_ key: String, value: String) -> ImTransportClient {
        httpClient.setHeader(key, value: value)
        return self
    }
}
`;
}

function renderSwiftReadme() {
  return renderGeneratedTransportReadme({
    language: 'swift',
    heading: 'ImSdkGenerated',
    consumerPackage: 'Swift package \`ImSdk\`',
    packageIdentity: '\`ImSdkGenerated\`',
    codeFence: 'swift',
    authSnippet: `import ImSdkGenerated
import SDKworkCommon

let client = ImTransportClient(config: SdkConfig(baseUrl: "http://127.0.0.1:18090"))
client.setAuthToken("your-bearer-token")
// Sends: Authorization: Bearer <token>`,
    renderAccessor: (groupName) => `client.${groupName}`,
  });
}

function normalizeSwiftHttpClientSource(source) {
  let nextSource = source;
  nextSource = nextSource.replace(
    /    private static let apiKeyHeader = "Authorization"\n    private static let apiKeyUseBearer = true\n\n/,
    '',
  );
  nextSource = replaceBetweenIfPresent(
    nextSource,
    `    public func setApiKey(_ apiKey: String) {
`,
    `    public func setHeader(_ key: String, value: String) {
`,
    `    public func setAuthToken(_ token: String) {
        headers.removeValue(forKey: "Access-Token")
        headers["Authorization"] = "Bearer \\(token)"
    }

`,
    'Swift generated http client bearer auth methods',
  );
  return nextSource;
}

function normalizeRust(workspaceRoot) {
  const generatedRoot = resolveGeneratedRoot(workspaceRoot, 'rust');
  syncGeneratedManifestDescription('rust', generatedRoot);
  transformFileIfExists(
    path.join(generatedRoot, 'src', 'client.rs'),
    normalizeRustGeneratedClientSource,
  );
  transformFileIfExists(
    path.join(generatedRoot, 'src', 'lib.rs'),
    normalizeRustGeneratedLibSource,
  );
  writeIfChanged(path.join(generatedRoot, 'README.md'), renderRustReadme());
}

function normalizeJava(workspaceRoot) {
  const generatedRoot = resolveGeneratedRoot(workspaceRoot, 'java');
  syncGeneratedManifestDescription('java', generatedRoot);
  removeIfExists(
    path.join(
      generatedRoot,
      'src',
      'main',
      'java',
      'com',
      'sdkwork',
      'im',
      'generated',
      `${legacyGeneratedClientTerms.clientClass}.java`,
    ),
  );
  writeIfChanged(
    path.join(generatedRoot, 'src', 'main', 'java', 'com', 'sdkwork', 'im', 'generated', 'ImTransportClient.java'),
    renderJavaGeneratedClient(),
  );
  transformFileIfExists(
    path.join(generatedRoot, 'src', 'main', 'java', 'com', 'sdkwork', 'im', 'generated', 'http', 'HttpClient.java'),
    normalizeJavaHttpClientSource,
  );
  writeIfChanged(path.join(generatedRoot, 'README.md'), renderJavaReadme());
}

function normalizeCsharp(workspaceRoot) {
  const generatedRoot = resolveGeneratedRoot(workspaceRoot, 'csharp');
  syncGeneratedManifestDescription('csharp', generatedRoot);
  removeIfExists(path.join(generatedRoot, `${legacyGeneratedClientTerms.clientClass}.cs`));
  writeIfChanged(path.join(generatedRoot, 'ImTransportClient.cs'), renderCsharpGeneratedClient());
  transformFileIfExists(path.join(generatedRoot, 'Http', 'HttpClient.cs'), normalizeCsharpHttpClientSource);
  writeIfChanged(path.join(generatedRoot, 'README.md'), renderCsharpReadme());
}

function normalizeKotlin(workspaceRoot) {
  const generatedRoot = resolveGeneratedRoot(workspaceRoot, 'kotlin');
  syncGeneratedManifestDescription('kotlin', generatedRoot);
  removeIfExists(
    path.join(
      generatedRoot,
      'src',
      'main',
      'kotlin',
      'com',
      'sdkwork',
      'im',
      'generated',
      `${legacyGeneratedClientTerms.clientClass}.kt`,
    ),
  );
  writeIfChanged(
    path.join(generatedRoot, 'src', 'main', 'kotlin', 'com', 'sdkwork', 'im', 'generated', 'ImTransportClient.kt'),
    renderKotlinGeneratedClient(),
  );
  transformFileIfExists(
    path.join(generatedRoot, 'src', 'main', 'kotlin', 'com', 'sdkwork', 'im', 'generated', 'http', 'HttpClient.kt'),
    normalizeKotlinHttpClientSource,
  );
  writeIfChanged(path.join(generatedRoot, 'README.md'), renderKotlinReadme());
}

function normalizeGo(workspaceRoot) {
  const generatedRoot = resolveGeneratedRoot(workspaceRoot, 'go');
  writeIfChanged(path.join(generatedRoot, 'sdk.go'), renderGoGeneratedClient());
  transformFileIfExists(path.join(generatedRoot, 'http', 'client.go'), normalizeGoHttpClientSource);
  writeIfChanged(path.join(generatedRoot, 'README.md'), renderGoReadme());
}

function normalizePython(workspaceRoot) {
  const generatedRoot = resolveGeneratedRoot(workspaceRoot, 'python');
  syncGeneratedManifestDescription('python', generatedRoot);
  writeIfChanged(
    path.join(generatedRoot, 'sdkwork_im_sdk_generated', 'client.py'),
    renderPythonGeneratedClient(),
  );
  writeIfChanged(
    path.join(generatedRoot, 'sdkwork_im_sdk_generated', '__init__.py'),
    renderPythonPackageInit(),
  );
  writeIfChanged(
    path.join(generatedRoot, 'sdkwork_im_sdk_generated', 'http_client.py'),
    renderPythonHttpClient(),
  );
  writeIfChanged(path.join(generatedRoot, 'README.md'), renderPythonReadme());
}

function normalizeTypeScript(workspaceRoot) {
  const generatedRoot = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-typescript',
    'generated',
    'server-openapi',
  );

  writeIfChanged(path.join(generatedRoot, 'src', 'index.ts'), renderTypeScriptIndex());
  writeIfChanged(path.join(generatedRoot, 'src', 'sdk.ts'), renderTypeScriptSdk());
  writeIfChanged(path.join(generatedRoot, 'src', 'http', 'client.ts'), renderTypeScriptHttpClient());
  writeIfChanged(path.join(generatedRoot, 'src', 'types', 'common.ts'), renderTypeScriptCommonTypes());
  writeIfChanged(path.join(generatedRoot, 'README.md'), renderTypeScriptReadme());
  normalizeTypeScriptWorkspaceMetadata(generatedRoot);
  removeIfExists(path.join(generatedRoot, 'src', 'auth'));
  removeIfExists(path.join(generatedRoot, 'dist', 'auth'));
  removeIfExists(path.join(generatedRoot, 'src', 'index.js'));
  removeIfExists(path.join(generatedRoot, 'src', 'index.d.ts'));
}

function normalizeFlutter(workspaceRoot) {
  const generatedRoot = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-flutter',
    'generated',
    'server-openapi',
  );

  removeIfExists(path.join(generatedRoot, 'lib', 'generated_client.dart'));
  writeIfChanged(path.join(generatedRoot, 'lib', 'im_sdk_generated.dart'), renderFlutterGeneratedEntrypoint());
  writeIfChanged(path.join(generatedRoot, 'lib', 'transport_client.dart'), renderFlutterGeneratedClient());
  writeIfChanged(path.join(generatedRoot, 'README.md'), renderFlutterReadme());
  syncGeneratedManifestDescription('flutter', generatedRoot);
}

function normalizeSwift(workspaceRoot) {
  const generatedRoot = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-swift',
    'generated',
    'server-openapi',
  );
  const packagePath = path.join(generatedRoot, 'Package.swift');
  const readmePath = path.join(generatedRoot, 'README.md');

  if (existsSync(packagePath)) {
    const packageSource = readFileSync(packagePath, 'utf8')
      .replace(/BackendSDK/g, 'ImSdkGenerated');
    writeIfChanged(packagePath, packageSource);
  }

  removeIfExists(path.join(generatedRoot, 'Sources', `${legacyGeneratedClientTerms.clientClass}.swift`));
  writeIfChanged(path.join(generatedRoot, 'Sources', 'ImTransportClient.swift'), renderSwiftGeneratedClient());
  transformFileIfExists(
    path.join(generatedRoot, 'Sources', 'HTTP', 'HttpClient.swift'),
    normalizeSwiftHttpClientSource,
  );
  writeIfChanged(readmePath, renderSwiftReadme());
}

function resolveGeneratedRoot(workspaceRoot, language) {
  return path.join(
    workspaceRoot,
    `sdkwork-im-sdk-${language}`,
    'generated',
    'server-openapi',
  );
}

const officialLanguages = [
  'typescript',
  'flutter',
  'rust',
  'java',
  'csharp',
  'swift',
  'kotlin',
  'go',
  'python',
];

const args = parseArgs(process.argv.slice(2));
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');
const languageSet = new Set(args.languages.length > 0 ? args.languages : officialLanguages);

for (const language of languageSet) {
  if (!officialLanguages.includes(language)) {
    fail(`Unsupported language: ${language}`);
  }
}

for (const language of languageSet) {
  const generatedRoot = resolveGeneratedRoot(workspaceRoot, language);
  normalizeGeneratedSdkMetadata(generatedRoot, language);
  syncGeneratedManifestDescription(language, generatedRoot);
}

if (languageSet.has('typescript')) {
  normalizeTypeScript(workspaceRoot);
}

if (languageSet.has('flutter')) {
  normalizeFlutter(workspaceRoot);
}

if (languageSet.has('swift')) {
  normalizeSwift(workspaceRoot);
}

if (languageSet.has('rust')) {
  normalizeRust(workspaceRoot);
}

if (languageSet.has('java')) {
  normalizeJava(workspaceRoot);
}

if (languageSet.has('csharp')) {
  normalizeCsharp(workspaceRoot);
}

if (languageSet.has('kotlin')) {
  normalizeKotlin(workspaceRoot);
}

if (languageSet.has('go')) {
  normalizeGo(workspaceRoot);
}

if (languageSet.has('python')) {
  normalizePython(workspaceRoot);
}

console.log(
  `[sdkwork-im-sdk] Normalized generated auth surface for ${[...languageSet].sort().join(', ')}.`,
);

