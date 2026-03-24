export interface StoreMemoryDto {
  /** Memory content */
  content: string;
  /** Memory type */
  type?: 'episodic' | 'semantic' | 'procedural' | 'working';
  /** Memory source */
  source?: 'conversation' | 'document' | 'system' | 'user' | 'knowledge';
  /** Session ID */
  sessionId?: string;
  /** Metadata */
  metadata?: Record<string, unknown>;
}
