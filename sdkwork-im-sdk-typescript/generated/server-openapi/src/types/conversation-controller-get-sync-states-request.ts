export interface ConversationControllerGetSyncStatesRequest {
  conversations: Record<string, unknown>[];
  deviceId?: string;
}
