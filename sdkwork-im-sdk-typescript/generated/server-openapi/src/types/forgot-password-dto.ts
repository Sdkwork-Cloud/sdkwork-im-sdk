export interface ForgotPasswordDto {
  /** 邮箱（可选，与手机号二选一） */
  email?: string;
  /** 手机号（可选，与邮箱二选一） */
  phone?: string;
}
