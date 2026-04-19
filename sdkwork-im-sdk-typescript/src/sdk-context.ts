import { createTransportClient as createRawTransportClient } from './generated/index.js';
import type { ImGeneratedConfig } from './generated-client-types.js';
import type { ImTransportClientLike } from './transport-client-like.js';
import type {
  ImSdkClientOptions,
  ImWebSocketFactory,
} from './types.js';
import { ImSdkError } from './errors.js';

export const DEFAULT_REALTIME_WEBSOCKET_PATH = 'api/v1/realtime/ws';

interface ImInternalTransportConfig {
  apiBaseUrl?: string;
  websocketBaseUrl?: string;
}

interface ImInternalResolvedSdkClientOptions {
  transportClient?: ImTransportClientLike;
  transportConfig?: ImGeneratedConfig;
  transport: ImInternalTransportConfig;
  authToken?: string;
  webSocketFactory?: ImWebSocketFactory;
}

interface ImInternalTransportClientOverrides {
  tokenManager?: ImGeneratedConfig['tokenManager'];
  timeout?: number;
  headers?: Record<string, string>;
}

type ImSdkClientRuntimeOptions = ImSdkClientOptions
  & ImInternalTransportClientOverrides
  & {
    transportClient?: ImTransportClientLike;
  };

interface ImInternalSdkContextOptions {
  transportClient: ImTransportClientLike;
  transport?: ImInternalTransportConfig;
  authToken?: string;
  webSocketFactory?: ImWebSocketFactory;
}

export function createTransportClient(
  transportConfig: ImGeneratedConfig,
): ImTransportClientLike {
  return createRawTransportClient(transportConfig) as ImTransportClientLike;
}

export function normalizeImSdkCreateOptions(
  options: ImSdkClientRuntimeOptions,
): ImInternalResolvedSdkClientOptions {
  const apiBaseUrl = firstDefinedString(
    options.apiBaseUrl,
    options.baseUrl,
  );
  const authToken = firstDefinedString(options.authToken);

  const transport: ImInternalTransportConfig = {
    apiBaseUrl,
    websocketBaseUrl: firstDefinedString(options.websocketBaseUrl),
  };

  if (options.transportClient) {
    return {
      transportClient: options.transportClient,
      transport,
      authToken,
      webSocketFactory: options.webSocketFactory,
    };
  }

  const tokenManager =
    options.tokenProvider
    ?? options.tokenManager;

  const hasTransportOverrides =
    apiBaseUrl != null
    || authToken != null
    || tokenManager != null
    || options.timeout != null
    || options.headers != null;

  if (!hasTransportOverrides) {
    return {
      transport,
      authToken,
      webSocketFactory: options.webSocketFactory,
    };
  }

  if (!apiBaseUrl) {
    throw new ImSdkError(
      'api_base_url_required',
      'baseUrl or apiBaseUrl is required when creating ImSdkClient',
    );
  }

  return {
    transportConfig: omitUndefined({
      baseUrl: apiBaseUrl,
      authToken,
      tokenManager,
      timeout: options.timeout,
      headers: options.headers,
    }),
    transport,
    authToken,
    webSocketFactory: options.webSocketFactory,
  };
}

export function resolveTransportClient(
  options: ImSdkClientRuntimeOptions,
): ImTransportClientLike {
  const normalized = normalizeImSdkCreateOptions(options);

  if (normalized.transportClient) {
    return normalized.transportClient;
  }
  if (normalized.transportConfig) {
    return createTransportClient(normalized.transportConfig);
  }
  throw new ImSdkError(
    'api_base_url_required',
    'baseUrl or apiBaseUrl is required',
  );
}

export function resolveImClientOptions(
  options: ImSdkClientRuntimeOptions,
): ImInternalSdkContextOptions {
  const normalized = normalizeImSdkCreateOptions(options);

  return {
    transportClient: resolveTransportClient(options),
    transport: normalized.transport,
    authToken: normalized.authToken,
    webSocketFactory: normalized.webSocketFactory,
  };
}

export function resolveImWebSocketBaseUrl(baseUrl: string): string {
  const parsedUrl = new URL(baseUrl);
  if (parsedUrl.protocol === 'https:') {
    parsedUrl.protocol = 'wss:';
  } else if (parsedUrl.protocol === 'http:') {
    parsedUrl.protocol = 'ws:';
  }

  return stripTrailingSlash(parsedUrl.toString());
}

export class ImSdkContext {
  private authToken?: string;

  constructor(
    readonly transportClient: ImTransportClientLike,
    private readonly transport: ImInternalTransportConfig = {},
    readonly webSocketFactory?: ImInternalSdkContextOptions['webSocketFactory'],
    initialAuthToken?: string,
  ) {
    if (initialAuthToken) {
      this.setAuthToken(initialAuthToken);
    }
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    this.transportClient.setAuthToken?.(token);
  }

  clearAuthToken(): void {
    this.authToken = undefined;
    if (typeof this.transportClient.clearAuthToken === 'function') {
      this.transportClient.clearAuthToken();
      return;
    }
    this.transportClient.setAuthToken?.('');
  }

  getAuthToken(): string | undefined {
    return this.authToken;
  }

  getApiBaseUrl(): string | undefined {
    return this.transport.apiBaseUrl;
  }

  getWebSocketBaseUrl(): string | undefined {
    if (this.transport.websocketBaseUrl) {
      return this.transport.websocketBaseUrl;
    }
    if (this.transport.apiBaseUrl) {
      return resolveImWebSocketBaseUrl(this.transport.apiBaseUrl);
    }
    return undefined;
  }

  resolveRealtimeWebSocketUrl(
    path: string = DEFAULT_REALTIME_WEBSOCKET_PATH,
  ): string | undefined {
    const websocketBaseUrl = this.getWebSocketBaseUrl();
    if (!websocketBaseUrl) {
      return undefined;
    }

    return `${stripTrailingSlash(websocketBaseUrl)}/${stripLeadingSlash(path)}`;
  }
}

function firstDefinedString(
  ...values: Array<string | undefined>
): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function stripLeadingSlash(value: string): string {
  return value.replace(/^\/+/, '');
}

function omitUndefined<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  ) as T;
}
