using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class AuthApi
    {
        private readonly HttpClient _client;

        public AuthApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 用户登录
        /// </summary>
        public async Task<AuthResponseDto?> ControllerLoginAsync(LoginDto body)
        {
            return await _client.PostAsync<AuthResponseDto>(ApiPaths.BackendPath("/auth/login"), body);
        }

        /// <summary>
        /// 用户登出
        /// </summary>
        public async Task ControllerLogoutAsync(LogoutDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/auth/logout"), body);
        }

        /// <summary>
        /// 当前设备登出并清理设备游标
        /// </summary>
        public async Task ControllerLogoutCurrentDeviceAsync(LogoutDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/auth/logout/device"), body);
        }

        /// <summary>
        /// 刷新Token
        /// </summary>
        public async Task<AuthResponseDto?> ControllerRefreshTokenAsync(RefreshTokenDto body)
        {
            return await _client.PostAsync<AuthResponseDto>(ApiPaths.BackendPath("/auth/refresh"), body);
        }

        /// <summary>
        /// 获取当前用户信息
        /// </summary>
        public async Task ControllerGetCurrentUserAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/auth/me"));
        }

        /// <summary>
        /// 更新用户密码
        /// </summary>
        public async Task ControllerUpdatePasswordAsync(UpdatePasswordDto body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath("/auth/password"), body);
        }

        /// <summary>
        /// 忘记密码
        /// </summary>
        public async Task<ForgotPasswordResponseDto?> ControllerForgotPasswordAsync(ForgotPasswordDto body)
        {
            return await _client.PostAsync<ForgotPasswordResponseDto>(ApiPaths.BackendPath("/auth/forgot-password"), body);
        }

        /// <summary>
        /// 发送验证码
        /// </summary>
        public async Task<ForgotPasswordResponseDto?> ControllerSendVerificationCodeAsync(SendVerificationCodeDto body)
        {
            return await _client.PostAsync<ForgotPasswordResponseDto>(ApiPaths.BackendPath("/auth/send-code"), body);
        }

        /// <summary>
        /// 验证验证码
        /// </summary>
        public async Task<ForgotPasswordResponseDto?> ControllerVerifyVerificationCodeAsync(VerifyVerificationCodeDto body)
        {
            return await _client.PostAsync<ForgotPasswordResponseDto>(ApiPaths.BackendPath("/auth/verify-code"), body);
        }

        /// <summary>
        /// 用户注册（支持手机号或邮箱）
        /// </summary>
        public async Task<AuthResponseDto?> ControllerRegisterAsync(RegisterDto body)
        {
            return await _client.PostAsync<AuthResponseDto>(ApiPaths.BackendPath("/auth/register"), body);
        }

        /// <summary>
        /// 获取用户在线状态
        /// </summary>
        public async Task ControllerGetUserOnlineStatusAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/auth/users/{id}/online-status"));
        }

        /// <summary>
        /// 批量获取用户在线状态
        /// </summary>
        public async Task ControllerBatchGetOnlineStatusAsync()
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/auth/users/online-status/batch"), null);
        }

        /// <summary>
        /// 获取当前用户设备会话列表
        /// </summary>
        public async Task ControllerGetDeviceSessionsAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/auth/devices"), query);
        }

        /// <summary>
        /// 指定设备登出并清理设备游标
        /// </summary>
        public async Task ControllerLogoutDeviceByIdAsync(string deviceId)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/auth/logout/device/{deviceId}"), null);
        }

        /// <summary>
        /// 登出其它设备（保留当前设备）
        /// </summary>
        public async Task ControllerLogoutOtherDevicesAsync(LogoutDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/auth/logout/others"), body);
        }
    }
}
