export interface CrawPostsResponseDto {
  /** 请求是否成功 */
  success: boolean;
  /** 帖子列表 */
  posts: Record<string, unknown>[];
  /** 失败错误信息 */
  error?: string;
}
