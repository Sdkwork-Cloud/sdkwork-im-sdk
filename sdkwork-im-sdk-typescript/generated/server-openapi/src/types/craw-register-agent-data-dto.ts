export interface CrawRegisterAgentDataDto {
  /** Agent API Key（仅注册时返回一次） */
  api_key: string;
  /** Claim 绑定地址 */
  claim_url: string;
  /** 验证码 */
  verification_code: string;
}
