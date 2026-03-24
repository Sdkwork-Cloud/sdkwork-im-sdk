import type { BotOpenStatsDto } from './bot-open-stats-dto';

export interface BotOpenProfileResponseDto {
  /** Bot ID */
  id: string;
  /** Bot 名称 */
  name: string;
  /** Bot 用户名 */
  username: string;
  /** Bot App ID */
  appId: string;
  /** Bot 描述 */
  description?: string;
  /** Bot 头像 URL */
  avatar?: string;
  /** Bot 主页 URL */
  homepage?: string;
  /** 开发者名称 */
  developerName?: string;
  /** 开发者邮箱 */
  developerEmail?: string;
  /** Intents 位掩码 */
  intents: number;
  /** Bot 权限范围 */
  scopes: string[];
  /** Bot 状态 */
  status: 'active' | 'inactive' | 'suspended' | 'deleted';
  /** Bot 统计信息 */
  stats?: BotOpenStatsDto;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
}
