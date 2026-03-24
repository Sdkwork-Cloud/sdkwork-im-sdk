import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';


export class IotApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 注册设备 */
  async ioTcontrollerRegisterDevice(): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/iot/devices`));
  }

/** 获取设备列表 */
  async ioTcontrollerGetDevices(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/iot/devices`), params);
  }

/** 获取设备详情 */
  async ioTcontrollerGetDevice(deviceId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/iot/devices/${deviceId}`));
  }

/** 删除设备 */
  async ioTcontrollerDeleteDevice(deviceId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/iot/devices/${deviceId}`));
  }

/** 更新设备状态 */
  async ioTcontrollerUpdateDeviceStatus(deviceId: string | number): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/iot/devices/${deviceId}/status`));
  }

/** 发送消息到设备 */
  async ioTcontrollerSendMessageToDevice(deviceId: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/iot/devices/${deviceId}/messages`));
  }

/** 获取设备消息历史 */
  async ioTcontrollerGetDeviceMessages(deviceId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/iot/devices/${deviceId}/messages`), params);
  }

/** 控制设备 */
  async ioTcontrollerControlDevice(deviceId: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/iot/devices/${deviceId}/control`));
  }
}

export function createIotApi(client: HttpClient): IotApi {
  return new IotApi(client);
}
