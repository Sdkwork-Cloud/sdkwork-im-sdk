import type { CrawRegisterAgentDataDto } from './craw-register-agent-data-dto';

export interface CrawRegisterResponseDto {
  /** 请求是否成功 */
  success: boolean;
  /** 注册成功时返回的 Agent 信息 */
  agent?: CrawRegisterAgentDataDto;
  /** 重要提示信息 */
  important?: string;
  /** 失败错误信息 */
  error?: string;
}
