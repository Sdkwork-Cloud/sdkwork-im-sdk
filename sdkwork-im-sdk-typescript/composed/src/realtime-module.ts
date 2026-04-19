import type {
  AckRealtimeEventsRequest,
  ImRealtimeSubscriptionScopeOptions,
  QueryParams,
  RealtimeAckState,
  RealtimeEventWindow,
  RealtimeSubscriptionItemInput,
  RealtimeSubscriptionSnapshot,
  SyncRealtimeSubscriptionsRequest,
} from './types.js';
import type { ImSdkContext } from './sdk-context.js';

export class ImRealtimeModule {
  constructor(private readonly context: ImSdkContext) {}

  replaceSubscriptions(
    body: SyncRealtimeSubscriptionsRequest,
  ): Promise<RealtimeSubscriptionSnapshot> {
    return this.context.transportClient.realtime.syncRealtimeSubscriptions(body);
  }

  replaceScopeSubscriptions(
    scopeType: string,
    scopeIds: string | number | Array<string | number>,
    eventTypes: string[] | undefined,
    options: ImRealtimeSubscriptionScopeOptions = {},
  ): Promise<RealtimeSubscriptionSnapshot> {
    const items = normalizeScopeIds(scopeIds).map(
      (scopeId): RealtimeSubscriptionItemInput => ({
        scopeType,
        scopeId: String(scopeId),
        eventTypes,
      }),
    );

    return this.replaceSubscriptions({
      deviceId: options.deviceId,
      items,
    });
  }

  replaceConversationSubscriptions(
    conversationIds: string | number | Array<string | number>,
    eventTypes: string[] | undefined,
    options: ImRealtimeSubscriptionScopeOptions = {},
  ): Promise<RealtimeSubscriptionSnapshot> {
    return this.replaceScopeSubscriptions(
      'conversation',
      conversationIds,
      eventTypes,
      options,
    );
  }

  replaceRtcSubscriptions(
    rtcSessionIds: string | number | Array<string | number>,
    eventTypes: string[] = ['rtc.signal'],
    options: ImRealtimeSubscriptionScopeOptions = {},
  ): Promise<RealtimeSubscriptionSnapshot> {
    return this.replaceScopeSubscriptions(
      'rtc_session',
      rtcSessionIds,
      eventTypes,
      options,
    );
  }

  pullEvents(params?: QueryParams): Promise<RealtimeEventWindow> {
    return this.context.transportClient.realtime.listRealtimeEvents(params);
  }

  ackEvents(body: AckRealtimeEventsRequest): Promise<RealtimeAckState> {
    return this.context.transportClient.realtime.ackRealtimeEvents(body);
  }
}

function normalizeScopeIds(
  value: string | number | Array<string | number>,
): Array<string | number> {
  return Array.isArray(value) ? value : [value];
}
