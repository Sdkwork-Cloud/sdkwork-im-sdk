import Foundation

public class IotApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 注册设备
    public func ioTcontrollerRegisterDevice() async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/iot/devices"), body: nil)
    }

    /// 获取设备列表
    public func ioTcontrollerGetDevices(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/iot/devices"), params: params)
    }

    /// 获取设备详情
    public func ioTcontrollerGetDevice(deviceId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/iot/devices/\(deviceId)"))
    }

    /// 删除设备
    public func ioTcontrollerDeleteDevice(deviceId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/iot/devices/\(deviceId)"))
    }

    /// 更新设备状态
    public func ioTcontrollerUpdateDeviceStatus(deviceId: String) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/iot/devices/\(deviceId)/status"), body: nil)
    }

    /// 发送消息到设备
    public func ioTcontrollerSendMessageToDevice(deviceId: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/iot/devices/\(deviceId)/messages"), body: nil)
    }

    /// 获取设备消息历史
    public func ioTcontrollerGetDeviceMessages(deviceId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/iot/devices/\(deviceId)/messages"), params: params)
    }

    /// 控制设备
    public func ioTcontrollerControlDevice(deviceId: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/iot/devices/\(deviceId)/control"), body: nil)
    }
}
