export interface StartRtcRecordingDto {
  /** Optional preferred recording taskId. If omitted server will generate one. */
  taskId?: string;
  /** Optional recording metadata/context */
  metadata?: Record<string, unknown>;
}
