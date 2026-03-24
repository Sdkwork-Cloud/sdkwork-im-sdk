#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SDK_CONFIG_SOURCE = `class SdkConfig {
  final String baseUrl;
  final int timeout;
  final Map<String, String> headers;
  final String? apiKey;
  final String apiKeyHeader;
  final bool apiKeyAsBearer;
  final String? authToken;
  final String? accessToken;

  const SdkConfig({
    required this.baseUrl,
    this.timeout = 30000,
    this.headers = const {},
    this.apiKey,
    this.apiKeyHeader = 'Authorization',
    this.apiKeyAsBearer = true,
    this.authToken,
    this.accessToken,
  });
}
`;

const BASE_HTTP_CLIENT_SOURCE = `import 'dart:convert';
import 'dart:typed_data';

import 'package:http/http.dart' as http;

import 'sdk_config.dart';

class BaseHttpClient {
  final String baseUrl;
  final int timeout;
  final Map<String, String> headers;
  final http.Client _client;

  String? _apiKey;
  final String _apiKeyHeader;
  final bool _apiKeyAsBearer;
  String? _authToken;
  String? _accessToken;

  BaseHttpClient(SdkConfig config)
      : baseUrl = config.baseUrl.replaceFirst(RegExp(r'/+$'), ''),
        timeout = config.timeout,
        headers = Map<String, String>.from(config.headers),
        _client = http.Client(),
        _apiKey = config.apiKey,
        _apiKeyHeader = config.apiKeyHeader,
        _apiKeyAsBearer = config.apiKeyAsBearer,
        _authToken = config.authToken,
        _accessToken = config.accessToken {
    _applyAuthHeaders();
  }

  void _applyAuthHeaders() {
    headers.remove('Authorization');
    headers.remove('Access-Token');
    headers.remove('X-API-Key');

    if (_apiKey != null && _apiKey!.isNotEmpty) {
      headers[_apiKeyHeader] = _apiKeyAsBearer ? 'Bearer $_apiKey' : _apiKey!;
    }
    if (_authToken != null && _authToken!.isNotEmpty) {
      headers['Authorization'] = 'Bearer $_authToken';
    }
    if (_accessToken != null && _accessToken!.isNotEmpty) {
      headers['Access-Token'] = _accessToken!;
    }
  }

  void setApiKey(String apiKey) {
    _apiKey = apiKey;
    _authToken = null;
    _accessToken = null;
    _applyAuthHeaders();
  }

  void setAuthToken(String token) {
    _authToken = token;
    if (_apiKeyHeader.toLowerCase() != 'authorization') {
      _apiKey = null;
    }
    _applyAuthHeaders();
  }

  void setAccessToken(String token) {
    _accessToken = token;
    if (_apiKeyHeader.toLowerCase() != 'access-token') {
      _apiKey = null;
    }
    _applyAuthHeaders();
  }

  void setHeader(String key, String value) {
    headers[key] = value;
  }

  Uri _buildUri(String path, [Map<String, dynamic>? params]) {
    final normalizedPath = path.startsWith('/') ? path : '/$path';
    var url = Uri.parse('$baseUrl$normalizedPath');
    if (params != null && params.isNotEmpty) {
      url = url.replace(
        queryParameters: params.map((k, v) => MapEntry(k, v?.toString())),
      );
    }
    return url;
  }

  dynamic _parseResponse(http.Response response) {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception('HTTP \${response.statusCode}: \${response.body}');
    }

    if (response.body.isEmpty) {
      return null;
    }

    final contentType = response.headers['content-type'] ?? '';
    if (contentType.contains('application/json')) {
      return jsonDecode(response.body);
    }
    return response.body;
  }

  Future<dynamic> request(
    String method,
    String path, {
    Map<String, dynamic>? params,
    dynamic body,
    Map<String, String>? requestHeaders,
    String? contentType,
  }) async {
    final uri = _buildUri(path, params);
    final mergedHeaders = <String, String>{
      ...headers,
      ...?requestHeaders,
    };

    Future<http.Response> call;
    switch (method.toUpperCase()) {
      case 'GET':
        call = _client.get(uri, headers: mergedHeaders);
        break;
      case 'POST':
        call = _client.post(
          uri,
          headers: _buildHeaders(mergedHeaders, contentType, body),
          body: _encodeBody(body, contentType),
        );
        break;
      case 'PUT':
        call = _client.put(
          uri,
          headers: _buildHeaders(mergedHeaders, contentType, body),
          body: _encodeBody(body, contentType),
        );
        break;
      case 'PATCH':
        call = _client.patch(
          uri,
          headers: _buildHeaders(mergedHeaders, contentType, body),
          body: _encodeBody(body, contentType),
        );
        break;
      case 'DELETE':
        call = _client.delete(uri, headers: mergedHeaders);
        break;
      default:
        throw ArgumentError('Unsupported HTTP method: $method');
    }

    final response = await call.timeout(Duration(milliseconds: timeout));
    return _parseResponse(response);
  }

  String _normalizeContentType(String? contentType) {
    if (contentType == null || contentType.trim().isEmpty) {
      return 'application/json';
    }
    return contentType.trim();
  }

  Map<String, String> _buildHeaders(
    Map<String, String> mergedHeaders,
    String? contentType,
    dynamic body,
  ) {
    if (body == null) {
      return mergedHeaders;
    }

    final normalized = _normalizeContentType(contentType).toLowerCase();
    if (normalized.startsWith('multipart/form-data')) {
      final copied = Map<String, String>.from(mergedHeaders);
      copied.remove('Content-Type');
      return copied;
    }

    return {
      ...mergedHeaders,
      'Content-Type': _normalizeContentType(contentType),
    };
  }

  dynamic _encodeBody(dynamic body, String? contentType) {
    if (body == null) {
      return null;
    }

    final normalized = _normalizeContentType(contentType).toLowerCase();
    if (normalized.startsWith('application/x-www-form-urlencoded')) {
      final entries = _toFormEntries(body);
      return entries
          .map(
            (entry) =>
                '\${Uri.encodeQueryComponent(entry.key)}=\${Uri.encodeQueryComponent(entry.value)}',
          )
          .join('&');
    }

    if (normalized.contains('json')) {
      return jsonEncode(body);
    }

    if (body is String || body is List<int>) {
      return body;
    }
    return body.toString();
  }

  List<MapEntry<String, String>> _toFormEntries(dynamic body) {
    final result = <MapEntry<String, String>>[];

    void addValue(String key, dynamic value) {
      if (value == null) {
        result.add(MapEntry(key, ''));
        return;
      }
      if (value is Iterable && value is! String && value is! List<int>) {
        for (final item in value) {
          addValue(key, item);
        }
        return;
      }
      result.add(MapEntry(key, value.toString()));
    }

    if (body is Map) {
      body.forEach((key, value) {
        if (key == null) {
          return;
        }
        addValue(key.toString(), value);
      });
    } else {
      addValue('value', body);
    }

    return result;
  }

  Future<http.Response> _sendMultipart(
    String method,
    Uri uri,
    dynamic body,
    Map<String, String> mergedHeaders,
  ) async {
    final request = http.MultipartRequest(method.toUpperCase(), uri);
    request.headers.addAll(_buildHeaders(mergedHeaders, 'multipart/form-data', body));

    void addField(String key, dynamic value) {
      if (value == null) {
        request.fields[key] = '';
        return;
      }
      if (value is Iterable && value is! String && value is! List<int>) {
        for (final item in value) {
          addField(key, item);
        }
        return;
      }
      if (value is http.MultipartFile) {
        request.files.add(value);
        return;
      }
      if (value is Uint8List || value is List<int>) {
        request.files.add(
          http.MultipartFile.fromBytes(
            key,
            List<int>.from(value as List<int>),
            filename: key,
          ),
        );
        return;
      }
      request.fields[key] = value.toString();
    }

    if (body is Map) {
      body.forEach((key, value) {
        if (key == null) {
          return;
        }
        addField(key.toString(), value);
      });
    } else if (body != null) {
      addField('value', body);
    }

    final streamed = await _client
        .send(request)
        .timeout(Duration(milliseconds: timeout));
    return http.Response.fromStream(streamed);
  }

  Future<dynamic> get(
    String path, {
    Map<String, dynamic>? params,
    Map<String, String>? headers,
  }) {
    return request('GET', path, params: params, requestHeaders: headers);
  }

  Future<dynamic> post(
    String path, {
    dynamic body,
    Map<String, dynamic>? params,
    Map<String, String>? headers,
    String? contentType,
  }) {
    final normalized = _normalizeContentType(contentType).toLowerCase();
    if (normalized.startsWith('multipart/form-data')) {
      final uri = _buildUri(path, params);
      return _sendMultipart('POST', uri, body, {...this.headers, ...?headers})
          .then(_parseResponse);
    }
    return request(
      'POST',
      path,
      params: params,
      body: body,
      requestHeaders: headers,
      contentType: contentType,
    );
  }

  Future<dynamic> put(
    String path, {
    dynamic body,
    Map<String, dynamic>? params,
    Map<String, String>? headers,
    String? contentType,
  }) {
    final normalized = _normalizeContentType(contentType).toLowerCase();
    if (normalized.startsWith('multipart/form-data')) {
      final uri = _buildUri(path, params);
      return _sendMultipart('PUT', uri, body, {...this.headers, ...?headers})
          .then(_parseResponse);
    }
    return request(
      'PUT',
      path,
      params: params,
      body: body,
      requestHeaders: headers,
      contentType: contentType,
    );
  }

  Future<dynamic> patch(
    String path, {
    dynamic body,
    Map<String, dynamic>? params,
    Map<String, String>? headers,
    String? contentType,
  }) {
    final normalized = _normalizeContentType(contentType).toLowerCase();
    if (normalized.startsWith('multipart/form-data')) {
      final uri = _buildUri(path, params);
      return _sendMultipart('PATCH', uri, body, {...this.headers, ...?headers})
          .then(_parseResponse);
    }
    return request(
      'PATCH',
      path,
      params: params,
      body: body,
      requestHeaders: headers,
      contentType: contentType,
    );
  }

  Future<dynamic> delete(
    String path, {
    Map<String, dynamic>? params,
    Map<String, String>? headers,
  }) {
    return request('DELETE', path, params: params, requestHeaders: headers);
  }
}
`;

const RESPONSE_MAPPER_SOURCE = `Map<String, dynamic>? _asMap(dynamic value) {
  if (value is Map<String, dynamic>) {
    return value;
  }
  if (value is Map) {
    return value.map(
      (key, fieldValue) => MapEntry(key.toString(), fieldValue),
    );
  }
  return null;
}

dynamic unwrapResponseValue(dynamic value) {
  final map = _asMap(value);
  if (map == null) {
    return value;
  }
  if (map['success'] == false) {
    throw Exception((map['message'] ?? map['error'] ?? 'OpenChat request failed').toString());
  }
  if (map.containsKey('data')) {
    return map['data'];
  }
  return map;
}

T? decodeResponse<T>(
  dynamic value,
  T Function(Map<String, dynamic> json) fromJson,
) {
  final unwrapped = unwrapResponseValue(value);
  if (unwrapped == null) {
    return null;
  }
  if (unwrapped is T) {
    return unwrapped;
  }
  final map = _asMap(unwrapped);
  if (map == null) {
    return null;
  }
  return fromJson(map);
}
`;

const GENERATED_CHANGELOG_SOURCE = `# Changelog

## 1.0.11

- harden the generated Flutter OpenAPI package into a self-contained publishable package
- add local runtime support files instead of depending on sdkwork_common_flutter
- keep the generated layer isolated from the handwritten WuKongIM and RTC integration packages
`;

const GENERATED_README_SOURCE = `# backend_sdk

Generated Flutter OpenAPI SDK for the OpenChat app-facing IM HTTP APIs.

## Responsibilities

- consume the app schema exposed from \`/im/v3/openapi.json\`
- provide typed HTTP API modules for IM, RTC, friends, contacts, groups, conversations, bots, and related app surfaces
- stay generator-owned and independent from handwritten realtime integration code

## Installation

\`\`\`yaml
dependencies:
  backend_sdk: ^1.0.11
\`\`\`

## Quick Start

\`\`\`dart
import 'package:backend_sdk/backend_sdk.dart';

final client = SdkworkBackendClient.withBaseUrl(
  baseUrl: 'http://127.0.0.1:3000',
  timeout: 30000,
);

client.setAccessToken('your-access-token');

final profile = await client.users.userControllerGetCurrent();
print(profile);
\`\`\`

## Authentication

- API key mode: \`setApiKey(...)\`
- dual token mode: \`setAuthToken(...)\` + \`setAccessToken(...)\`

Do not mix API key mode with dual token mode on the same client instance.

## API Modules

- \`client.auth\`
- \`client.users\`
- \`client.friends\`
- \`client.contacts\`
- \`client.messages\`
- \`client.messageSearch\`
- \`client.groups\`
- \`client.conversations\`
- \`client.rtc\`
- \`client.wukongim\`
- \`client.aiBot\`
- \`client.agent\`
- \`client.agentMemory\`
- \`client.bots\`
- \`client.botsOpen\`
- \`client.thirdParty\`
- \`client.iot\`
- \`client.craw\`
- \`client.timeline\`

## Publish Scripts

This generated package keeps cross-platform publish helpers in \`bin/\`:

- \`bin/publish-core.mjs\`
- \`bin/publish.sh\`
- \`bin/publish.ps1\`

Validate before publishing:

\`\`\`bash
./bin/publish.sh --action check
\`\`\`

## Boundary

- generator-owned package: \`sdkwork-im-sdk-flutter/generated/server-openapi\`
- handwritten realtime packages:
  - \`sdkwork-im-sdk-flutter/adapter-wukongim\`
  - \`sdkwork-im-sdk-flutter/composed\`

Repeated OpenAPI generation must not modify handwritten WuKongIM or RTC integration code.

## License

AGPL-3.0-or-later
`;

function fail(message) {
  throw new Error(message);
}

function readText(filePath) {
  if (!existsSync(filePath)) {
    fail(`Missing required file: ${filePath}`);
  }
  return readFileSync(filePath, 'utf8');
}

function writeText(filePath, contents) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${contents.replace(/\r?\n/g, '\n').trimEnd()}\n`, 'utf8');
}

function ensureImport(source, importLine) {
  if (source.includes(importLine)) {
    return source;
  }
  const lines = source.replace(/\r?\n/g, '\n').split('\n');
  let lastImportIndex = -1;
  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index].startsWith('import ')) {
      lastImportIndex = index;
    }
  }
  if (lastImportIndex === -1) {
    lines.unshift(importLine);
  } else {
    lines.splice(lastImportIndex + 1, 0, importLine);
  }
  return lines.join('\n');
}

function patchFlutterPubspec(raw) {
  let next = raw.replace(/\r?\n\s*sdkwork_common_flutter:\s*[^\n]+/g, '');
  if (!/^\s*http:\s*[^\n]+$/m.test(next)) {
    next = next.replace(/^dependencies:\s*$/m, 'dependencies:\n  http: ^1.6.0');
  }
  if (!/^\s*homepage:\s*[^\n]+$/m.test(next)) {
    next = next.replace(
      /^version:\s*([^\n]+)$/m,
      `version: $1\nhomepage: https://github.com/openchat-team/openchat-server/tree/main/sdkwork-im-sdk/sdkwork-im-sdk-flutter/generated/server-openapi`,
    );
  }
  if (!/^\s*repository:\s*[^\n]+$/m.test(next)) {
    next = next.replace(
      /^homepage:\s*([^\n]+)$/m,
      '$&\nrepository: https://github.com/openchat-team/openchat-server',
    );
  }
  return next;
}

function patchBackendClient(raw) {
  let next = raw.replace(
    /import 'package:sdkwork_common_flutter\/sdkwork_common_flutter\.dart';\r?\n/,
    "export 'src/http/sdk_config.dart';\n\nimport 'src/http/sdk_config.dart';\n",
  );
  next = next.replace(/import '\.\.\/api\//g, "import 'src/api/");
  return next;
}

function patchHttpClient(raw) {
  return raw.replace(
    /import 'package:sdkwork_common_flutter\/sdkwork_common_flutter\.dart';\r?\n/,
    "import 'base_http_client.dart';\nimport 'sdk_config.dart';\n",
  );
}

function patchGeneratedReadme(raw) {
  if (raw.includes('# backend_sdk')) {
    return GENERATED_README_SOURCE;
  }
  return GENERATED_README_SOURCE;
}

function preserveVoidMethodResponses(raw) {
  return raw.replace(
    /Future<void>(\s+[A-Za-z0-9_]+\([^)]*\)\s+async\s*\{\s*)await\s+(_client\.(?:get|post|put|patch|delete)\([\s\S]*?\));\s*\}/g,
    'Future<dynamic>$1return await $2;\n  }',
  );
}

function needsModelsImport(source) {
  const classMatch = source.match(/class\s+([A-Za-z0-9_]+)\s*\{/);
  const ignored = new Set([
    'ApiPaths',
    'Future',
    'HttpClient',
    'List',
    'Map',
    'String',
    'bool',
    'double',
    'dynamic',
    'int',
    'Object',
    'void',
  ]);
  if (classMatch) {
    ignored.add(classMatch[1]);
  }

  const body = source
    .replace(/^import .+\n/gm, '')
    .replace(/^\s*\/\/.*$/gm, '');
  const tokens = body.match(/\b[A-Z][A-Za-z0-9_]*\b/g) ?? [];
  return tokens.some((token) => !ignored.has(token) && !token.endsWith('Api'));
}

function patchApiSource(raw) {
  let next = preserveVoidMethodResponses(raw);
  if (next.includes('ApiPaths.')) {
    next = ensureImport(next, "import 'paths.dart';");
  }
  if (/return response is \w+ \? response : null;/.test(next)) {
    next = ensureImport(next, "import '../http/response_mapper.dart';");
    next = next.replace(
      /return response is (\w+) \? response : null;/g,
      'return decodeResponse<$1>(response, $1.fromJson);',
    );
  }
  if (!needsModelsImport(next)) {
    next = next.replace(/import '\.\.\/models\.dart';\n/, '');
  }
  return next;
}

function baseType(type) {
  return type.trim().replace(/\?$/, '');
}

function isPrimitive(type) {
  return ['String', 'double', 'int', 'bool', 'dynamic'].includes(type);
}

function renderDecodeExpression(type, fieldName, classNames) {
  const expr = `json['${fieldName}']`;
  const normalized = baseType(type);

  if (normalized === 'String') {
    return `${expr}?.toString()`;
  }
  if (normalized === 'double') {
    return `_asDouble(${expr})`;
  }
  if (normalized === 'int') {
    return `_asInt(${expr})`;
  }
  if (normalized === 'bool') {
    return `_asBool(${expr})`;
  }
  if (normalized === 'dynamic') {
    return expr;
  }
  if (normalized === 'Map<String, dynamic>') {
    return `_asMap(${expr})`;
  }
  if (normalized === 'List<String>') {
    return `_asListOfString(${expr})`;
  }
  if (normalized === 'List<int>') {
    return `_asListOfInt(${expr})`;
  }
  if (normalized === 'List<double>') {
    return `_asListOfDouble(${expr})`;
  }
  if (normalized === 'List<bool>') {
    return `_asListOfBool(${expr})`;
  }
  if (normalized === 'List<Map<String, dynamic>>') {
    return `_asListOfMap(${expr})`;
  }
  const listMatch = normalized.match(/^List<(.+)>$/);
  if (listMatch) {
    const innerType = listMatch[1].trim();
    if (classNames.has(innerType)) {
      return `_asListOfObject(${expr}, ${innerType}.fromJson)`;
    }
  }
  if (classNames.has(normalized)) {
    return `_asObject(${expr}, ${normalized}.fromJson)`;
  }
  return expr;
}

function renderModelHelpers() {
  return `Map<String, dynamic>? _asMap(dynamic value) {
  if (value is Map<String, dynamic>) {
    return value;
  }
  if (value is Map) {
    return value.map(
      (key, fieldValue) => MapEntry(key.toString(), fieldValue),
    );
  }
  return null;
}

double? _asDouble(dynamic value) {
  if (value is num) {
    return value.toDouble();
  }
  if (value is String) {
    return double.tryParse(value);
  }
  return null;
}

int? _asInt(dynamic value) {
  if (value is int) {
    return value;
  }
  if (value is num) {
    return value.toInt();
  }
  if (value is String) {
    return int.tryParse(value);
  }
  return null;
}

bool? _asBool(dynamic value) {
  if (value is bool) {
    return value;
  }
  if (value is String) {
    final normalized = value.trim().toLowerCase();
    if (normalized == 'true' || normalized == '1') {
      return true;
    }
    if (normalized == 'false' || normalized == '0') {
      return false;
    }
  }
  return null;
}

List<String>? _asListOfString(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value.map((item) => item?.toString() ?? '').toList();
}

List<int>? _asListOfInt(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value.map(_asInt).whereType<int>().toList();
}

List<double>? _asListOfDouble(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value.map(_asDouble).whereType<double>().toList();
}

List<bool>? _asListOfBool(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value.map(_asBool).whereType<bool>().toList();
}

List<Map<String, dynamic>>? _asListOfMap(dynamic value) {
  if (value is! List) {
    return null;
  }
  return value
      .map(_asMap)
      .whereType<Map<String, dynamic>>()
      .toList();
}

T? _asObject<T>(
  dynamic value,
  T Function(Map<String, dynamic> json) fromJson,
) {
  final map = _asMap(value);
  if (map == null) {
    return null;
  }
  return fromJson(map);
}

List<T>? _asListOfObject<T>(
  dynamic value,
  T Function(Map<String, dynamic> json) fromJson,
) {
  if (value is! List) {
    return null;
  }
  return value
      .map((item) => _asObject(item, fromJson))
      .whereType<T>()
      .toList();
}

dynamic _encodeValue(dynamic value) {
  if (value == null) {
    return null;
  }
  if (value is List) {
    return value.map(_encodeValue).toList();
  }
  if (value is Map) {
    return value.map(
      (key, fieldValue) => MapEntry(key.toString(), _encodeValue(fieldValue)),
    );
  }
  final candidate = value as dynamic;
  try {
    return candidate.toJson();
  } catch (_) {
    return value;
  }
}
`;
}

function renderFlutterModels(raw) {
  if (
    raw.includes('Map<String, dynamic>? _asMap(dynamic value)') &&
    raw.includes('factory ') &&
    raw.includes('Map<String, dynamic> toJson()')
  ) {
    if (raw.startsWith('// ignore_for_file: unused_element')) {
      return raw;
    }
    return `// ignore_for_file: unused_element\n\n${raw}`;
  }

  const classRegex = /class\s+([A-Za-z0-9_]+)\s*\{\s*([\s\S]*?)\n\s*\1\(\{([\s\S]*?)\}\);\s*\n\}/g;
  const classBlocks = [...raw.matchAll(classRegex)];
  if (classBlocks.length === 0) {
    fail('Unable to parse generated Flutter models.dart');
  }

  const classNames = new Set(classBlocks.map((match) => match[1]));
  const sections = [renderModelHelpers()];

  for (const match of classBlocks) {
    const className = match[1];
    const fieldsSource = match[2];
    const fields = [...fieldsSource.matchAll(/final\s+(.+?)\s+([A-Za-z0-9_]+);/g)].map(
      (fieldMatch) => ({
        type: fieldMatch[1].trim(),
        name: fieldMatch[2].trim(),
      }),
    );

    const fieldLines = fields.map((field) => `  final ${field.type} ${field.name};`);
    const constructor = fields.length === 0
      ? `  ${className}();`
      : [
          `  ${className}({`,
          ...fields.map((field) => `    this.${field.name},`),
          '  });',
        ].join('\n');
    const fromJson = fields.length === 0
      ? [
          `  factory ${className}.fromJson(Map<String, dynamic> json) {`,
          `    return ${className}();`,
          '  }',
        ].join('\n')
      : [
          `  factory ${className}.fromJson(Map<String, dynamic> json) {`,
          `    return ${className}(`,
          ...fields.map(
            (field) =>
              `      ${field.name}: ${renderDecodeExpression(field.type, field.name, classNames)},`,
          ),
          '    );',
          '  }',
        ].join('\n');
    const toJson = [
      '  Map<String, dynamic> toJson() {',
      '    return {',
      ...fields.map((field) => `      '${field.name}': _encodeValue(${field.name}),`),
      '    };',
      '  }',
    ].join('\n');

    sections.push(
      [
        `class ${className} {`,
        ...fieldLines,
        fieldLines.length ? '' : '',
        constructor,
        '',
        fromJson,
        '',
        toJson,
        '}',
      ].filter((line, index, array) => {
        if (line !== '') {
          return true;
        }
        return array[index - 1] !== '';
      }).join('\n'),
    );
  }

  return `// ignore_for_file: unused_element\n\n${sections.join('\n\n')}`;
}

export function hardenFlutterGeneratedSdk(workspaceRoot) {
  const flutterGeneratedRoot = path.join(
    workspaceRoot,
    'sdkwork-im-sdk-flutter',
    'generated',
    'server-openapi',
  );
  const pubspecPath = path.join(flutterGeneratedRoot, 'pubspec.yaml');
  if (!existsSync(pubspecPath)) {
    return;
  }

  const repositoryRoot = path.resolve(workspaceRoot, '..');
  writeText(pubspecPath, patchFlutterPubspec(readText(pubspecPath)));
  writeText(path.join(flutterGeneratedRoot, 'lib', 'src', 'http', 'sdk_config.dart'), SDK_CONFIG_SOURCE);
  writeText(path.join(flutterGeneratedRoot, 'lib', 'src', 'http', 'base_http_client.dart'), BASE_HTTP_CLIENT_SOURCE);
  writeText(path.join(flutterGeneratedRoot, 'lib', 'src', 'http', 'response_mapper.dart'), RESPONSE_MAPPER_SOURCE);
  const backendClientSourcePath = path.join(flutterGeneratedRoot, 'lib', 'backend_client.dart');
  const backendSdkPath = path.join(flutterGeneratedRoot, 'lib', 'backend_sdk.dart');
  const backendLibrarySourcePath = existsSync(backendClientSourcePath)
    ? backendClientSourcePath
    : backendSdkPath;
  writeText(
    backendSdkPath,
    patchBackendClient(readText(backendLibrarySourcePath)),
  );
  if (existsSync(backendClientSourcePath)) {
    rmSync(backendClientSourcePath);
  }
  writeText(
    path.join(flutterGeneratedRoot, 'lib', 'src', 'http', 'client.dart'),
    patchHttpClient(readText(path.join(flutterGeneratedRoot, 'lib', 'src', 'http', 'client.dart'))),
  );
  writeText(
    path.join(flutterGeneratedRoot, 'lib', 'src', 'models.dart'),
    renderFlutterModels(readText(path.join(flutterGeneratedRoot, 'lib', 'src', 'models.dart'))),
  );

  const apiRoot = path.join(flutterGeneratedRoot, 'lib', 'src', 'api');
  for (const entry of readdirSync(apiRoot)) {
    if (!entry.endsWith('.dart') || entry === 'api.dart' || entry === 'paths.dart') {
      continue;
    }
    const filePath = path.join(apiRoot, entry);
    writeText(filePath, patchApiSource(readText(filePath)));
  }

  const readmePath = path.join(flutterGeneratedRoot, 'README.md');
  if (existsSync(readmePath)) {
    writeText(readmePath, patchGeneratedReadme(readText(readmePath)));
  }
  writeText(path.join(flutterGeneratedRoot, 'CHANGELOG.md'), GENERATED_CHANGELOG_SOURCE);
  const repositoryLicensePath = path.join(repositoryRoot, 'LICENSE');
  writeText(
    path.join(flutterGeneratedRoot, 'LICENSE'),
    existsSync(repositoryLicensePath)
      ? readText(repositoryLicensePath)
      : 'AGPL-3.0-or-later\n',
  );
}

function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  hardenFlutterGeneratedSdk(path.resolve(scriptDir, '..'));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}
