export interface StopRtcRecordingDto {
  /** Record ID in local DB. Preferred when available. */
  recordId?: string;
  /** Provider recording taskId. Used when recordId is unknown. */
  taskId?: string;
  /** Optional stop metadata/context */
  metadata?: Record<string, unknown>;
}
