package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class AuthApi(private val client: HttpClient) {

    /** 用户登录 */
    suspend fun controllerLogin(body: LoginDto): AuthResponseDto? {
        return client.post(ApiPaths.backendPath("/auth/login"), body) as? AuthResponseDto
    }

    /** 用户登出 */
    suspend fun controllerLogout(body: LogoutDto): Unit {
        client.post(ApiPaths.backendPath("/auth/logout"), body)
    }

    /** 当前设备登出并清理设备游标 */
    suspend fun controllerLogoutCurrentDevice(body: LogoutDto): Unit {
        client.post(ApiPaths.backendPath("/auth/logout/device"), body)
    }

    /** 刷新Token */
    suspend fun controllerRefreshToken(body: RefreshTokenDto): AuthResponseDto? {
        return client.post(ApiPaths.backendPath("/auth/refresh"), body) as? AuthResponseDto
    }

    /** 获取当前用户信息 */
    suspend fun controllerGetCurrentUser(): Unit {
        client.get(ApiPaths.backendPath("/auth/me"))
    }

    /** 更新用户密码 */
    suspend fun controllerUpdatePassword(body: UpdatePasswordDto): Unit {
        client.put(ApiPaths.backendPath("/auth/password"), body)
    }

    /** 忘记密码 */
    suspend fun controllerForgotPassword(body: ForgotPasswordDto): ForgotPasswordResponseDto? {
        return client.post(ApiPaths.backendPath("/auth/forgot-password"), body) as? ForgotPasswordResponseDto
    }

    /** 发送验证码 */
    suspend fun controllerSendVerificationCode(body: SendVerificationCodeDto): ForgotPasswordResponseDto? {
        return client.post(ApiPaths.backendPath("/auth/send-code"), body) as? ForgotPasswordResponseDto
    }

    /** 验证验证码 */
    suspend fun controllerVerifyVerificationCode(body: VerifyVerificationCodeDto): ForgotPasswordResponseDto? {
        return client.post(ApiPaths.backendPath("/auth/verify-code"), body) as? ForgotPasswordResponseDto
    }

    /** 用户注册（支持手机号或邮箱） */
    suspend fun controllerRegister(body: RegisterDto): AuthResponseDto? {
        return client.post(ApiPaths.backendPath("/auth/register"), body) as? AuthResponseDto
    }

    /** 获取用户在线状态 */
    suspend fun controllerGetUserOnlineStatus(id: String): Unit {
        client.get(ApiPaths.backendPath("/auth/users/$id/online-status"))
    }

    /** 批量获取用户在线状态 */
    suspend fun controllerBatchGetOnlineStatus(): Unit {
        client.post(ApiPaths.backendPath("/auth/users/online-status/batch"), null)
    }

    /** 获取当前用户设备会话列表 */
    suspend fun controllerGetDeviceSessions(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/auth/devices"), params)
    }

    /** 指定设备登出并清理设备游标 */
    suspend fun controllerLogoutDeviceById(deviceId: String): Unit {
        client.post(ApiPaths.backendPath("/auth/logout/device/$deviceId"), null)
    }

    /** 登出其它设备（保留当前设备） */
    suspend fun controllerLogoutOtherDevices(body: LogoutDto): Unit {
        client.post(ApiPaths.backendPath("/auth/logout/others"), body)
    }
}
