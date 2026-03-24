from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import AuthResponseDto, ForgotPasswordDto, ForgotPasswordResponseDto, LoginDto, LogoutDto, RefreshTokenDto, RegisterDto, SendVerificationCodeDto, UpdatePasswordDto, VerifyVerificationCodeDto

class AuthApi:
    """auth API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def controller_login(self, body: LoginDto) -> AuthResponseDto:
        """用户登录"""
        return self._client.post(f"/im/v3/auth/login", json=body)

    def controller_logout(self, body: LogoutDto) -> None:
        """用户登出"""
        return self._client.post(f"/im/v3/auth/logout", json=body)

    def controller_logout_current_device(self, body: LogoutDto) -> None:
        """当前设备登出并清理设备游标"""
        return self._client.post(f"/im/v3/auth/logout/device", json=body)

    def controller_refresh_token(self, body: RefreshTokenDto) -> AuthResponseDto:
        """刷新Token"""
        return self._client.post(f"/im/v3/auth/refresh", json=body)

    def controller_get_current_user(self) -> None:
        """获取当前用户信息"""
        return self._client.get(f"/im/v3/auth/me")

    def controller_update_password(self, body: UpdatePasswordDto) -> None:
        """更新用户密码"""
        return self._client.put(f"/im/v3/auth/password", json=body)

    def controller_forgot_password(self, body: ForgotPasswordDto) -> ForgotPasswordResponseDto:
        """忘记密码"""
        return self._client.post(f"/im/v3/auth/forgot-password", json=body)

    def controller_send_verification_code(self, body: SendVerificationCodeDto) -> ForgotPasswordResponseDto:
        """发送验证码"""
        return self._client.post(f"/im/v3/auth/send-code", json=body)

    def controller_verify_verification_code(self, body: VerifyVerificationCodeDto) -> ForgotPasswordResponseDto:
        """验证验证码"""
        return self._client.post(f"/im/v3/auth/verify-code", json=body)

    def controller_register(self, body: RegisterDto) -> AuthResponseDto:
        """用户注册（支持手机号或邮箱）"""
        return self._client.post(f"/im/v3/auth/register", json=body)

    def controller_get_user_online_status(self, id: str) -> None:
        """获取用户在线状态"""
        return self._client.get(f"/im/v3/auth/users/{id}/online-status")

    def controller_batch_get_online_status(self) -> None:
        """批量获取用户在线状态"""
        return self._client.post(f"/im/v3/auth/users/online-status/batch")

    def controller_get_device_sessions(self, params: Optional[Dict[str, Any]] = None) -> None:
        """获取当前用户设备会话列表"""
        return self._client.get(f"/im/v3/auth/devices", params=params)

    def controller_logout_device_by_id(self, deviceId: str) -> None:
        """指定设备登出并清理设备游标"""
        return self._client.post(f"/im/v3/auth/logout/device/{deviceId}")

    def controller_logout_other_devices(self, body: LogoutDto) -> None:
        """登出其它设备（保留当前设备）"""
        return self._client.post(f"/im/v3/auth/logout/others", json=body)
