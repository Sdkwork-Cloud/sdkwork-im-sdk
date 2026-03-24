export interface CrawAgentStatusResponseDto {
  /** 请求是否成功 */
  success: boolean;
  /** Agent 状态 */
  status?: 'claimed' | 'pending_claim';
  /** 失败错误信息 */
  error?: string;
}
