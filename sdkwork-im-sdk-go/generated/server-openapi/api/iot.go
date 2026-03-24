package api

import (
    "fmt"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type IotApi struct {
    client *sdkhttp.Client
}

func NewIotApi(client *sdkhttp.Client) *IotApi {
    return &IotApi{client: client}
}

// 注册设备
func (a *IotApi) IoTcontrollerRegisterDevice() (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/iot/devices"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取设备列表
func (a *IotApi) IoTcontrollerGetDevices(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/iot/devices"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取设备详情
func (a *IotApi) IoTcontrollerGetDevice(deviceId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/iot/devices/%s", deviceId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 删除设备
func (a *IotApi) IoTcontrollerDeleteDevice(deviceId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/iot/devices/%s", deviceId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 更新设备状态
func (a *IotApi) IoTcontrollerUpdateDeviceStatus(deviceId string) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/iot/devices/%s/status", deviceId)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 发送消息到设备
func (a *IotApi) IoTcontrollerSendMessageToDevice(deviceId string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/iot/devices/%s/messages", deviceId)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取设备消息历史
func (a *IotApi) IoTcontrollerGetDeviceMessages(deviceId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/iot/devices/%s/messages", deviceId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 控制设备
func (a *IotApi) IoTcontrollerControlDevice(deviceId string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/iot/devices/%s/control", deviceId)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
