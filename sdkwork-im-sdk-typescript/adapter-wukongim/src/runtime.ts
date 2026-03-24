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

  const nestedDefault = getRecordMember<Record<string, unknown>>(
    moduleExport,
    'default',
  );

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
  const listeners = new Map<string, Set<RuntimeHandler>>();
  let client: Record<string, unknown> | undefined;
  let events: Record<string, string> | undefined;

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

  return {
    async connect(session: OpenChatRealtimeSession): Promise<void> {
      const moduleExport = await loadRuntimeModule();
      if (!moduleExport.WKIM?.init) {
        throw new Error(
          'wukongimjssdk does not expose WKIM.init, unable to bootstrap runtime',
        );
      }

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
    },

    async disconnect(): Promise<void> {
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
      attachListener(event, handler);
    },

    off(event: string, handler: RuntimeHandler): void {
      listeners.get(event)?.delete(handler);
      detachListener(event, handler);
    },
  };
}
