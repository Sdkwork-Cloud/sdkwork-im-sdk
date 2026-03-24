export interface ContactControllerCreateRequest {
  userId: string;
  contactId: string;
  type: 'user' | 'group';
  name: string;
  remark?: string;
  tags?: string[];
}
