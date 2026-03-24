export interface MessageUnreadMemberItemResponse {
  /** 用户ID */
  userId: string;
  /** 群角色 */
  role: 'owner' | 'admin' | 'member';
  /** 回执状态（未读列表中可能为空） */
  receiptStatus?: 'sent' | 'delivered' | null;
  /** 投递时间 */
  deliveredAt?: string;
  /** 已读时间（未读成员通常为空） */
  readAt?: string;
}
