package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class IotApi(private val client: HttpClient) {

    /** 注册设备 */
    suspend fun ioTcontrollerRegisterDevice(): Unit {
        client.post(ApiPaths.backendPath("/iot/devices"), null)
    }

    /** 获取设备列表 */
    suspend fun ioTcontrollerGetDevices(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/iot/devices"), params)
    }

    /** 获取设备详情 */
    suspend fun ioTcontrollerGetDevice(deviceId: String): Unit {
        client.get(ApiPaths.backendPath("/iot/devices/$deviceId"))
    }

    /** 删除设备 */
    suspend fun ioTcontrollerDeleteDevice(deviceId: String): Unit {
        client.delete(ApiPaths.backendPath("/iot/devices/$deviceId"))
    }

    /** 更新设备状态 */
    suspend fun ioTcontrollerUpdateDeviceStatus(deviceId: String): Unit {
        client.put(ApiPaths.backendPath("/iot/devices/$deviceId/status"), null)
    }

    /** 发送消息到设备 */
    suspend fun ioTcontrollerSendMessageToDevice(deviceId: String): Unit {
        client.post(ApiPaths.backendPath("/iot/devices/$deviceId/messages"), null)
    }

    /** 获取设备消息历史 */
    suspend fun ioTcontrollerGetDeviceMessages(deviceId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/iot/devices/$deviceId/messages"), params)
    }

    /** 控制设备 */
    suspend fun ioTcontrollerControlDevice(deviceId: String): Unit {
        client.post(ApiPaths.backendPath("/iot/devices/$deviceId/control"), null)
    }
}
