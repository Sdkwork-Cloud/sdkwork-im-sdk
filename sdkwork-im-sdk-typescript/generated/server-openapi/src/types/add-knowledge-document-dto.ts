export interface AddKnowledgeDocumentDto {
  /** Document title */
  title: string;
  /** Document content */
  content: string;
  /** Document description */
  description?: string;
  /** Source path */
  sourcePath?: string;
  /** Source type */
  sourceType?: string;
  /** Metadata */
  metadata?: Record<string, unknown>;
}
