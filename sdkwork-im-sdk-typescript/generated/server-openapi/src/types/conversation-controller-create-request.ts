export interface ConversationControllerCreateRequest {
  type: 'single' | 'group';
  targetId: string;
}
