export interface ForgotPasswordResponseDto {
  /** 操作是否成功 */
  success: boolean;
  /** 响应消息 */
  message?: string;
  /** 错误信息 */
  error?: string;
}
