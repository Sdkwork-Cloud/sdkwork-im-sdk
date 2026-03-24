export interface SetMessageReaction {
  /** 表情内容 */
  emoji: string;
  /** 是否激活该反应，默认 true；false 时移除当前用户的该反应 */
  active?: boolean;
}
