using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class IotApi
    {
        private readonly HttpClient _client;

        public IotApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 注册设备
        /// </summary>
        public async Task IoTcontrollerRegisterDeviceAsync()
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/iot/devices"), null);
        }

        /// <summary>
        /// 获取设备列表
        /// </summary>
        public async Task IoTcontrollerGetDevicesAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/iot/devices"), query);
        }

        /// <summary>
        /// 获取设备详情
        /// </summary>
        public async Task IoTcontrollerGetDeviceAsync(string deviceId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/iot/devices/{deviceId}"));
        }

        /// <summary>
        /// 删除设备
        /// </summary>
        public async Task IoTcontrollerDeleteDeviceAsync(string deviceId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/iot/devices/{deviceId}"));
        }

        /// <summary>
        /// 更新设备状态
        /// </summary>
        public async Task IoTcontrollerUpdateDeviceStatusAsync(string deviceId)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/iot/devices/{deviceId}/status"), null);
        }

        /// <summary>
        /// 发送消息到设备
        /// </summary>
        public async Task IoTcontrollerSendMessageToDeviceAsync(string deviceId)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/iot/devices/{deviceId}/messages"), null);
        }

        /// <summary>
        /// 获取设备消息历史
        /// </summary>
        public async Task IoTcontrollerGetDeviceMessagesAsync(string deviceId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/iot/devices/{deviceId}/messages"), query);
        }

        /// <summary>
        /// 控制设备
        /// </summary>
        public async Task IoTcontrollerControlDeviceAsync(string deviceId)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/iot/devices/{deviceId}/control"), null);
        }
    }
}
