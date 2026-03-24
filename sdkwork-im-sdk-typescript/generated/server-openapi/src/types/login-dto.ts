export interface LoginDto {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 设备ID（可选，建议携带以启用多端独立同步游标） */
  deviceId?: string;
}
