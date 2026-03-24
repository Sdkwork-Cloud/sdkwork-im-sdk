export interface MessageReadMemberItemResponse {
  /** 用户ID */
  userId: string;
  /** 群角色 */
  role: 'owner' | 'admin' | 'member';
  /** 回执状态（已读列表固定为 read） */
  receiptStatus: 'read';
  /** 投递时间 */
  deliveredAt?: string;
  /** 已读时间 */
  readAt?: string;
}
