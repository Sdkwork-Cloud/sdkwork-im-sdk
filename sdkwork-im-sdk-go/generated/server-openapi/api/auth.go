package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type AuthApi struct {
    client *sdkhttp.Client
}

func NewAuthApi(client *sdkhttp.Client) *AuthApi {
    return &AuthApi{client: client}
}

// 用户登录
func (a *AuthApi) ControllerLogin(body sdktypes.LoginDto) (sdktypes.AuthResponseDto, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/login"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.AuthResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.AuthResponseDto](raw)
}

// 用户登出
func (a *AuthApi) ControllerLogout(body sdktypes.LogoutDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/logout"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 当前设备登出并清理设备游标
func (a *AuthApi) ControllerLogoutCurrentDevice(body sdktypes.LogoutDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/logout/device"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 刷新Token
func (a *AuthApi) ControllerRefreshToken(body sdktypes.RefreshTokenDto) (sdktypes.AuthResponseDto, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/refresh"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.AuthResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.AuthResponseDto](raw)
}

// 获取当前用户信息
func (a *AuthApi) ControllerGetCurrentUser() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/auth/me"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 更新用户密码
func (a *AuthApi) ControllerUpdatePassword(body sdktypes.UpdatePasswordDto) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath("/auth/password"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 忘记密码
func (a *AuthApi) ControllerForgotPassword(body sdktypes.ForgotPasswordDto) (sdktypes.ForgotPasswordResponseDto, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/forgot-password"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.ForgotPasswordResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.ForgotPasswordResponseDto](raw)
}

// 发送验证码
func (a *AuthApi) ControllerSendVerificationCode(body sdktypes.SendVerificationCodeDto) (sdktypes.ForgotPasswordResponseDto, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/send-code"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.ForgotPasswordResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.ForgotPasswordResponseDto](raw)
}

// 验证验证码
func (a *AuthApi) ControllerVerifyVerificationCode(body sdktypes.VerifyVerificationCodeDto) (sdktypes.ForgotPasswordResponseDto, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/verify-code"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.ForgotPasswordResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.ForgotPasswordResponseDto](raw)
}

// 用户注册（支持手机号或邮箱）
func (a *AuthApi) ControllerRegister(body sdktypes.RegisterDto) (sdktypes.AuthResponseDto, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/register"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.AuthResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.AuthResponseDto](raw)
}

// 获取用户在线状态
func (a *AuthApi) ControllerGetUserOnlineStatus(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/auth/users/%s/online-status", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 批量获取用户在线状态
func (a *AuthApi) ControllerBatchGetOnlineStatus() (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/users/online-status/batch"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取当前用户设备会话列表
func (a *AuthApi) ControllerGetDeviceSessions(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/auth/devices"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 指定设备登出并清理设备游标
func (a *AuthApi) ControllerLogoutDeviceById(deviceId string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/auth/logout/device/%s", deviceId)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 登出其它设备（保留当前设备）
func (a *AuthApi) ControllerLogoutOtherDevices(body sdktypes.LogoutDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/auth/logout/others"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
