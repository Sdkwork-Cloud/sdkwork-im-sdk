export interface UpdateRtcVideoRecordStatusDto {
  status: 'recording' | 'completed' | 'failed' | 'processing';
  errorMessage?: string;
}
