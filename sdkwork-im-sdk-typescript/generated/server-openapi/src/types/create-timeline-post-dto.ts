import type { TimelineMediaItemDto } from './timeline-media-item-dto';

export interface CreateTimelinePostDto {
  /** Post text content */
  text?: string;
  /** Post media list */
  media?: TimelineMediaItemDto[];
  /** Post visibility scope */
  visibility: 'public' | 'friends' | 'private' | 'custom';
  /** Only for CUSTOM visibility */
  customAudienceIds?: string[];
  /** Extended post metadata */
  extra?: Record<string, unknown>;
}
