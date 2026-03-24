package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class IotApi {
    private final HttpClient client;
    
    public IotApi(HttpClient client) {
        this.client = client;
    }

    /** 注册设备 */
    public Void ioTcontrollerRegisterDevice() throws Exception {
        client.post(ApiPaths.backendPath("/iot/devices"), null);
        return null;
    }

    /** 获取设备列表 */
    public Void ioTcontrollerGetDevices(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/iot/devices"), params);
        return null;
    }

    /** 获取设备详情 */
    public Void ioTcontrollerGetDevice(String deviceId) throws Exception {
        client.get(ApiPaths.backendPath("/iot/devices/" + deviceId + ""));
        return null;
    }

    /** 删除设备 */
    public Void ioTcontrollerDeleteDevice(String deviceId) throws Exception {
        client.delete(ApiPaths.backendPath("/iot/devices/" + deviceId + ""));
        return null;
    }

    /** 更新设备状态 */
    public Void ioTcontrollerUpdateDeviceStatus(String deviceId) throws Exception {
        client.put(ApiPaths.backendPath("/iot/devices/" + deviceId + "/status"), null);
        return null;
    }

    /** 发送消息到设备 */
    public Void ioTcontrollerSendMessageToDevice(String deviceId) throws Exception {
        client.post(ApiPaths.backendPath("/iot/devices/" + deviceId + "/messages"), null);
        return null;
    }

    /** 获取设备消息历史 */
    public Void ioTcontrollerGetDeviceMessages(String deviceId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/iot/devices/" + deviceId + "/messages"), params);
        return null;
    }

    /** 控制设备 */
    public Void ioTcontrollerControlDevice(String deviceId) throws Exception {
        client.post(ApiPaths.backendPath("/iot/devices/" + deviceId + "/control"), null);
        return null;
    }
}
