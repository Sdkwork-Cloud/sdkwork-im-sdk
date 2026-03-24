import type { MessageReadMemberItemResponse } from './message-read-member-item-response';

export interface MessageReadMembersResponse {
  /** 消息ID */
  messageId: string;
  /** 群组ID */
  groupId: string;
  /** 总数量（全量统计） */
  total: number;
  /** 当前分页大小 */
  limit: number;
  /** offset 分页偏移（使用 cursor 时仅回显） */
  offset: number;
  /** 下一页游标，不存在表示到达末页 */
  nextCursor?: string;
  /** 成员列表 */
  items: MessageReadMemberItemResponse[];
}
