export interface LogoutDto {
  /** 访问令牌（可选，用于单设备登出） */
  token?: string;
  /** 刷新令牌（可选，用于撤销刷新令牌） */
  refreshToken?: string;
  /** 设备ID（可选，用于设备级登出，需与认证设备一致） */
  deviceId?: string;
}
