export interface SyncRtcVideoRecordDto {
  /** Optional roomId override used for provider sync fallback. */
  roomId?: string;
  /** Optional taskId override used for provider sync fallback. */
  taskId?: string;
}
