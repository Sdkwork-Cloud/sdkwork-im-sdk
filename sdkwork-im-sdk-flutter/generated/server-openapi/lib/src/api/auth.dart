import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class AuthApi {
  final HttpClient _client;
  
  AuthApi(this._client);

  /// 用户登录
  Future<AuthResponseDto?> controllerLogin(LoginDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/auth/login'), body: body, contentType: 'application/json');
    return decodeResponse<AuthResponseDto>(response, AuthResponseDto.fromJson);
  }

  /// 用户登出
  Future<dynamic> controllerLogout(LogoutDto body) async {
    return await _client.post(ApiPaths.backendPath('/auth/logout'), body: body, contentType: 'application/json');
  }

  /// 当前设备登出并清理设备游标
  Future<dynamic> controllerLogoutCurrentDevice(LogoutDto body) async {
    return await _client.post(ApiPaths.backendPath('/auth/logout/device'), body: body, contentType: 'application/json');
  }

  /// 刷新Token
  Future<AuthResponseDto?> controllerRefreshToken(RefreshTokenDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/auth/refresh'), body: body, contentType: 'application/json');
    return decodeResponse<AuthResponseDto>(response, AuthResponseDto.fromJson);
  }

  /// 获取当前用户信息
  Future<dynamic> controllerGetCurrentUser() async {
    return await _client.get(ApiPaths.backendPath('/auth/me'));
  }

  /// 更新用户密码
  Future<dynamic> controllerUpdatePassword(UpdatePasswordDto body) async {
    return await _client.put(ApiPaths.backendPath('/auth/password'), body: body, contentType: 'application/json');
  }

  /// 忘记密码
  Future<ForgotPasswordResponseDto?> controllerForgotPassword(ForgotPasswordDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/auth/forgot-password'), body: body, contentType: 'application/json');
    return decodeResponse<ForgotPasswordResponseDto>(response, ForgotPasswordResponseDto.fromJson);
  }

  /// 发送验证码
  Future<ForgotPasswordResponseDto?> controllerSendVerificationCode(SendVerificationCodeDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/auth/send-code'), body: body, contentType: 'application/json');
    return decodeResponse<ForgotPasswordResponseDto>(response, ForgotPasswordResponseDto.fromJson);
  }

  /// 验证验证码
  Future<ForgotPasswordResponseDto?> controllerVerifyVerificationCode(VerifyVerificationCodeDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/auth/verify-code'), body: body, contentType: 'application/json');
    return decodeResponse<ForgotPasswordResponseDto>(response, ForgotPasswordResponseDto.fromJson);
  }

  /// 用户注册（支持手机号或邮箱）
  Future<AuthResponseDto?> controllerRegister(RegisterDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/auth/register'), body: body, contentType: 'application/json');
    return decodeResponse<AuthResponseDto>(response, AuthResponseDto.fromJson);
  }

  /// 获取用户在线状态
  Future<dynamic> controllerGetUserOnlineStatus(String id) async {
    return await _client.get(ApiPaths.backendPath('/auth/users/${id}/online-status'));
  }

  /// 批量获取用户在线状态
  Future<dynamic> controllerBatchGetOnlineStatus() async {
    return await _client.post(ApiPaths.backendPath('/auth/users/online-status/batch'));
  }

  /// 获取当前用户设备会话列表
  Future<dynamic> controllerGetDeviceSessions(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/auth/devices'), params: params);
  }

  /// 指定设备登出并清理设备游标
  Future<dynamic> controllerLogoutDeviceById(String deviceId) async {
    return await _client.post(ApiPaths.backendPath('/auth/logout/device/${deviceId}'));
  }

  /// 登出其它设备（保留当前设备）
  Future<dynamic> controllerLogoutOtherDevices(LogoutDto body) async {
    return await _client.post(ApiPaths.backendPath('/auth/logout/others'), body: body, contentType: 'application/json');
  }
}
