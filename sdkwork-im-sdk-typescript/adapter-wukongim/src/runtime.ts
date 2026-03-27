import type {
  OpenChatRealtimeSession,
  OpenChatWukongimAdapterConfig,
  OpenChatWukongimRuntime,
  RuntimeHandler,
} from './types';

interface RuntimeModuleShape {
  WKIM?: {
    init: (
      wsUrl: string,
      options: Record<string, unknown>,
    ) => Record<string, unknown>;
  };
  WKIMEvent?: Record<string, string>;
  WKSDK?: {
    shared?: () => unknown;
  };
  ConnectStatus?: Record<string, string | number>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getRecordMember<T extends Record<string, unknown>>(
  value: unknown,
  key: string,
): T | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  const member = value[key];
  return isRecord(member) ? (member as T) : undefined;
}

function getFunction(
  target: Record<string, unknown> | undefined,
  names: string[],
): ((...args: unknown[]) => unknown) | undefined {
  if (!target) {
    return undefined;
  }
  for (const name of names) {
    const candidate = target[name];
    if (typeof candidate === 'function') {
      return candidate.bind(target);
    }
  }
  return undefined;
}

function resolveEventName(
  events: Record<string, string> | undefined,
  key: string,
  fallback: string,
): string {
  const value = events?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

async function loadRuntimeModule(): Promise<RuntimeModuleShape> {
  const dynamicImport = new Function(
    'moduleName',
    'return import(moduleName);',
  ) as (moduleName: string) => Promise<unknown>;
  const moduleExport = await dynamicImport('wukongimjssdk');
  if (!isRecord(moduleExport)) {
    throw new Error('wukongimjssdk module export is invalid');
  }

  const defaultMember = moduleExport.default;
  const nestedDefault = isRecord(defaultMember) ? defaultMember : undefined;

  return {
    WKIM:
      getRecordMember<Record<string, unknown>>(moduleExport, 'WKIM') as RuntimeModuleShape['WKIM'] ??
      (nestedDefault
        ? (getRecordMember<Record<string, unknown>>(
            nestedDefault,
            'WKIM',
          ) as RuntimeModuleShape['WKIM'])
        : undefined),
    WKIMEvent:
      getRecordMember<Record<string, string>>(moduleExport, 'WKIMEvent') ??
      (nestedDefault
        ? getRecordMember<Record<string, string>>(nestedDefault, 'WKIMEvent')
        : undefined),
    WKSDK:
      getRecordMember<Record<string, unknown>>(moduleExport, 'WKSDK') as RuntimeModuleShape['WKSDK'] ??
      (typeof defaultMember === 'function' &&
      typeof (defaultMember as { shared?: unknown }).shared === 'function'
        ? (defaultMember as RuntimeModuleShape['WKSDK'])
        : nestedDefault
          ? (getRecordMember<Record<string, unknown>>(
              nestedDefault,
              'WKSDK',
            ) as RuntimeModuleShape['WKSDK'])
          : undefined),
    ConnectStatus:
      getRecordMember<Record<string, string | number>>(moduleExport, 'ConnectStatus') ??
      (nestedDefault
        ? getRecordMember<Record<string, string | number>>(
            nestedDefault,
            'ConnectStatus',
          )
        : undefined),
  };
}

export async function resolveRuntime(
  config: OpenChatWukongimAdapterConfig,
): Promise<OpenChatWukongimRuntime> {
  if (config.runtime) {
    return config.runtime;
  }
  if (config.runtimeFactory) {
    return await config.runtimeFactory();
  }
  return createDefaultRuntime();
}

function createDefaultRuntime(): OpenChatWukongimRuntime {
  return createRuntimeFromModuleExportFactory(async () => loadRuntimeModule());
}

function pickString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return undefined;
}

function pickNumber(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
  }
  return undefined;
}

function normalizeSdkContent(content: unknown): Record<string, unknown> | undefined {
  const record = isRecord(content) ? content : undefined;
  if (!record) {
    return undefined;
  }

  if (isRecord(record.contentObj)) {
    return record.contentObj;
  }

  const encodeJson = record.encodeJSON;
  if (typeof encodeJson === 'function') {
    const encoded = encodeJson.call(record);
    if (isRecord(encoded)) {
      return encoded;
    }
    if (typeof encoded === 'string') {
      return {
        type: 'text',
        content: encoded,
      };
    }
  }

  const type = pickString(record.type);
  if (type && Object.prototype.hasOwnProperty.call(record, 'content')) {
    return {
      type,
      content: record.content,
    };
  }

  const text = pickString(record.text);
  if (text) {
    return {
      type: 'text',
      content: text,
    };
  }

  return undefined;
}

function normalizeSdkMessage(message: unknown): Record<string, unknown> | undefined {
  const record = isRecord(message) ? message : undefined;
  if (!record) {
    return undefined;
  }

  const channel = getRecordMember<Record<string, unknown>>(record, 'channel');
  const content = normalizeSdkContent(record.content);

  return {
    messageId: pickString(record.messageId, record.messageID, record.id),
    channelId: pickString(
      channel?.channelId,
      channel?.channelID,
      record.channelId,
      record.channelID,
    ),
    channelType: pickNumber(
      channel?.channelType,
      record.channelType,
    ),
    fromUid: pickString(record.fromUid, record.fromUID, record.senderId),
    timestamp: pickNumber(record.timestamp),
    ...(content ? { content } : {}),
  };
}

function createRuntimeFromModuleExportFactory(
  loadModule: () => Promise<RuntimeModuleShape> | RuntimeModuleShape,
): OpenChatWukongimRuntime {
  const listeners = new Map<string, Set<RuntimeHandler>>();
  let client: Record<string, unknown> | undefined;
  let events: Record<string, string> | undefined;
  let sharedSdk: Record<string, unknown> | undefined;
  let connectStatus: Record<string, string | number> | undefined;
  let sdkMessageListener: RuntimeHandler | undefined;
  let sdkEventListener: RuntimeHandler | undefined;
  let sdkConnectStatusListener:
    | ((status: unknown, reasonCode?: unknown) => void)
    | undefined;

  const attachListener = (event: string, handler: RuntimeHandler): void => {
    const on = getFunction(client, ['on', 'addListener']);
    if (!on) {
      return;
    }
    on(resolveClientEventName(event), handler);
  };

  const detachListener = (event: string, handler: RuntimeHandler): void => {
    const off = getFunction(client, ['off', 'removeListener']);
    if (!off) {
      return;
    }
    off(resolveClientEventName(event), handler);
  };

  const resolveClientEventName = (event: string): string => {
    switch (event) {
      case 'connect':
      case 'connected':
        return resolveEventName(events, 'Connect', 'connect');
      case 'disconnect':
      case 'disconnected':
        return resolveEventName(events, 'Disconnect', 'disconnect');
      case 'message':
      case 'message_received':
        return resolveEventName(events, 'Message', 'message');
      case 'error':
        return resolveEventName(events, 'Error', 'error');
      default:
        return event;
    }
  };

  const emit = (event: string, payload?: unknown): void => {
    for (const handler of listeners.get(event) ?? []) {
      handler(payload);
    }
  };

  const bindSdk = (): void => {
    if (!sharedSdk) {
      return;
    }

    if (!sdkMessageListener) {
      sdkMessageListener = (payload?: unknown) => {
        const normalized = normalizeSdkMessage(payload);
        if (!normalized) {
          return;
        }
        emit('message', normalized);
      };
      getFunction(
        getRecordMember<Record<string, unknown>>(sharedSdk, 'chatManager'),
        ['addMessageListener'],
      )?.(sdkMessageListener);
    }

    if (!sdkEventListener) {
      sdkEventListener = (payload?: unknown) => {
        const normalized = normalizeSdkMessage(payload);
        if (!normalized) {
          return;
        }
        emit('message', normalized);
      };
      getFunction(
        getRecordMember<Record<string, unknown>>(sharedSdk, 'eventManager'),
        ['addEventListener'],
      )?.(sdkEventListener);
    }

    if (!sdkConnectStatusListener) {
      sdkConnectStatusListener = (status: unknown, reasonCode?: unknown) => {
        const connected = connectStatus?.Connected ?? 1;
        const disconnected = connectStatus?.Disconnect ?? 0;
        const failed = connectStatus?.ConnectFail ?? 3;
        const kicked = connectStatus?.ConnectKick ?? 4;

        if (status === connected) {
          emit('connect');
          emit('connected');
          return;
        }

        if (status === failed) {
          emit('error', { status, reasonCode });
        }

        if (status === disconnected || status === failed || status === kicked) {
          emit('disconnect', { status, reasonCode });
          emit('disconnected', { status, reasonCode });
        }
      };
      getFunction(
        getRecordMember<Record<string, unknown>>(sharedSdk, 'connectManager'),
        ['addConnectStatusListener'],
      )?.(sdkConnectStatusListener);
    }
  };

  const unbindSdk = (): void => {
    if (!sharedSdk) {
      return;
    }

    const chatManager = getRecordMember<Record<string, unknown>>(
      sharedSdk,
      'chatManager',
    );
    const eventManager = getRecordMember<Record<string, unknown>>(
      sharedSdk,
      'eventManager',
    );
    const connectManager = getRecordMember<Record<string, unknown>>(
      sharedSdk,
      'connectManager',
    );

    if (sdkMessageListener) {
      getFunction(chatManager, ['removeMessageListener'])?.(sdkMessageListener);
      sdkMessageListener = undefined;
    }
    if (sdkEventListener) {
      getFunction(eventManager, ['removeEventListener'])?.(sdkEventListener);
      sdkEventListener = undefined;
    }
    if (sdkConnectStatusListener) {
      getFunction(connectManager, ['removeConnectStatusListener'])?.(
        sdkConnectStatusListener,
      );
      sdkConnectStatusListener = undefined;
    }
  };

  return {
    async connect(session: OpenChatRealtimeSession): Promise<void> {
      const moduleExport = await loadModule();

      if (moduleExport.WKIM?.init) {
        events = moduleExport.WKIMEvent;
        client = moduleExport.WKIM.init(session.wsUrl, {
          uid: session.uid,
          token: session.token,
          deviceId: session.deviceId,
          deviceFlag: session.deviceFlag,
        });

        for (const [event, handlers] of listeners) {
          for (const handler of handlers) {
            attachListener(event, handler);
          }
        }

        const connect = getFunction(client, ['connect', 'start']);
        if (connect) {
          await connect();
        }
        return;
      }

      const sdkContainer = moduleExport.WKSDK;
      if (
        sdkContainer &&
        typeof sdkContainer.shared === 'function'
      ) {
        const nextSharedSdk = sdkContainer.shared();
        if (!isRecord(nextSharedSdk)) {
          throw new Error('wukongimjssdk WKSDK.shared() returned an invalid runtime instance');
        }
        sharedSdk = nextSharedSdk;
        connectStatus = moduleExport.ConnectStatus;

        const config =
          getRecordMember<Record<string, unknown>>(sharedSdk, 'config') ??
          {};
        config.addr = session.wsUrl;
        config.uid = session.uid;
        config.token = session.token;
        if (session.deviceFlag !== undefined) {
          config.deviceFlag = session.deviceFlag;
        }
        sharedSdk.config = config;

        bindSdk();

        const connect =
          getFunction(sharedSdk, ['connect']) ??
          getFunction(
            getRecordMember<Record<string, unknown>>(sharedSdk, 'connectManager'),
            ['connect'],
          );
        if (connect) {
          await connect();
        }
        return;
      }

      throw new Error(
        'wukongimjssdk does not expose a supported runtime entrypoint (WKIM.init or WKSDK.shared)',
      );
    },

    async disconnect(): Promise<void> {
      if (sharedSdk) {
        const disconnect =
          getFunction(sharedSdk, ['disconnect']) ??
          getFunction(
            getRecordMember<Record<string, unknown>>(sharedSdk, 'connectManager'),
            ['disconnect', 'close'],
          );
        if (disconnect) {
          await disconnect();
        }
        unbindSdk();
        sharedSdk = undefined;
        return;
      }

      const disconnect = getFunction(client, ['disconnect', 'close', 'stop']);
      if (disconnect) {
        await disconnect();
      }
      client = undefined;
    },

    on(event: string, handler: RuntimeHandler): void {
      const handlers = listeners.get(event) ?? new Set<RuntimeHandler>();
      handlers.add(handler);
      listeners.set(event, handlers);
      if (sharedSdk) {
        bindSdk();
        return;
      }
      attachListener(event, handler);
    },

    off(event: string, handler: RuntimeHandler): void {
      listeners.get(event)?.delete(handler);
      if (sharedSdk) {
        return;
      }
      detachListener(event, handler);
    },
  };
}

export function createRuntimeFromModuleExport(
  moduleExport: RuntimeModuleShape,
): OpenChatWukongimRuntime {
  return createRuntimeFromModuleExportFactory(() => moduleExport);
}
