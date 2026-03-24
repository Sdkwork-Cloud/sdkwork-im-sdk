export interface BotOpenStatsDto {
  /** Bot 发送消息总数 */
  totalMessagesSent: number;
  /** Bot 接收消息总数 */
  totalMessagesReceived: number;
  /** Bot 交互用户总数 */
  totalUsersInteracted: number;
  /** Bot 加入群组总数 */
  totalGroupsJoined: number;
  /** Bot 执行命令总数 */
  totalCommandsExecuted: number;
  /** Bot 交互总数 */
  totalInteractions: number;
  /** 最后活跃时间 */
  lastActivityAt?: string;
}
