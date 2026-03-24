import type { IMConfigDto } from './imconfig-dto';

export interface AuthResponseDto {
  /** 用户信息 */
  user: Record<string, unknown>;
  /** 访问令牌 */
  token: string;
  /** 刷新令牌 */
  refreshToken?: string;
  /** 令牌过期时间（秒） */
  expiresIn?: number;
  /** IM连接配置（用于SDK连接） */
  imConfig?: IMConfigDto;
}
