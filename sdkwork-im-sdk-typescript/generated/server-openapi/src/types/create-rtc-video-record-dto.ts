export interface CreateRtcVideoRecordDto {
  roomId: string;
  userId?: string;
  /** Optional when recording is still in progress */
  fileName?: string;
  /** Optional when recording is still in progress */
  filePath?: string;
  /** Optional when recording is still in progress */
  fileType?: string;
  /** Optional when recording is still in progress */
  fileSize?: number;
  startTime: string;
  /** Required when status is not recording */
  endTime?: string;
  status?: 'recording' | 'completed' | 'failed' | 'processing';
  metadata?: Record<string, unknown>;
}
