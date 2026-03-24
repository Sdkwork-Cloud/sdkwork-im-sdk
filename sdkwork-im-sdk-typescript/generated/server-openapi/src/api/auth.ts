import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { AuthResponseDto, ForgotPasswordDto, ForgotPasswordResponseDto, LoginDto, LogoutDto, RefreshTokenDto, RegisterDto, SendVerificationCodeDto, UpdatePasswordDto, VerifyVerificationCodeDto } from '../types';


export class AuthApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 用户登录 */
  async controllerLogin(body: LoginDto): Promise<AuthResponseDto> {
    return this.client.post<AuthResponseDto>(backendApiPath(`/auth/login`), body);
  }

/** 用户登出 */
  async controllerLogout(body: LogoutDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/auth/logout`), body);
  }

/** 当前设备登出并清理设备游标 */
  async controllerLogoutCurrentDevice(body: LogoutDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/auth/logout/device`), body);
  }

/** 刷新Token */
  async controllerRefreshToken(body: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.client.post<AuthResponseDto>(backendApiPath(`/auth/refresh`), body);
  }

/** 获取当前用户信息 */
  async controllerGetCurrentUser(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/auth/me`));
  }

/** 更新用户密码 */
  async controllerUpdatePassword(body: UpdatePasswordDto): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/auth/password`), body);
  }

/** 忘记密码 */
  async controllerForgotPassword(body: ForgotPasswordDto): Promise<ForgotPasswordResponseDto> {
    return this.client.post<ForgotPasswordResponseDto>(backendApiPath(`/auth/forgot-password`), body);
  }

/** 发送验证码 */
  async controllerSendVerificationCode(body: SendVerificationCodeDto): Promise<ForgotPasswordResponseDto> {
    return this.client.post<ForgotPasswordResponseDto>(backendApiPath(`/auth/send-code`), body);
  }

/** 验证验证码 */
  async controllerVerifyVerificationCode(body: VerifyVerificationCodeDto): Promise<ForgotPasswordResponseDto> {
    return this.client.post<ForgotPasswordResponseDto>(backendApiPath(`/auth/verify-code`), body);
  }

/** 用户注册（支持手机号或邮箱） */
  async controllerRegister(body: RegisterDto): Promise<AuthResponseDto> {
    return this.client.post<AuthResponseDto>(backendApiPath(`/auth/register`), body);
  }

/** 获取用户在线状态 */
  async controllerGetUserOnlineStatus(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/auth/users/${id}/online-status`));
  }

/** 批量获取用户在线状态 */
  async controllerBatchGetOnlineStatus(): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/auth/users/online-status/batch`));
  }

/** 获取当前用户设备会话列表 */
  async controllerGetDeviceSessions(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/auth/devices`), params);
  }

/** 指定设备登出并清理设备游标 */
  async controllerLogoutDeviceById(deviceId: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/auth/logout/device/${deviceId}`));
  }

/** 登出其它设备（保留当前设备） */
  async controllerLogoutOtherDevices(body: LogoutDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/auth/logout/others`), body);
  }
}

export function createAuthApi(client: HttpClient): AuthApi {
  return new AuthApi(client);
}
