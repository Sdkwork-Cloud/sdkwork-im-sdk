import Foundation

public class AuthApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 用户登录
    public func controllerLogin(body: LoginDto) async throws -> AuthResponseDto? {
        let response = try await client.post(ApiPaths.backendPath("/auth/login"), body: body)
        return response as? AuthResponseDto
    }

    /// 用户登出
    public func controllerLogout(body: LogoutDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/auth/logout"), body: body)
    }

    /// 当前设备登出并清理设备游标
    public func controllerLogoutCurrentDevice(body: LogoutDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/auth/logout/device"), body: body)
    }

    /// 刷新Token
    public func controllerRefreshToken(body: RefreshTokenDto) async throws -> AuthResponseDto? {
        let response = try await client.post(ApiPaths.backendPath("/auth/refresh"), body: body)
        return response as? AuthResponseDto
    }

    /// 获取当前用户信息
    public func controllerGetCurrentUser() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/auth/me"))
    }

    /// 更新用户密码
    public func controllerUpdatePassword(body: UpdatePasswordDto) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/auth/password"), body: body)
    }

    /// 忘记密码
    public func controllerForgotPassword(body: ForgotPasswordDto) async throws -> ForgotPasswordResponseDto? {
        let response = try await client.post(ApiPaths.backendPath("/auth/forgot-password"), body: body)
        return response as? ForgotPasswordResponseDto
    }

    /// 发送验证码
    public func controllerSendVerificationCode(body: SendVerificationCodeDto) async throws -> ForgotPasswordResponseDto? {
        let response = try await client.post(ApiPaths.backendPath("/auth/send-code"), body: body)
        return response as? ForgotPasswordResponseDto
    }

    /// 验证验证码
    public func controllerVerifyVerificationCode(body: VerifyVerificationCodeDto) async throws -> ForgotPasswordResponseDto? {
        let response = try await client.post(ApiPaths.backendPath("/auth/verify-code"), body: body)
        return response as? ForgotPasswordResponseDto
    }

    /// 用户注册（支持手机号或邮箱）
    public func controllerRegister(body: RegisterDto) async throws -> AuthResponseDto? {
        let response = try await client.post(ApiPaths.backendPath("/auth/register"), body: body)
        return response as? AuthResponseDto
    }

    /// 获取用户在线状态
    public func controllerGetUserOnlineStatus(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/auth/users/\(id)/online-status"))
    }

    /// 批量获取用户在线状态
    public func controllerBatchGetOnlineStatus() async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/auth/users/online-status/batch"), body: nil)
    }

    /// 获取当前用户设备会话列表
    public func controllerGetDeviceSessions(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/auth/devices"), params: params)
    }

    /// 指定设备登出并清理设备游标
    public func controllerLogoutDeviceById(deviceId: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/auth/logout/device/\(deviceId)"), body: nil)
    }

    /// 登出其它设备（保留当前设备）
    public func controllerLogoutOtherDevices(body: LogoutDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/auth/logout/others"), body: body)
    }
}
