export interface TimelineMediaItemDto {
  /** Media type */
  type: 'image' | 'video' | 'file' | 'link';
  /** Media URL */
  url: string;
  /** Media width */
  width?: number;
  /** Media height */
  height?: number;
  /** Media duration (seconds) */
  duration?: number;
  /** Video/file cover URL */
  coverUrl?: string;
  /** Extended metadata */
  extra?: Record<string, unknown>;
}
