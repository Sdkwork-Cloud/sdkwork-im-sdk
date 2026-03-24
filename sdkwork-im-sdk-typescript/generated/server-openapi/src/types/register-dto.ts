export interface RegisterDto {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱（可选，与手机号二选一） */
  email?: string;
  /** 手机号（可选，与邮箱二选一） */
  phone?: string;
  /** 验证码 */
  code: string;
}
