import '../http/client.dart';
import 'paths.dart';

class IotApi {
  final HttpClient _client;
  
  IotApi(this._client);

  /// 注册设备
  Future<dynamic> ioTcontrollerRegisterDevice() async {
    return await _client.post(ApiPaths.backendPath('/iot/devices'));
  }

  /// 获取设备列表
  Future<dynamic> ioTcontrollerGetDevices(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/iot/devices'), params: params);
  }

  /// 获取设备详情
  Future<dynamic> ioTcontrollerGetDevice(String deviceId) async {
    return await _client.get(ApiPaths.backendPath('/iot/devices/${deviceId}'));
  }

  /// 删除设备
  Future<dynamic> ioTcontrollerDeleteDevice(String deviceId) async {
    return await _client.delete(ApiPaths.backendPath('/iot/devices/${deviceId}'));
  }

  /// 更新设备状态
  Future<dynamic> ioTcontrollerUpdateDeviceStatus(String deviceId) async {
    return await _client.put(ApiPaths.backendPath('/iot/devices/${deviceId}/status'));
  }

  /// 发送消息到设备
  Future<dynamic> ioTcontrollerSendMessageToDevice(String deviceId) async {
    return await _client.post(ApiPaths.backendPath('/iot/devices/${deviceId}/messages'));
  }

  /// 获取设备消息历史
  Future<dynamic> ioTcontrollerGetDeviceMessages(String deviceId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/iot/devices/${deviceId}/messages'), params: params);
  }

  /// 控制设备
  Future<dynamic> ioTcontrollerControlDevice(String deviceId) async {
    return await _client.post(ApiPaths.backendPath('/iot/devices/${deviceId}/control'));
  }
}
