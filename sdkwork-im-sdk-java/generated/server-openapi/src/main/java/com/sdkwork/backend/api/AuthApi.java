package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class AuthApi {
    private final HttpClient client;
    
    public AuthApi(HttpClient client) {
        this.client = client;
    }

    /** 用户登录 */
    public AuthResponseDto controllerLogin(LoginDto body) throws Exception {
        return (AuthResponseDto) client.post(ApiPaths.backendPath("/auth/login"), body);
    }

    /** 用户登出 */
    public Void controllerLogout(LogoutDto body) throws Exception {
        client.post(ApiPaths.backendPath("/auth/logout"), body);
        return null;
    }

    /** 当前设备登出并清理设备游标 */
    public Void controllerLogoutCurrentDevice(LogoutDto body) throws Exception {
        client.post(ApiPaths.backendPath("/auth/logout/device"), body);
        return null;
    }

    /** 刷新Token */
    public AuthResponseDto controllerRefreshToken(RefreshTokenDto body) throws Exception {
        return (AuthResponseDto) client.post(ApiPaths.backendPath("/auth/refresh"), body);
    }

    /** 获取当前用户信息 */
    public Void controllerGetCurrentUser() throws Exception {
        client.get(ApiPaths.backendPath("/auth/me"));
        return null;
    }

    /** 更新用户密码 */
    public Void controllerUpdatePassword(UpdatePasswordDto body) throws Exception {
        client.put(ApiPaths.backendPath("/auth/password"), body);
        return null;
    }

    /** 忘记密码 */
    public ForgotPasswordResponseDto controllerForgotPassword(ForgotPasswordDto body) throws Exception {
        return (ForgotPasswordResponseDto) client.post(ApiPaths.backendPath("/auth/forgot-password"), body);
    }

    /** 发送验证码 */
    public ForgotPasswordResponseDto controllerSendVerificationCode(SendVerificationCodeDto body) throws Exception {
        return (ForgotPasswordResponseDto) client.post(ApiPaths.backendPath("/auth/send-code"), body);
    }

    /** 验证验证码 */
    public ForgotPasswordResponseDto controllerVerifyVerificationCode(VerifyVerificationCodeDto body) throws Exception {
        return (ForgotPasswordResponseDto) client.post(ApiPaths.backendPath("/auth/verify-code"), body);
    }

    /** 用户注册（支持手机号或邮箱） */
    public AuthResponseDto controllerRegister(RegisterDto body) throws Exception {
        return (AuthResponseDto) client.post(ApiPaths.backendPath("/auth/register"), body);
    }

    /** 获取用户在线状态 */
    public Void controllerGetUserOnlineStatus(String id) throws Exception {
        client.get(ApiPaths.backendPath("/auth/users/" + id + "/online-status"));
        return null;
    }

    /** 批量获取用户在线状态 */
    public Void controllerBatchGetOnlineStatus() throws Exception {
        client.post(ApiPaths.backendPath("/auth/users/online-status/batch"), null);
        return null;
    }

    /** 获取当前用户设备会话列表 */
    public Void controllerGetDeviceSessions(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/auth/devices"), params);
        return null;
    }

    /** 指定设备登出并清理设备游标 */
    public Void controllerLogoutDeviceById(String deviceId) throws Exception {
        client.post(ApiPaths.backendPath("/auth/logout/device/" + deviceId + ""), null);
        return null;
    }

    /** 登出其它设备（保留当前设备） */
    public Void controllerLogoutOtherDevices(LogoutDto body) throws Exception {
        client.post(ApiPaths.backendPath("/auth/logout/others"), body);
        return null;
    }
}
