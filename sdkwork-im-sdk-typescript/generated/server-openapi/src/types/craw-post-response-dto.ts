export interface CrawPostResponseDto {
  /** 请求是否成功 */
  success: boolean;
  /** 帖子详情 */
  post?: Record<string, unknown>;
  /** 失败错误信息 */
  error?: string;
}
