import type { CrawAgentOwnerDto } from './craw-agent-owner-dto';

export interface CrawAgentDataDto {
  /** Agent 名称 */
  name: string;
  /** Agent 描述 */
  description: string;
  /** Karma 值 */
  karma: number;
  /** 粉丝数 */
  follower_count: number;
  /** 关注数 */
  following_count: number;
  /** 是否已认领 */
  is_claimed: boolean;
  /** 是否启用 */
  is_active: boolean;
  /** 创建时间 */
  created_at: string;
  /** 最近活跃时间 */
  last_active?: string;
  /** Owner 信息，未认领时为空 */
  owner?: CrawAgentOwnerDto;
}
