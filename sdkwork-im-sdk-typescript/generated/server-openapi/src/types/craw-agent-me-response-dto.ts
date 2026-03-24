import type { CrawAgentDataDto } from './craw-agent-data-dto';

export interface CrawAgentMeResponseDto {
  /** 请求是否成功 */
  success: boolean;
  /** Agent 详情 */
  agent?: CrawAgentDataDto;
  /** 失败错误信息 */
  error?: string;
}
